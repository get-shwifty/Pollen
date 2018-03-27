//crates
extern crate ws;
extern crate rusqlite;


#[macro_use]
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

//extern crate rusqlite;
//extern crate time;

use std::rc::Rc;
use std::cell::Cell;
use std::cell::RefCell;

//use rusqlite::Connection;
//use time::Timespec;

//mods
mod json_parser;
mod websocket_server;
mod messages;
mod bdd_wrapper;
mod config_helper;

use messages::user_message;

fn main() {

    run_server();
} 

fn run_server(){

	let mut messages_list = Rc::new(RefCell::new(Vec::new()));
  	let count = Rc::new(Cell::new(0));

	//init bdd an load everything from it
	let mut bdd = bdd_wrapper::open_connection();
	bdd_wrapper::load_all_messages(&mut bdd, &mut messages_list.borrow_mut());

	let mut bdd_conn = Rc::new(RefCell::new(bdd));

	//load configuration file
	let config = config_helper::Config::load_from_file("../config_pollen_server.json");

  	ws::listen(config.get_full_ip(), |out| { websocket_server::Server { 
  		out: out, 
  		count: count.clone(), 
  		messages_list : 
  		messages_list.clone(),
  		user_name : "None".to_owned(),
  		bdd_conn : bdd_conn.clone()} 
 	}).unwrap()
}
