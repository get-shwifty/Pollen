/**
 * Created by Orion on 3/17/2018.
 */

import React, { Component } from 'react';
import Container from '../containers/message';

class Message extends Component{

  render(){
    return(
        <div className="message">
            { this.props.message.author || "" } : { this.props.message.message }
            <br/>
        </div>
    );
  }
}

export default Container(Message)