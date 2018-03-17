/**
 * Created by Orion on 3/17/2018.
 */

let messageIdCounter = 0;
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';

export const ADD_TAG = 'ADD_TAG';

export const sendMessage = ( message, author=null ) => {
    return async function( dispatch ){
        // dispatch({
        //     type: SEND_MESSAGE_REQUEST,
        //     id: messageIdCounter++,
        //     message: message,
        //     author: author,
        // });
        //TODO écrire la requête
        // const res = await myRequest();
        const res = {
            id: messageIdCounter++,
            message,
            author
        };
        dispatch({
            type: SEND_MESSAGE_SUCCESS,
            id: res.id,
            message: res.message,
            author: res.author
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

