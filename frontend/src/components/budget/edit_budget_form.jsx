import React from 'react';

class EditBudget extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            percentages: {},
            incomeSplits: {},
            income: 0,
            isEdited: false
        }

        this.budgetBreakdown = [];

        this.handleSplit = this.handleSplit.bind(this);
        this.loadStateFromProps = this.loadStateFromProps.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchCurrentUser()
            .then(() => {
                this.loadStateFromProps();
                this.budgetBreakdown = this.props.currentUser.budgetBreakdown;
            });
    }

    handleSplit(currentSlider) {
        return e => {
            e.preventDefault();
            if (currentSlider !== "Income") {
                let { percentages, incomeSplits } = {...this.state};
                let currentPercentages = percentages;
                let currentIncomeSplits = incomeSplits;
                let previousSliderValue = percentages[currentSlider]
                let currentSliderValue = e.target.value;
                let valueChange = currentSliderValue - previousSliderValue;
                let newIncome = percentages.Income - valueChange;
                if (newIncome < 0) return null;
                currentPercentages[currentSlider] = currentSliderValue;
                currentPercentages.Income = newIncome;
                currentIncomeSplits[currentSlider] = Math.floor(this.state.income*currentSliderValue);
                currentIncomeSplits.Income = Math.floor(newIncome*this.state.income)
                this.setState({percentages: currentPercentages});
                this.setState({incomeSplits: currentIncomeSplits});
            }
            else if (currentSlider === "Income") {
                this.setState({income: e.target.value})
            }
            this.setState({isEdited: true});
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
                currentIncomeSplits.HealthAndFitness = budgetSplit.incomeSplit;
            }
            else {
                this.state.percentages[budgetSplit.category] = budgetSplit.percent;
                currentPercentages[budgetSplit.category] = budgetSplit.percent;
                currentIncomeSplits[budgetSplit.category] = budgetSplit.incomeSplit;
            }
            totalPercentage += budgetSplit.percent;
        })
        currentPercentages.Income = 1 - totalPercentage;
        currentIncomeSplits.Income = Math.floor(currentPercentages.Income*this.props.currentUser.income);
        this.setState({isEdited: false});
        this.setState({percentages: currentPercentages});
        this.setState({incomeSplits: currentIncomeSplits})
        this.setState({income: this.props.currentUser.income})
        this.setState({budgetBreakdown: this.props.currentUser.budgetBreakdown})
    }

    handleSubmit(e) {
        e.preventDefault();
        let updatedBudgetBreakdown = [];
        this.budgetBreakdown.forEach(budgetType => {
            let updatedBudgetType = {};
            updatedBudgetType[budgetType.category] = budgetType.category;
            //updatedBudgetType.incomeSplit = budgetType.
            //debugger
        })
    }

    render() {
        const sliderArray = ["Home", "Utilities", "Savings", "Food", "Other",
                             "HealthAndFitness", "Shopping", "Transportation",
                             "Entertainment"];
        const sliders = sliderArray.map((slider, idx) => {
            return (
              <div key={idx} className='edit-budget-slider tooltip'>
                <label>
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
                        <h1>Budget Split</h1>
                    </div>
                    <div className="edit-budget-income-wrapper">
                        <div className="edit-budget-income">
                            <label>What's your income?</label>
                            <input onChange={this.handleSplit("Income")} type="text" placeholder="$" value={this.state.Income}/>
                        </div>
                        <div className={`edit-budget-income-buttons${this.state.isEdited ? '' : '-disable'}`}>
                            <input type="submit" value="Apply Changes"/>
                            <button onClick={this.loadStateFromProps}>Discard Changes</button>
                        </div>
                    </div>
                    <div className="edit-budget-sliders-wrapper">
                        <div className="edit-budget-sliders-title">
                            <p>Breakdown your budget:</p>
                        </div>
                        <div className="income-slider">
                            <label>Income</label>
                            <div className="slider-display">
                                <input
                                onChange={this.handleSplit("Income")}
                                type="range"
                                min="0"
                                max="1"
                                step="0.00001"
                                value={this.state.percentages.Income}
                                />
                                <div className="display-value">${this.state.incomeSplits.Income}</div>
                            </div>
                        </div>
                        <div className="edit-budget-sliders">
                            {sliders}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditBudget;