import React from 'react';

class EditBudget extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            home: 10,
            utilities: 10,
            savings: 10,
            food: 30,
            other: 2,
            healthAndFitness:  4,
            shopping: 25,
            transportation: 4,
            entertainment: 5
        };
        this.handleSplit = this.handleSplit.bind(this);
    }

    handleSplit(currentSlider) {
        return e => {
            e.preventDefault();
            let sliders = {...this.state};
            let previousSliderValue = sliders[currentSlider]
            let currentSliderValue = e.target.value;
            let valueChange = currentSliderValue - previousSliderValue;
            if (currentSlider !== "savings") {
                let newSavings = sliders.savings - valueChange;
                if (newSavings < 0) return null;
                this.setState({[currentSlider]: currentSliderValue});
                this.setState({savings: sliders.savings - valueChange});
            } 
        }
    }

    render() {
        const sliderArray = ["home", "utilities", "savings", "food", "other",
                             "healthAndFitness", "shopping", "transportation",
                             "entertainment"];
        const sliders = sliderArray.map((slider, idx) => {
            return (
              <div key={idx} className={`edit-budget-slider`}>
                <label>
                  {slider === "healthAndFitness"
                    ? "Health + Fitness"
                    : slider.charAt(0).toUpperCase() + slider.slice(1)}
                </label>
                <input
                onChange={this.handleSplit(slider)}
                type="range"
                min="0"
                max="100"
                step="1"
                value={this.state[slider]}
                />
              </div>
            );
        });
        return (
            <div className="edit-budget">
                <div className="edit-budget-title">
                    <h1>Budget Split</h1>
                </div>
                <div className="edit-budget-income-wrapper">
                    <form className="edit-budget-income-form">
                        <label>What's your income?</label>
                        <input type="text" placeholder="$"></input>
                        <div className="edit-budget-income-submit-button">
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
                <div className="edit-budget-sliders-wrapper">
                    <div className="edit-budget-sliders-title">
                        <p>Breakdown your budget:</p>
                    </div>
                    <div className="edit-budget-sliders">
                        {sliders}
                    </div>
                </div>
            </div>
        );
    }
}

export default EditBudget;