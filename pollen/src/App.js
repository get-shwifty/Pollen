import React, { Component } from 'react';
import { combineReducers } from "redux";
import Root from './Root';

import messages from './messages/reducer';

import './App.css';

const rootReducer = combineReducers({
    messages
});

class App extends Component {
    render() {
        return (
            <Root rootReducer={rootReducer}>
                <div className="App">
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/2/2a/Misc_pollen_colorized.jpg"} alt={"pollen"} />
                </div>
            </Root>
        );
    }
}

export default App;
