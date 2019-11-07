import React from 'react';

class SellStock extends React.Component {

    state = {
        user_id: localStorage.user_id,
        ticker: localStorage.ticker,
        quantity: 0,
        date: localStorage.date,
        price: localStorage.price,
        sold: true, 
        bought: false
    }

    inputQuantity = (e) => {
        this.setState({
            quantity: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Sell Stock: {localStorage.ticker}</h1>
                <p>Wealth: ${this.props.money}</p>
                <p>Stock Price: {localStorage.price}</p>
                <form onSubmit={(e) => this.props.sellStock(e, this.state)}>
                    <input type="number" placeholder="enter quantity" min="0" onChange={this.inputQuantity}/>
                    <button type="submit">Sell Stock</button>
                </form>
            </div>
        )
    }

}

export default SellStock