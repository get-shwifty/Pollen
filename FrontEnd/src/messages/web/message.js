/**
 * Created by Orion on 3/17/2018.
 */

import React, { Component } from 'react';
import Container from '../containers/message';
import InputTag from '../../tags/web/inputMessageTags';

class Message extends Component{

  render(){
    return(
        <div className="message" >
            { this.props.author || "" } : { this.props.text } (at { this.props.time })
            <br/>
            Ajouter un tag: <InputTag messageId={this.props.id}/>
        </div>
    );
  }
}

export default Container(Message)
