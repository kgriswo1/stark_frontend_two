import React from 'react';
import { Link } from 'react-router-dom'


class Stock extends React.Component {

    render() {
        return (
        <div>
            <h1>{"Ticker: " + this.props.stock["01. symbol"]}</h1>
            <p>{"Price: " + this.props.stock["05. price"]}</p>
            <p>{"Volume: " + this.props.stock["06. volume"]}</p>
            <Link to={"/buystock"} >
                <button onClick={() => {
                    localStorage.ticker = this.props.stock["01. symbol"]
                    localStorage.date = this.props.stock["07. latest trading day"]
                    localStorage.price = this.props.stock["05. price"]
                }}>
                    {"Buy: " + this.props.stock["01. symbol"]}
                </button>
            </Link>
            <button onClick={() => {this.props.addToWatchList(this.props.stock["01. symbol"])}} >Add To Watchlist</button>
        </div>
        )
    }

}

export default Stock