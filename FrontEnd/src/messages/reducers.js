/**
 * Created by Orion on 3/17/2018.
 */

import _ from 'lodash';
import { MESSAGE_RECEIVED, MESSAGES_RECEIVED } from './actions';
import { combineReducers } from 'redux'

const byId = ( state = {}, action ) => {
    switch( action.type ){
        case MESSAGES_RECEIVED:
            return _.zipObject(
                _.map(action.data, 'id'),
                action.data
            );
        case MESSAGE_RECEIVED:
            return {
                ...state,
                [ action.data.id ] : { ...action.data }
            };
        default:
            return state;
    }
};

// const messagesQueued = ( state = [], action ) => {
//     switch ( action.type ){
//         case SEND_MESSAGE_REQUEST:
//             return state.slice().push( action.id );
//         case SEND_MESSAGE_SUCCESS:
//             return state.filter( id => id !== action.id );
//         default:
//             return state;
//     }
// };

export default combineReducers({
    byId
    // messagesQueued
});
