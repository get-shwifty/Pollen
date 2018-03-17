/**
 * Created by Orion on 3/17/2018.
 */

import { ADD_TAG, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from './actions';
import { combineReducers } from 'redux'

const byId = ( state = {}, action ) => {
    switch( action.type ){
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                [ action.id ] : { id: action.id, message: action.message, author: action.author}
            };
        default:
            return state;
    }
};

const messages = ( state = [], action ) => {
    switch ( action.type ){
        case SEND_MESSAGE_SUCCESS:
            return [...state, action.id];

        default:
            return state;
    }
};

const messagesQueued = ( state = [], action ) => {
    switch ( action.type ){
        case SEND_MESSAGE_REQUEST:
            return state.slice().push( action.id );
        case SEND_MESSAGE_SUCCESS:
            return state.filter( id => id !== action.id );
        default:
            return state;
    }
};

export default combineReducers({
    byId,
    messages,
    messagesQueued
});
