import * as BudgetApiUtil from "../util/budget_api_util";

export const RECEIVE_BUDGET_BREAKDOWN = "RECEIVE_BUDGET_BREAKDOWN";
export const EDIT_BUDGET_BREAKDOWN = "EDIT_BUDGET_BREAKDOWN";
// actions to display edit errors since we want to render errors to user? 

export const receiveBudgetBreakdown = (budgetBreakdown) => {
  return {
    type: RECEIVE_BUDGET_BREAKDOWN,
    budgetBreakdown,
  };
};
export const editBudgetBreakdown = (budgetBreakdown) => {
  return {
    type: EDIT_BUDGET_BREAKDOWN,
    budgetBreakdown,
  };
};

export const fetchBudgetBreakdown = () => (dispatch) => {
  return BudgetApiUtil.fetchBudgetBreakdown()
    .then(budgetBreakdown => dispatch(receiveBudgetBreakdown(budgetBreakdown))
  );
};

export const updateBudgetBreakdown = (budgetBreakdown) => (dispatch) => {
    return BudgetApiUtil.updateBudgetBreakdown(budgetBreakdown)
      .then(budgetBreakdown => dispatch(editBudgetBreakdown(budgetBreakdown)))
}
