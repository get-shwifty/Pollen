/**
 * Created by Orion on 3/17/2018.
 */

import { connect } from 'react-redux'
import { messageArraySelector } from '../selectors'

const mapStateToProps = state => {
    return {
        messages: messageArraySelector(state)
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
