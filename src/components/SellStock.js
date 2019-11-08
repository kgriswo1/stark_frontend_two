import React from 'react';

class SellStock extends React.Component {

    state = {
        newInfo: {
            user_id: localStorage.user_id,
            ticker: localStorage.ticker,
            quantity: localStorage.quantity,
            date: localStorage.date,
            price: localStorage.price,
            sold: null,
            id: localStorage.id
        },
        currentPrice: localStorage.currentPrice
    }

    inputQuantity = (e) => {
        let changedInfo = {...this.state.newInfo}
        changedInfo.sold = e.target.value
        this.setState({
            newInfo: changedInfo
        })
    }

    render() {
        return (
            <div>
                <h1>Sell Stock: {localStorage.ticker}</h1>
                <p>Wealth: ${this.props.money}</p>
                <p>Stock Price: {localStorage.currentPrice}</p>
                <form onSubmit={(e) => this.props.sellStock(e, this.state.newInfo)}>
                    <input type="number" placeholder="enter quantity" min="0" onChange={this.inputQuantity}/>
                    <button type="submit">Sell Stock</button>
                </form>
            </div>
        )
    }

}

export default SellStock