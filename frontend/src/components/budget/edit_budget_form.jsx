import React from 'react';

class EditBudget extends React.Component {
    render() {
        const sliderArray = ["home", "utilities", "savings", "food", "other",
                             "health+fitness", "shopping", "transportation",
                             "entertainment"];
        const sliders = sliderArray.map((slider, idx) => {
            return (
                <div className={`edit-budget-slider`}>
                    <label>
                        {slider === "health+fitness" ? 
                            "Health + Fitness" :
                            slider.charAt(0).toUpperCase() + slider.slice(1)}
                    </label>
                    <input type="range" min="0" max="1" step="0.01"/>
                </div>
            )
        });
        return (
            <div className="edit-budget">
                <div className="edit-budget-title">
                    <h1>Budget Split</h1>
                </div>
                <div className="edit-budget-income-wrapper">
                    <form className="edit-budget-income-form">
                        <label>What's your income?</label>
                        <input type="text"></input>
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