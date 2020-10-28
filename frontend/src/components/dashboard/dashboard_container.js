import { connect } from 'react-redux';
import Dashboard from './dashboard';

const mapStateToProps = (state) => {
    return {
        //need current user in our state?
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);