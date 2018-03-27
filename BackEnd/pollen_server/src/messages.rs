#[derive(PartialEq)]
#[derive(Debug)]
#[derive(Clone)]
pub enum system_message_type{
	Login,
	MessageRequest,
	Message,
	AllMessages
}

#[derive(Clone)]
pub struct system_message{
	pub msg_type : system_message_type,
	pub data : String
}

#[derive(Clone)]
#[derive(Serialize, Deserialize)]
pub struct user_message{
	pub id : i64,
	pub author : String,
	pub text : String,
	pub time : i64
}

#[derive(Clone)]
#[derive(Serialize, Deserialize)]
pub struct request_message_data{
	pub text : String,
}

pub fn string_to_message_type(my_string : &str) -> system_message_type{
	if my_string == "login"{
		system_message_type::Login
	}
	else {
	    system_message_type::MessageRequest
	}
}