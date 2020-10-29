import React from 'react';

class EditBudget extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            percentages: {},
            income: 0,
            isEdited: false
        }

        this.handleSplit = this.handleSplit.bind(this);
        this.loadStateFromProps = this.loadStateFromProps.bind(this);
    }

    componentDidMount() {
        this.props.fetchCurrentUser()
            .then(() => {
                this.loadStateFromProps();
            });
    }

    handleSplit(currentSlider) {
        return e => {
            e.preventDefault();
            let { percentages } = {...this.state};
            let currentState = percentages;
            let previousSliderValue = percentages[currentSlider]
            let currentSliderValue = e.target.value;
            let valueChange = currentSliderValue - previousSliderValue;
            if (currentSlider !== "Income") {
                let newIncome = percentages.Income - valueChange;
                if (newIncome < 0) return null;
                currentState[currentSlider] = currentSliderValue;
                currentState.Income = newIncome;
                this.setState({isEdited: true});
                this.setState({percentages: currentState});
            } 
        }
    }
    
    loadStateFromProps() {
        let { percentages } = {...this.state};
        let currentState = percentages;
        let totalPercentage = 0;
        this.props.currentUser.budgetBreakdown.forEach(budgetSplit => {
            if (budgetSplit.category === "Health & Fitness") {
                currentState.HealthAndFitness = budgetSplit.percent;
            }
            else {
                this.state.percentages[budgetSplit.category] = budgetSplit.percent;
                currentState[budgetSplit.category] = budgetSplit.percent;
            }
            totalPercentage += budgetSplit.percent;
        })
        currentState.Income = 1 - totalPercentage;
        this.setState({isEdited: false});
        this.setState({percentages: currentState});
        this.setState({income: this.props.currentUser.income})
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
                    <div className="display-value">${(this.state.income*this.state.percentages[slider]).toFixed(2)}</div>
                </div>
                <span style={{left: `${7.0+this.state.percentages[slider]*42}%`}} class="tooltiptext">{Math.round(this.state.percentages[slider]*100)}%</span>
              </div>
            );
        });
        return (
            <div className="edit-budget">
                <form className="edit-budget-form" >
                    <div className="edit-budget-title">
                        <h1>Budget Split</h1>
                    </div>
                    <div className="edit-budget-income-wrapper">
                        <div className="edit-budget-income">
                            <label>What's your income?</label>
                            <input type="text" placeholder="$" value={this.state.Income}/>
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
                                <div className="display-value">${(this.state.percentages.Income * this.state.income).toFixed(2)}</div>
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