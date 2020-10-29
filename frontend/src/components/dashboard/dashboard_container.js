import { connect } from 'react-redux';
import Dashboard from './dashboard';

const mapStateToProps = (state) => {
    return {
        //need current user in our state => firstname but there is only email in the state right now
        firstname: state.session.user.firstname
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);