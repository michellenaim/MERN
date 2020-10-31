import React from 'react';
import DoughnutGraph from "../graphs/doughnut_graph"

const CATEGORY_KEYS = ["Home", "Utilities", "Savings", "Food", "Other",
                    "HealthAndFitness", "Shopping", "Transportation",
                    "Entertainment"];

class EditBudget extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            percentages: {},
            incomeSplits: {},
            income: 0,
            updatedIncome: null,
            isEdited: false
        }

        this.handleSplit = this.handleSplit.bind(this);
        this.loadStateFromProps = this.loadStateFromProps.bind(this);
        this.getCurrentBudgetBreakdown = this.getCurrentBudgetBreakdown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdatedIncome = this.handleUpdatedIncome.bind(this);
        this.handleDiscardChanges = this.handleDiscardChanges.bind(this);
    }

    componentDidMount() {
        this.props.fetchCurrentUser()
            .then(() => {
                this.loadStateFromProps();
                this.budgetBreakdown = this.props.currentUser.budgetBreakdown;
            });
    }

    handleUpdatedIncome(e) {
        e.preventDefault();
        this.setState({updatedIncome: e.target.value})
    }

    handleSplit(currentCategory) {
        return e => {
            e.preventDefault();
            let { percentages, incomeSplits, updatedIncome } = {...this.state};
            let currentPercentages = percentages;
            let currentIncomeSplits = incomeSplits;
            if (currentCategory !== "Income") {
                let previousSliderValue = percentages[currentCategory]
                let currentSliderValue = e.target.value;
                let valueChange = currentSliderValue - previousSliderValue;
                let newIncomePercentage = percentages.Income - valueChange;
                if (newIncomePercentage < 0) return null;
                currentPercentages.Income = newIncomePercentage;
                currentPercentages[currentCategory] = currentSliderValue;
                currentIncomeSplits[currentCategory] = Math.round(this.state.income*currentSliderValue);
                currentIncomeSplits.Income = Math.round(newIncomePercentage*this.state.income)
                this.setState({isEdited: true});
            }
            else if (currentCategory === "Income" && 
                     updatedIncome !== null &&
                     updatedIncome.trim().length > 0 &&
                     updatedIncome >= 0)
            {
                CATEGORY_KEYS.forEach((categoryKey) => {
                    currentIncomeSplits[categoryKey] = Math.round(currentPercentages[categoryKey]*updatedIncome);
                });
                currentIncomeSplits.Income = Math.round(updatedIncome*currentPercentages.Income);
                this.setState({income: updatedIncome})
                const budgetBreakdown = {income: updatedIncome,
                                         budgetBreakdown: this.budgetBreakdown};
                this.props.updateBudgetBreakdown(budgetBreakdown);
            }
            this.setState({percentages: currentPercentages});
            this.setState({incomeSplits: currentIncomeSplits});
        }
    }
    
    loadStateFromProps() {
        let { percentages, incomeSplits } = {...this.state};
        let currentPercentages = percentages;
        let currentIncomeSplits = incomeSplits;
        let totalPercentage = 0;
        this.props.currentUser.budgetBreakdown.forEach(budgetSplit => {
            if (budgetSplit.category === "Health & Fitness") {
                currentPercentages.HealthAndFitness = budgetSplit.percent;
                currentIncomeSplits.HealthAndFitness = Math.round(budgetSplit.incomeSplit);
            }
            else {
                currentPercentages[budgetSplit.category] = budgetSplit.percent;
                currentIncomeSplits[budgetSplit.category] = Math.round(budgetSplit.incomeSplit);
            }
            totalPercentage += budgetSplit.percent;
        })
        currentPercentages.Income = 1 - totalPercentage;
        currentIncomeSplits.Income = Math.round(currentPercentages.Income*this.props.currentUser.income);
        this.setState({isEdited: false});
        this.setState({percentages: currentPercentages});
        this.setState({incomeSplits: currentIncomeSplits})
        this.setState({income: this.props.currentUser.income})
        this.setState({budgetBreakdown: this.props.currentUser.budgetBreakdown})
    }

    getCurrentBudgetBreakdown() {
        let updatedBudgetBreakdown = [];
        this.budgetBreakdown.forEach(budgetType => {
            let updatedBudgetType = {};
            const category = budgetType.category;
            updatedBudgetType._id = budgetType._id;
            updatedBudgetType.category = category;
            if (category === 'Health & Fitness') {
                updatedBudgetType.incomeSplit = this.state.incomeSplits.HealthAndFitness;
                updatedBudgetType.percent = Number(this.state.percentages.HealthAndFitness);
            }
            else {
                updatedBudgetType.incomeSplit = this.state.incomeSplits[category];
                updatedBudgetType.percent = Number(this.state.percentages[category]);
            }
            updatedBudgetBreakdown.push(updatedBudgetType);
        })
        return {
                income: this.state.income,
                budgetBreakdown: updatedBudgetBreakdown
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateBudgetBreakdown(this.getCurrentBudgetBreakdown())
            .then(() => {this.setState({isEdited: false})});
    }

    handleDiscardChanges() {
        this.props.fetchCurrentUser()
            .then(() => {
                this.loadStateFromProps();
                this.budgetBreakdown = this.props.currentUser.budgetBreakdown;
            });
    }


    render() {
        const sliders = CATEGORY_KEYS.map((slider, idx) => {
            return (
              <div key={idx} className='edit-budget-slider tooltip'>
                <label className="budget-category-value">
                  {slider === "HealthAndFitness"
                    ? "Health & Fitness"
                    : slider.charAt(0).toUpperCase() + slider.slice(1)}
                </label>
                <div className="slider-display">
                    <input
                    onChange={this.handleSplit(slider)}
                    type="range"
                    min="0"
                    max="1"
                    step="0.00001"
                    value={this.state.percentages[slider]}
                    />
                    <div className="display-value">${this.state.incomeSplits[slider]}</div>
                </div>
                <span style={{left: `${7.0+this.state.percentages[slider]*42}%`}} class="tooltiptext">{Math.round(this.state.percentages[slider]*100)}%</span>
              </div>
            );
        });
        return (
            <div className="edit-budget">
                <form className="edit-budget-form" onSubmit={this.handleSubmit} >
                    <div className="edit-budget-title">
                        <h1>Breakdown your Budget</h1>
                    </div>
                    <div className="input-wrapper">     
                        
                        <div className="input-wrapper-left">
                            <div className="edit-budget-income-wrapper">
                                <div className="edit-budget-income">
                                    <input onChange={this.handleUpdatedIncome} type="text" placeholder="$" value={this.state.updatedIncome}/>
                                    <button className="update-income" onClick={this.handleSplit("Income")}>Update Income</button>
                                </div>

                            </div>
                        </div>
                        <div className="input-wrapper-right">
                            <DoughnutGraph currentPercentages={this.state.percentages} currentUser={this.props.currentUser} />
                        </div>
                    </div>
                    <div className="edit-budget-income-buttons-wrapper">
                        <div className={`edit-budget-income-buttons${this.state.isEdited ? '' : '-disable'}`}>
                            <input disabled={!this.state.isEdited} type="submit" value="Apply Changes"/>
                        </div>
                    </div>
                    <div className="edit-budget-sliders-wrapper">
                        <div className="edit-budget-sliders-title">
                            {/* <p>Breakdown your budget:</p> */}
                        </div>
                        <div className="income-slider">
                            <label className="remaining-income">Remaining Income</label>
                            <div className="slider-display">
                                {/*<input
                                onChange={this.handleSplit("Income")}
                                type="range"
                                min="0"
                                max="1"
                                step="0.00001"
                                value={this.state.percentages.Income}
                                />*/}
                                <div className="remaining-income-value">${this.state.incomeSplits.Income}</div>
                            </div>
                        </div>
                    </div>
                    <div className="edit-budget-sliders">
                        {sliders}
                    </div>
               </form>
               <button disabled={!this.state.isEdited} onClick={this.handleDiscardChanges}>Discard Changes</button>
            </div>
        );
    }
}

export default EditBudget;