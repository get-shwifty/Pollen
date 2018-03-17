/**
 * Created by Orion on 3/17/2018.
 */

export const MESSAGE_REQUEST = 'message_request';
export const MESSAGE_RECEIVED = 'message';
export const MESSAGES_RECEIVED = 'all_messages';

export const sendMessage = ( message ) => {
    return async ( dispatch, getState ) => {
        getState().wss.send(MESSAGE_REQUEST, message);
    }
};
