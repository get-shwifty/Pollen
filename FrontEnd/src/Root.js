import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Wss from "./Wss";

class Root extends Component {

    state = {
        store: this.configureStore()
    };

    configureStore() {
        // see https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
        // eslint-disable-next-line no-underscore-dangle
        const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

        const store = createStore(
            this.props.rootReducer,
            {},
            composeEnhancers(
                applyMiddleware(thunk)
            )
        );

        const wss = new Wss(msg => {
            store.dispatch(msg);
        });

        store.dispatch({
            type: 'SET_WSS',
            wss
        });

        return store;
    }

    render() {
        return (
            <Provider store={this.state.store}>
                {this.props.children}
            </Provider>
        );
    }
}

export default Root;
