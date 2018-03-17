/**
 * Created by Orion on 3/17/2018.
 */

import { ADD_TAG, SEND_MESSAGE } from './actions';
import { combineReducers } from 'redux'

const byId = ( state = {}, action ) => {
    switch( action.type ){
        case SEND_MESSAGE:
            return {
                ...state,
                [ action.id ] : { id: action.id, message: action.message, author: action.author}
            }
    }
};
