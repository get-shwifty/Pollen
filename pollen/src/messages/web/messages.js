/**
 * Created by Orion on 3/17/2018.
 */

import React, { Component } from 'react';
import Message from "./message";
import Container from '../containers/messages';

class Messages extends Component{
    state = {
        message: ""
    };
    handleChange = event => {
      this.setState({
          message: event.target.value
      })
    };
    handleKeyPress = event => {
        switch(event.key){
            case 'Enter':
                this.props.sendMessage(this.state.message);

        }
    };
    render(){
        const createMessage = id => {
            return(
                <Message id={id}/>
            )
        };
        return(
            <div className="messages">
                { this.props.messages.map( createMessage) }
                <input type="text" value={this.state.message} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
            </div>
        );
    }
}

export default Container(Messages)