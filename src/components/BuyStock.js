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

    

    render() {
        return (
            <div>
                <h1>Buy Stock: {this.props.logos[this.state.ticker][0]}</h1>
                <p>Wealth: ${this.props.money}</p>
                <p>Stock Price: {localStorage.price}</p>
                <form onSubmit={(e) => this.props.addToMyStocks(e, this.state)}>
                    <input type="number" placeholder="enter quantity" min="0" onChange={this.inputQuantity}/>
                    <button type="submit" className="ui orange button" >Buy Stock</button>
                </form>
            </div>
        )
    }

}

export default BuyStock