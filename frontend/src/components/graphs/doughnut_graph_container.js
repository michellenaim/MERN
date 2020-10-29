import { connect } from 'react-redux';
import DoughnutGraph from './doughnut_graph';

const mapStateToProps = (state) => {
    return {
        //current user
        //current user's percentages/categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DoughnutGraph);