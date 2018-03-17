/**
 * Created by Orion on 3/17/2018.
 */

import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.messages.byId[ ownProps.id ]
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
