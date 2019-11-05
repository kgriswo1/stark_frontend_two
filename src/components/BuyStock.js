import React from 'react';

class BuyStock extends React.Component {

    state = {
        user_id: localStorage.user_id,
        ticker: localStorage.ticker,
        quantity: 0,
        date: localStorage.date,
        price: localStorage.price,
        sold: false, 
        bought: true
    }

    inputQuantity = (e) => {
        this.setState({
            quantity: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Buy Stock: {localStorage.ticker}</h1>
                <p>Stock Price: {localStorage.price}</p>
                <form onSubmit={(e) => this.props.addToMyStocks(e, this.state)}>
                    <input type="number" placeholder="enter quantity" min="0" onChange={this.inputQuantity}/>
                    <button type="submit">Buy Stock</button>
                </form>
            </div>
        )
    }

}

export default BuyStock