import React from 'react';
import DoughnutGraph from "../graphs/doughnut_graph";
import { Link } from "react-router-dom";

const CATEGORY_KEYS = ["Home", "Utilities", "Savings", "Food", "Other",
                    "HealthAndFitness", "Shopping", "Transportation",
                    "Entertainment"];

class EditBudget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentages: {},
      incomeSplits: {},
      income: 0,
      updatedIncome: null,
      isEdited: false,
    };
    this.isMaxed = {
      "Home": false,
      "Utilities": false,
      "Savings": false,
      "Food": false,
      "Other": false,
      "Health & Fitness": false,
      "Shopping": false,
      "Transportation": false,
      "Entertainment": false
    }

    this.handleSplit = this.handleSplit.bind(this);
    this.loadStateFromProps = this.loadStateFromProps.bind(this);
    this.getCurrentBudgetBreakdown = this.getCurrentBudgetBreakdown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdatedIncome = this.handleUpdatedIncome.bind(this);
    this.handleDiscardChanges = this.handleDiscardChanges.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrentUser().then(() => {
      this.loadStateFromProps();
      this.budgetBreakdown = this.props.currentUser.budgetBreakdown;
    });
  }

  handleUpdatedIncome(e) {
    e.preventDefault();
    this.setState({ updatedIncome: e.target.value });
  }

  handleSplit(currentCategory) {
    return (e) => {
      e.preventDefault();
      let { percentages, incomeSplits, updatedIncome } = { ...this.state };
      let currentPercentages = percentages;
      let currentIncomeSplits = incomeSplits;
      if (currentCategory !== "Income") {
        let previousSliderValue = percentages[currentCategory];
        let currentSliderValue = e.target.value;
        let valueChange = currentSliderValue - previousSliderValue;
        let newIncomePercentage = percentages.Income - valueChange;
        if (newIncomePercentage < 0) {
          if (this.isMaxed[currentCategory]) return null;
          this.isMaxed[currentCategory] = true;
          newIncomePercentage = 0;
          currentSliderValue = percentages.Income + parseFloat(previousSliderValue);
        };
        currentPercentages.Income = newIncomePercentage;
        currentPercentages[currentCategory] = currentSliderValue;
        currentIncomeSplits[currentCategory] = Math.round(
          this.state.income * currentSliderValue
        );
        Object.keys(this.isMaxed).forEach(category => this.isMaxed[category] = false);
        currentIncomeSplits.Income = Math.round(
          newIncomePercentage * this.state.income
        );
        this.setState({ isEdited: true });
      } else if (
        currentCategory === "Income" &&
        updatedIncome !== null &&
        updatedIncome.trim().length > 0 &&
        updatedIncome >= 0
      ) {
        CATEGORY_KEYS.forEach((categoryKey) => {
          currentIncomeSplits[categoryKey] = Math.round(
            currentPercentages[categoryKey] * updatedIncome
          );
        });
        currentIncomeSplits.Income = Math.round(
          updatedIncome * currentPercentages.Income
        );
        this.setState({ income: updatedIncome });
        const budgetBreakdown = {
          income: updatedIncome,
          budgetBreakdown: this.budgetBreakdown,
        };
        this.props.updateBudgetBreakdown(budgetBreakdown);
      }
      this.setState({ percentages: currentPercentages });
      this.setState({ incomeSplits: currentIncomeSplits });
    };
  }

  loadStateFromProps() {
    let { percentages, incomeSplits } = { ...this.state };
    let currentPercentages = percentages;
    let currentIncomeSplits = incomeSplits;
    let totalPercentage = 0;
    this.props.currentUser.budgetBreakdown.forEach((budgetSplit) => {
      if (budgetSplit.category === "Health & Fitness") {
        currentPercentages.HealthAndFitness = budgetSplit.percent;
        currentIncomeSplits.HealthAndFitness = Math.round(
          budgetSplit.incomeSplit
        );
      } else {
        currentPercentages[budgetSplit.category] = budgetSplit.percent;
        currentIncomeSplits[budgetSplit.category] = Math.round(
          budgetSplit.incomeSplit
        );
      }
      totalPercentage += budgetSplit.percent;
    });
    currentPercentages.Income = 1 - totalPercentage;
    currentIncomeSplits.Income = Math.round(
      currentPercentages.Income * this.props.currentUser.income
    );
    this.setState({ isEdited: false });
    this.setState({ percentages: currentPercentages });
    this.setState({ incomeSplits: currentIncomeSplits });
    this.setState({ income: this.props.currentUser.income });
    this.setState({ budgetBreakdown: this.props.currentUser.budgetBreakdown });
  }

  getCurrentBudgetBreakdown() {
    let updatedBudgetBreakdown = [];
    this.budgetBreakdown.forEach((budgetType) => {
      let updatedBudgetType = {};
      const category = budgetType.category;
      updatedBudgetType._id = budgetType._id;
      updatedBudgetType.category = category;
      if (category === "Health & Fitness") {
        updatedBudgetType.incomeSplit = this.state.incomeSplits.HealthAndFitness;
        updatedBudgetType.percent = Number(
          this.state.percentages.HealthAndFitness
        );
      } else {
        updatedBudgetType.incomeSplit = this.state.incomeSplits[category];
        updatedBudgetType.percent = Number(this.state.percentages[category]);
      }
      updatedBudgetBreakdown.push(updatedBudgetType);
    });
    return {
      income: this.state.income,
      budgetBreakdown: updatedBudgetBreakdown,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props
      .updateBudgetBreakdown(this.getCurrentBudgetBreakdown())
      .then(() => {
        this.setState({ isEdited: false });
      });
  }

  handleDiscardChanges() {
    this.props.fetchCurrentUser().then(() => {
      this.loadStateFromProps();
      this.budgetBreakdown = this.props.currentUser.budgetBreakdown;
    });
  }

  render() {
    const sliders = CATEGORY_KEYS.map((slider, idx) => {
      return (
        <div key={idx} className="edit-budget-slider">
          <label className="budget-category-value">
            {slider === "HealthAndFitness"
              ? "Health & Fitness"
              : slider.charAt(0).toUpperCase() + slider.slice(1)}
          </label>
          <div className="slider-display">
            <input
              className="tooltip"
              onChange={this.handleSplit(slider)}
              type="range"
              min="0"
              max="1"
              step="0.00001"
              value={this.state.percentages[slider]}
              />
            <div className="display-value">
              ${this.state.incomeSplits[slider]}
            </div>
          </div>
          <div
            style={{ left: `${(this.state.percentages[slider]) * 69}%` }}
            className="tooltiptext"
            >
            {Math.round(this.state.percentages[slider] * 100)}%
            <i></i>
          </div>
        </div>
      );
    });

    let updatedIncomeVar;

    if (!this.state.updatedIncome) {
      updatedIncomeVar = "";
    } else {
      updatedIncomeVar = this.state.updatedIncome;
    }

    return (
      <div className="edit-budget">
        <div className="edit-budget-form-wrapper">
          <div className="edit-budget-title">
            <h1>Break Down Your Budget</h1>
          </div>
          <div className="budget-breakdown-description">
            <p>
              If this is your first time accessing your budget, we've broken
              down your budget for you. Hover over graph to see how we've split
              up each budget category. Use the sliders to adjust how much you
              would like to spend for each category.
            </p>
          </div>
          <form className="edit-budget-form" onSubmit={this.handleSubmit}>
            <div className="budget-left">
              <div className="sticky-wrapper">
                <div className="doughnut-text-wrapper">
                  <p className="doughnut-text">
                    How You've Split Up Your Income
                  </p>
                </div>
                <div className="budget-doughnut-wrapper">
                  <DoughnutGraph currentPercentages={this.state.percentages} />
                </div>
                <div className="income-value-text-wrapper-left">
                  <label className="income-value-text-left">
                    Remaining Income Left to Allocate:
                  </label>
                  <div className="income-value-wrapper-left">
                    <div className="income-value-left">
                      ${this.state.incomeSplits.Income}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="edit-budget-sliders">
              <div className="income-wrapper">
                <div className="income-value-text-wrapper">
                  <label className="income-value-text">Monthly Income</label>
                  <div className="income-value-wrapper">
                    <div className="income-value">${this.state.income}</div>
                  </div>
                </div>

                <div className="input-wrapper">
                  <div className="edit-budget-income-wrapper">
                    <div className="edit-budget-income">
                      <input
                        className="update-income-input"
                        onChange={this.handleUpdatedIncome}
                        type="number"
                        placeholder={`$`}
                        value={updatedIncomeVar}
                      />
                      <button
                        className="update-income"
                        onClick={this.handleSplit("Income")}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {sliders}
              <div className="edit-budget-income-buttons-wrapper">
                <div
                  className={`edit-budget-income-buttons${
                    this.state.isEdited ? "" : "-disable"
                  }`}
                >
                  <input
                    className="apply-changes-btn"
                    disabled={!this.state.isEdited}
                    type="submit"
                    value="Apply Changes"
                  />
                  <input
                    className="discard-changes-btn"
                    disabled={!this.state.isEdited}
                    onClick={this.handleDiscardChanges}
                    type="button"
                    value="Discard Changes"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditBudget;