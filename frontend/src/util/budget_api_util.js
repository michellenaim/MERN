import axios from "axios";

export const fetchBudgetBreakdown = () => {
  return axios.get("/api/budgets/");
};

export const updateBudgetBreakdown = () => {
  return axios.get("/api/budgets/update");
}