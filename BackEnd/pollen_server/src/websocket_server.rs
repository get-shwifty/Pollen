//uses

use serde_json;

use std::rc::Rc;
use std::cell::Cell;
use std::cell::RefCell;

use ws;
use ws::{listen, Handler, Sender, Result, Message, Handshake, CloseCode, Error};

use messages::{user_message,system_message_type, system_message};

use json_parser;

use std::time::{SystemTime, UNIX_EPOCH};

use bdd_wrapper;

use rusqlite;

//server
pub struct Server {
    pub out: Sender,
    pub count: Rc<Cell<u32>>,
    pub messages_list : Rc<RefCell<Vec<user_message>>>,
    pub user_name : String,
    pub bdd_conn : Rc<RefCell<rusqlite::Connection>>,
}

impl Handler for Server {

    fn on_open(&mut self, _: Handshake) -> Result<()> {
        // We have a new connection, so we increment the connection counter
        println!("A new host joined.");
        self.count.set(self.count.get() + 1);
        println!("The number of live connections is {}", self.count.get());
        Ok(())
    }

    fn on_message(&mut self, msg: Message) -> Result<()> {

        
        //parsing the a system message
        println!("you send me {}",msg);
        let res = json_parser::parse_system_message(msg.as_text().unwrap().to_owned());
        let res = res.unwrap();
        println!("system message type : {:?} data: {}", res.msg_type, res.data);

        if res.msg_type == system_message_type::Login{
            //assigning the name of this connection
            self.user_name = res.data;

            //sending back all messages to a loging user
            let msg_list = json!({
                "type" : "all_messages",
                "data" : self.messages_list.borrow().clone()
            });
            self.out.send(Message::Text(msg_list.to_string()));
        }
        else if res.msg_type == system_message_type::MessageRequest{
            //broadcast the new message we received
            
            //computing timestamp
            let time_now = SystemTime::now();
            let timestamp = time_now.duration_since(UNIX_EPOCH).expect("time should be positive");
            let timestamp_in_ms = timestamp.as_secs() *1000+ timestamp.subsec_nanos() as u64 / 1_000_000;

            let mut u_msg = user_message{ id : 0, author : self.user_name.clone(), text : res.data, time : timestamp_in_ms as i64};

            let msg_id = bdd_wrapper::add_message_to_bdd(&mut  self.bdd_conn.borrow_mut(),& u_msg);

            u_msg.id = msg_id;

            let response = json!({
                "type" : "message",
                "data" : u_msg
            });
            self.messages_list.borrow_mut().push(u_msg.clone());
            self.out.broadcast(Message::Text(response.to_string()));
        }

        Ok(())
    }

    fn on_close(&mut self, code: CloseCode, reason: &str) {
        match code {
            CloseCode::Normal => println!("The client is done with the connection."),
            CloseCode::Away   => println!("The client is leaving the site."),
            CloseCode::Abnormal => println!(
                "Closing handshake failed! Unable to obtain closing status from client."),
            _ => println!("The client encountered an error: {}", reason),
        }

        // The connection is going down, so we need to decrement the count
        self.count.set(self.count.get() - 1);
        println!("The number of live connections is {}", self.count.get());
    }

    fn on_error(&mut self, err: ws::Error) {
        println!("The server encountered an error: {:?}", err);
    }

}