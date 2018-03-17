/**
 * Created by Orion on 3/17/2018.
 */

import React, { Component } from 'react';
import Container from '../containers/input';

class Input extends Component{
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
                this.setState({message: ""});
        }
    };
    render(){
        return(
            <div className="inputBar">
                <input type="text" value={this.state.message} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
            </div>
        );
    }
}

export default Container(Input)