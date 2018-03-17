import React, { Component } from 'react';
import Root from './Root';

import './App.css';

class App extends Component {
    render() {
        return (
            <Root>
                <div className="App">
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/2/2a/Misc_pollen_colorized.jpg"} alt={"pollen"} />
                </div>
            </Root>
        );
    }
}

export default App;
