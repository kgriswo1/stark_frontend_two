import React from 'react';

class Settings extends React.Component {
    state = {
        moneyState: 0
    }

    addMoneyChangeHandler = (e) => {
        let amount = parseFloat(e.target.value)
        this.setState({
          moneyState: amount
        })
    }

    submitHandler = (e) => {
        e.preventDefault() 
        this.props.addMoneySubmitHandler(this.state.moneyState)
        this.props.closePopup()
    }

    onClickHandler = (e) => {
        if (e.target.className === "settings") {
            this.props.closePopup()
        }
    }

    render() {
        return (
            <div className="settings" onClick={this.onClickHandler}>
                <div className="ui form settingsinner">
                    <div className="settingsinner2">
                        <div className="addMoney">Add Money</div>
                        <div>Current Amount: {this.props.money}</div>
                        <form onSubmit={this.submitHandler} className="fields form">
                            <div className="field">
                                <input type="number" name="money" placeholder="amount" onChange={this.addMoneyChangeHandler} />
                            </div>
                            
                            <button className="ui icon button">
                                <i className="plus square icon"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default Settings