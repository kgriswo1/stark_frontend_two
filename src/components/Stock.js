import React from 'react';

class Stock extends React.Component {

    render() {
        return (
        <div onClick={() => {this.props.addToWatchList(this.props.stock["01. symbol"])}}>
            <h1>{"Ticker: " + this.props.stock["01. symbol"]}</h1>
            <p>{"Price: " + this.props.stock["05. price"]}</p>
            <p>{"Volume: " + this.props.stock["06. volume"]}</p>
        </div>
        )
    }

}

export default Stock