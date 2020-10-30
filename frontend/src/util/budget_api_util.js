import axios from "axios";

export const fetchBudgetBreakdown = () => {
  return axios.get("/api/budgets/");
};

export const updateBudgetBreakdown = (budgetBreakdown) => {
  return axios.patch("/api/budgets/update", budgetBreakdown);
}