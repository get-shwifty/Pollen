/**
 * Created by Orion on 3/17/2018.
 */

export const TAG_ADD_REQUEST = 'add_tag';
export const TAG_ADD_SUCCESS = 'added_tag';
export const TAGS_RECEIVED = 'all_tags';

export const addTag = ( tag, messageId ) => {
    return async ( dispatch, getState ) => {
        getState().wss.send(TAG_ADD_REQUEST, { tag, messageId});
    }
};
