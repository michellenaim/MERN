import { connect } from 'react-redux';
import DoughnutGraph from './doughnut_graph';
import { fetchAllUsers, fetchCurrentUser} from '../../actions/users_actions'

const mapStateToProps = (state) => {
    return {
        //current user
        //current user's percentages/categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DoughnutGraph);