use std::fs;
use std::io::prelude::*;
use std::error::Error;

use serde_json;
use serde_json::{Value};

#[derive(Debug)]
#[derive(Serialize, Deserialize)]
pub struct Config{
	pub listening_ip : String,
	pub listening_port : String,
}

impl Config{


	pub fn load_from_file ( filename : &str) -> Config{

		let mut f = fs::File::open(filename).expect("Could not open config file.");
    	let mut contents = String::new();
    	f.read_to_string(&mut contents).expect("error while reading config file.");

    	let conf : Config = serde_json::from_str(&contents).expect("can parse into a proper config structure");
    	println!{"loaded : {:?}", conf};
	    return conf;
	}

	pub fn get_full_ip (&self) -> String{
		let mut result = String::new();
		result.push_str(&self.listening_ip);
		result.push_str(":");
		result.push_str(&self.listening_port);
		return result;
	}
}