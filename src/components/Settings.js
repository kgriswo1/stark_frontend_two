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

    render() {
        console.log("in setting", this.props)
        return (
            <div>
                <h1>Add Money</h1>
                <h2>Amount: {this.props.money}</h2>
                <form onSubmit={(e) => this.props.addMoneySubmitHandler(e, this.state.moneyState)}>
                    <input type="number" name="money" placeholder="insert amount here" onChange={this.addMoneyChangeHandler} />
                    <input type="submit" name="Submit" /> 
                </form>
            </div>
        )
    }

}

export default Settings