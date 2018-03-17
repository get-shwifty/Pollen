/**
 * Created by Orion on 3/17/2018.
 */

import { connect } from 'react-redux'
import { sendMessage } from '../actions'

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendMessage( message ){
            dispatch( sendMessage( message ) )
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
