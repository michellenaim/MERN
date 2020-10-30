import { 
  RECEIVE_BUDGET_BREAKDOWN,  
  EDIT_BUDGET_BREAKDOWN
} from "../actions/budget_actions";

const BudgetReducer = (state = {}, action) => {
  Object.freeze(state); 

  switch (action.type) {
    case RECEIVE_BUDGET_BREAKDOWN:
      return action.budgetBreakdown;
    case EDIT_BUDGET_BREAKDOWN:
      return action.budgetBreakdown;
    default:
      return state;
  }
};

export default BudgetReducer;
