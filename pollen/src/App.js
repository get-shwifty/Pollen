import React, { Component } from 'react';
import { combineReducers } from "redux";
import Root from './Root';

import messages from './messages/reducers';
import Messages from './messages/web/messages';
import Input from './messages/web/input';
import './App.css';

const rootReducer = combineReducers({
    wss: ( state = null, action ) => {
        switch( action.type ){
            case 'SET_WSS':
                return action.wss;
            default:
                return state;
        }
    },
    messages
});

class App extends Component {
    render() {
        return (
            <Root rootReducer={rootReducer}>
                <div className="App">
                    <Messages/>
                    <Input/>
                </div>
            </Root>
        );
    }
}

export default App;
