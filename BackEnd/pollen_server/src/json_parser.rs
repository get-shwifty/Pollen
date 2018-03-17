use serde_json;
use serde_json::{Value,Error};

use messages;


pub fn parse_user_message(data : String) -> Result<messages::request_message_data, Error>{
	serde_json::from_str(&data)
}

pub fn parse_login_message(data: String) -> Result<(), Error>{
	let v : Value  = serde_json::from_str(&data)?;
	
    // Access parts of the data by indexing with square brackets.
    println!("received {} ", v["data"]);

    Ok(())
}

pub fn parse_system_message(data: String) -> Result<messages::system_message, Error>{
	let v : Value = serde_json::from_str(&data)?;

	Ok(messages::system_message{ msg_type : messages::string_to_message_type(v["type"].as_str().unwrap()), data : v["data"].as_str().unwrap().to_owned() })
}
