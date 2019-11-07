import React from 'react';
import { Link } from 'react-router-dom'
import MyStock from './MyStock';

class StockShow extends React.Component {
    _isMounted = false

    state = {
        showStock: {},
    }

    componentDidMount() {
        this._isMounted = true
        setInterval(this.fetchChange, 20000)
        this.fetchOther(this.props.ticker)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    stocksOwned = () => {
        return this.props.myStocks.filter((stock) => stock.ticker === this.props.ticker)
    }

    fetchChange = () => {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.props.ticker}&apikey=44HYKSLKIAWZROKN`)
        .then(response => response.json())
        .then(data => {
            if (!data["Note"]) {
                this.setState({
                    showStock: data["Global Quote"]
                })
            } else {
                this.fetchOther(this.props.ticker)
            }
        })
    }

    fetchOther = (ticker) => {
        fetch(`http://localhost:3000/${ticker}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                showStock: data
            })
        })
    }

    render() {
        return (
            <div>
                <h1>Ticker: {this.state.showStock["01. symbol"]}</h1>
                <p>Open: {this.state.showStock["02. open"]}</p>
                <p>Previous Close: {this.state.showStock["08. previous close"]}</p>
                <p>price: {this.state.showStock["05. price"]}</p>
                <p>volume: {this.state.showStock["06. volume"]}</p>
                <Link to={"/buystock"} >
                    <button onClick={() => {
                        localStorage.ticker = this.state.showStock["01. symbol"]
                        localStorage.date = this.state.showStock["07. latest trading day"]
                        localStorage.price = this.state.showStock["05. price"]
                    }}>Buy</button>
                </Link>
                <button onClick={() => {this.props.addToWatchList(this.state.showStock["01. symbol"])}} >Add To Watchlist</button>

                {this.stocksOwned().length > 0 ? 
                    (this.props.myStocks.map(stock => <MyStock key={stock.id} stock={stock}/>)) : 
                    (<h1>you don't have any stocks</h1>)
                }

                {/* <Link to={"/sellstock"}>
                    <button onClick={() => {
                        localStorage.ticker = this.state.showStock["01. symbol"]
                        localStorage.date = this.state.showStock["07. latest trading day"]
                        localStorage.price = this.state.showStock["05. price"]
                    }}>Sell</button>
                </Link> */}
            </div>
        )
    }

}

export default StockShow