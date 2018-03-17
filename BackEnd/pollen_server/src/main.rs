//crates
extern crate ws;

#[macro_use]
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

use std::rc::Rc;
use std::cell::Cell;
use std::cell::RefCell;



//mods
mod json_parser;
mod websocket_server;
mod messages;

use messages::user_message;


fn main() {
  // Cell gives us interior mutability so we can increment
  // or decrement the count between handlers.
  // Rc is a reference-counted box for sharing the count between handlers
  // since each handler needs to own its contents.


  //json_parser::untyped_example();
  //json_parser::typed_example();

  let mut messages_list = Rc::new(RefCell::new(Vec::new()));
  messages_list.borrow_mut().push(user_message{ id : 0i64, author : "system".to_owned(), text: "Welcome to Pollen".to_owned(), time : 0 });

  let count = Rc::new(Cell::new(0));
  let message_count : Rc<Cell<i64>> = Rc::new(Cell::new(1));


  ws::listen("192.168.43.89:3012", |out| { websocket_server::Server { 
  	out: out, 
  	count: count.clone(), 
  	msg_count : message_count.clone(), 
  	messages_list : 
  	messages_list.clone()} 
  }).unwrap()
} 

