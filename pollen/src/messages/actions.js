/**
 * Created by Orion on 3/17/2018.
 */

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const ADD_TAG = 'ADD_TAG';

export const sendMessage = ( message, author=null ) => {
    return async function( dispatch ){
        dispatch({
            type: SEND_MESSAGE,
            message: message,
            author: author
        });
    }
};

export const addTag = ( messageId, tag ) => {
    return async function( dispatch ){
        dispatch({
            type: ADD_TAG,
            tag: tag,
            message: messageId
        })
    }
};

