/**
 * Created by Orion on 3/17/2018.
 */

import React, { Component } from 'react';
import Container from '../containers/inputMessageTags';

class InputTag extends Component{
    state = {
        tag: ""
    };
    handleChange = event => {
        this.setState({
            tag: event.target.value
        })
    };
    handleKeyPress = event => {
        switch(event.key){
            case 'Enter':
                this.props.addTag(this.state.tag, this.props.messageId);
                this.setState({tag: ""});
                break;
            default:
                break;
        }
    };
    render(){
        return(
            <div className="inputTag" style={{display:'inline-block'}}>
                <input type="text" value={this.state.tag} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
            </div>
        );
    }
}

export default Container(InputTag)
