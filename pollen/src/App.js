import React, { Component } from 'react';
import { combineReducers } from "redux";
import Root from './Root';

import messages from './messages/reducer';
import Messages from './messages/web/messages';
import './App.css';

const rootReducer = combineReducers({
    messages
});

class App extends Component {
    render() {
        return (
            <Root rootReducer={rootReducer}>
                <div className="App">
                    <Messages/>
                </div>
            </Root>
        );
    }
}

export default App;
