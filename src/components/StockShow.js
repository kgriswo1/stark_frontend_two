import React from 'react';
import { Link } from 'react-router-dom'
import MyStock from './MyStock';
import empty from '../empty.png'
import Buystock from './BuyStock'
import Chart from './Chart';

class StockShow extends React.Component {
    // _isMounted = false

    state = {
        showStock: {},
        showPopup: false
    }

    togglePopup = () => {  
        this.setState({  
            showPopup: !this.state.showPopup  
        });  
    }

    onClickHandler = () => {
        this.togglePopup()
        localStorage.ticker = this.state.showStock["01. symbol"]
        localStorage.date = this.state.showStock["07. latest trading day"]
        localStorage.price = this.state.showStock["05. price"]
    }

    componentDidMount() {
        // this._isMounted = true
        setInterval(this.fetchChange, 20000)
        this.fetchOther(this.props.ticker)
    }

    // componentWillUnmount() {
    //     this._isMounted = false
    // }

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
        // debugger
        return (
            <div className="showpage">
                <h1 className="showheader">{this.props.logos[this.props.ticker][0]}</h1>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Open</th>
                            <th>Previous Close</th>
                            <th>Current Price</th>
                            <th>Volume</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Percent Change</th>
                            <th>Dollar Change</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td data-label="Ticker">{this.state.showStock["01. symbol"]}</td>
                            <td data-label="Open">{this.state.showStock["02. open"]}</td>
                            <td data-label="Previous Close">{this.state.showStock["08. previous close"]}</td>
                            <td data-label="Current Price">{this.state.showStock["05. price"]}</td>
                            <td data-label="Volume">{this.state.showStock["06. volume"]}</td>
                            <td data-label="High">{this.state.showStock["03. high"]}</td>
                            <td data-label="Low">{this.state.showStock["04. low"]}</td>
                            <td data-label="Percent Change">{this.state.showStock["10. change percent"]}</td>
                            <td data-label="Dollar Change">{this.state.showStock["09. change"]}</td>    
                        </tr>
                    </tbody>

                </table>

                <button className="ui black button" onClick={this.onClickHandler}>
                    <i className="cart plus icon"></i>Buy
                </button>

                {this.state.showPopup ?  
                    <Buystock money={this.props.money} logos={this.props.logos} addToMyStocks={this.props.addToMyStocks} closePopup={this.togglePopup} />  
                    : null  
                }

                <button className="ui black button" onClick={() => {this.props.addToWatchList(this.state.showStock["01. symbol"])}}><i className="eye icon"></i>Add To Watchlist</button>


                <Chart ticker={this.props.ticker}/>

                { this.stocksOwned().length > 0 ? 
                    (   <>
                            <table className="ui celled table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount Bought</th>
                                        <th>Amount Sold</th>
                                        <th>Current Amount</th>
                                        <th>Price Bought</th>
                                        <th>Total Spend</th>
                                        <th>Sell</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.stocksOwned().map(stock => <MyStock money={this.props.money} logos={this.props.logos} key={stock.id} stock={stock} sellStock={this.props.sellStock} currentPrice={this.state.showStock["05. price"]}/>)}
                                </tbody>
                            </table>
                           
                        </>
                    ) : 
                    ( 
                        <div> 
                            <br/>
                            <img src={empty} />
                            {/* <div>You do not own this stock</div> */}
                        </div>
                    )
                }
                
            </div>
        )
    }

}

export default StockShow

{/* <Link to={"/buystock"} >
    <button className="ui black button" onClick={() => {
        localStorage.ticker = this.state.showStock["01. symbol"]
        localStorage.date = this.state.showStock["07. latest trading day"]
        localStorage.price = this.state.showStock["05. price"]
    }}><i className="cart plus icon"></i>Buy</button>
</Link> */}