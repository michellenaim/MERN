import React from 'react';

class EditBudget extends React.Component {

    constructor (props) {
        super (props);
        // TODO: the default state will eventually be set by the props:
        // this.state = this.props.user.budgetBreakdown
        this.state = {
            home: 10,
            utilities: 10,
            savings: 10,
            food: 30,
            other: 2,
            healthAndFitness:  4,
            shopping: 25,
            transportation: 4,
            entertainment: 5,
            income: 0
        };
        // the state will then look like the following:
                    /*
            {
                "income": 0,
                "budgetBreakdown": [
                    {
                        "percent": 0.53,
                        "category": "Home"
                    },
                    {
                        "percent": 0.6,
                        "category": "Other"
                    }
                ]
            }
         */
        this.handleSplit = this.handleSplit.bind(this);
    }

    handleSplit(currentSlider) {
        return e => {
            e.preventDefault();
            let sliders = {...this.state};
            let previousSliderValue = sliders[currentSlider]
            let currentSliderValue = e.target.value;
            let valueChange = currentSliderValue - previousSliderValue;
            if (currentSlider !== "income") {
                let newIncome = sliders.income - valueChange;
                if (newIncome < 0) return null;
                this.setState({[currentSlider]: currentSliderValue});
                this.setState({income: sliders.income - valueChange});
            } 
        }
    }

    render() {
        const sliderArray = ["home", "utilities", "savings", "food", "other",
                             "healthAndFitness", "shopping", "transportation",
                             "entertainment"];
        const sliders = sliderArray.map((slider, idx) => {
            return (
              <div key={idx} className='edit-budget-slider tooltip'>
                <label>
                  {slider === "healthAndFitness"
                    ? "Health + Fitness"
                    : slider.charAt(0).toUpperCase() + slider.slice(1)}
                </label>
                <div className="slider-display">
                    <input
                    onChange={this.handleSplit(slider)}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={this.state[slider]}
                    />
                    <div className="display-value">{this.state[slider]}</div>
                </div>
                <span style={{left: `${7.0+this.state[slider]/2.35}%`}} class="tooltiptext">{this.state[slider]}</span>
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
                            <input type="text" placeholder="$"></input>
                        </div>
                        <div className="edit-budget-income-buttons">
                            <input type="submit" value="Apply Changes"/>
                            <button>Discard Changes</button>
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
                                onChange={this.handleSplit("income")}
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={this.state.income}
                                />
                                <div className="display-value">{this.state.income}</div>
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