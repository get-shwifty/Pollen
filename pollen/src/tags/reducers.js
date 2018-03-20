/**
 * Created by Orion on 3/17/2018.
 */

import _ from 'lodash';
import { TAG_ADD_SUCCESS, TAGS_RECEIVED } from './actions';
import { combineReducers } from 'redux'

const byId = ( state = {}, action ) => {
    switch( action.type ){
        case TAGS_RECEIVED:
            return _.zipObject(
                _.map(action.data, 'id'),
                action.data
            );
        case TAG_ADD_SUCCESS:
            let temp = state;
            temp[action.data.id] ? temp[action.data.id].messages.push(action.data.messageId) : temp[action.data.id] = [action.data.messageId];
            return temp;
        default:
            return state;
    }
};


export default combineReducers({
    byId
});
