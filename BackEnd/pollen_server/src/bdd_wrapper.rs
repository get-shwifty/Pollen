use rusqlite;

use rusqlite::Connection;
use rusqlite::Error;

use messages::user_message;

pub fn open_connection() -> Connection
{
	let conn = Connection::open("../bdd/messages.sql");

	match conn{
		Err(error) => panic!{"Error while opening the database : {:?}", error},
		Ok(conn) =>{
			match conn.execute("CREATE TABLE messages (
							id        INTEGER PRIMARY KEY,
							author TEXT NOT NULL,
							text TEXT NOT NULL,
							time INTEGER NOT NULL
							)",&[]){
			Ok(_) => {

				let first_msg = user_message{ id : 0i64, author : "system".to_owned(), text: "Welcome to Pollen".to_owned(), time : 0 };
				conn.execute("INSERT INTO MESSAGES (author, text, time)
					VALUES (?1, ?2, ?3)",
					&[&first_msg.author,&first_msg.text,&first_msg.time])
					.expect("First message could not be added to messages database");
				println!("Message table initialized");

			}
			Err(_) => println!("Message table already exists")
			}

			return conn;
		}
	}
}

pub fn load_all_messages(conn: &mut Connection, messages : &mut Vec<user_message> ){
	let mut stmt = conn.prepare("SELECT * FROM messages").expect("load all messages failed");
	let msg_iter = stmt.query_map(&[], |row|{
		user_message{
			id : row.get(0),
			author : row.get(1),
			text: row.get(2),
			time : row.get(3)
		}
	}).expect("load all messages failed at querymap");

	for msg in msg_iter{
		messages.push(msg.unwrap());
	}
}

//return the message id
pub fn add_message_to_bdd(conn: &mut Connection, msg : &user_message ) -> i64
{
	conn.execute("INSERT INTO MESSAGES (author, text, time)
					VALUES (?1, ?2, ?3)",
					&[&msg.author,&msg.text,&msg.time])
					.expect("message could not be added to messages database");

	let mut stmt = conn.prepare("SELECT * FROM messages WHERE time = ?1").expect("last inserted message prepare reques failed");
	let msg_iter = stmt.query_map(&[&msg.time], |row|{
		user_message{
			id : row.get(0),
			author : row.get(1),
			text: row.get(2),
			time : row.get(3)
		}
	}).expect("getting last inserted message failed");
	
	for last_msg in msg_iter{
		return last_msg.expect("why is the last inserted message iter failing").id;
	}

	panic!("could not found last inserted message.");
}