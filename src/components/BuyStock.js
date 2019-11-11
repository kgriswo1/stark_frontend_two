import React from 'react';

class BuyStock extends React.Component {

    state = {
        user_id: localStorage.user_id,
        ticker: localStorage.ticker,
        quantity: null,
        date: localStorage.date,
        price: localStorage.price,
        sold: 0
    }

    inputQuantity = (e) => {
        this.setState({
            quantity: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        this.props.addToMyStocks(this.state)
        this.props.closePopup()
    }

    onClickHandler = (e) => {
        if (e.target.className === "settings") {
            this.props.closePopup()
            localStorage.clear()
            localStorage.user_id = this.state.user_id
        }
    }

    render() {
        return (
            <div className="settings" onClick={this.onClickHandler}>
                <div className="ui form settingsinner">
                    <div className="settingsinner2">
                        <div className="addMoney">Wealth: ${this.props.money}</div>
                        <div>Stock Price: {localStorage.price}</div>
                        <form onSubmit={this.onSubmitHandler} className="fields form">
                            <div className="field">
                                <input type="number" placeholder="quantity" min="0" onChange={this.inputQuantity}/>
                            </div>
                            <button className="ui black button">Buy</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default BuyStock