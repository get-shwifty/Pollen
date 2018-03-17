/**
 * Created by Orion on 3/17/2018.
 */

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const ADD_TAG = 'ADD_TAG';

export function sendMessage( message, author=null ){
    return async function(dispatch, getState){
        dispatch({
            type: SEND_MESSAGE,
            message: message,
            author: author
        });
    }
}

export function addTag( message_id ){

}

