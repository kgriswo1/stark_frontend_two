import React from 'react';

class SellStock extends React.Component {

    state = {
        newInfo: {
            user_id: localStorage.user_id,
            ticker: localStorage.ticker,
            quantity: localStorage.quantity,
            date: localStorage.date,
            price: localStorage.price,
            sold: localStorage.sold,
            id: localStorage.id
        },
        currentPrice: localStorage.currentPrice,
        amount: 0
    }

    inputQuantity = (e) => {
        this.setState({
            amount: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()

        let changedInfo = {...this.state.newInfo}
        changedInfo.sold = parseInt(changedInfo.sold) + parseInt(this.state.amount) 
        
        // debugger

        // this.setState({
        //     newInfo: {...changedInfo}
        // })

        // debugger

        this.props.sellStock(changedInfo)
        this.props.closePopup()
    }

    onClickHandler = (e) => {
        if (e.target.className === "settings") {
            this.props.closePopup()
            localStorage.clear()
            localStorage.user_id = this.state.newInfo.user_id
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="settings" onClick={this.onClickHandler}>
                <div className="ui form settingsinner">
                    <div className="settingsinner2">
                        <div className="addMoney">Wealth: ${this.props.money}</div>
                        <div>Stock Price: {localStorage.currentPrice}</div>
                        <form onSubmit={this.onSubmitHandler} className="fields form">
                            <div className="field">
                                <input type="number" placeholder="quantity" min="1" onChange={this.inputQuantity}/>
                            </div>
                            <button className="ui black button">Sell</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default SellStock
