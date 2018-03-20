/**
 * Created by Orion on 3/17/2018.
 */

import { connect } from 'react-redux'
import { addTag } from '../actions'

// const mapStateToProps = ownProps => {
//     return {
//
//     }
// };

const mapDispatchToProps = dispatch => {
    return {
        addTag( tag, messageId ){
            dispatch( addTag( tag, messageId ) )
        }
    }
};

export default connect(
    // mapStateToProps,
    mapDispatchToProps
);
