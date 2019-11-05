import React from 'react';

class Stock extends React.Component {

    render() {
        return (
        <div onClick={() => this.props.removeFromWatchlist(this.props.stock)}>
            <h1>{"Ticker: " + this.props.stock.ticker}</h1>
        </div>
        )
    }

}

export default Stock