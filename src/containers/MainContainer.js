import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import WatchList from './WatchList'
import Profile from './Profile'
import Settings from '../components/Settings'
import BuyStock from '../components/BuyStock'
import SellStock from '../components/SellStock'
import NavBar from './NavBar'

class MainContainer extends React.Component {

    state = {
        stocks: [],
        logos: {
            FB: ["Facebook", "https://clipart.info/images/ccovers/1499793248fb-facebook-icon-clipart-logo.png"],
            MSFT: ["Microsoft", "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"],
            GOOGL: ["Google", "https://banner2.cleanpng.com/20180324/iww/kisspng-google-logo-g-suite-google-5ab6f1cee66464.5739288415219388949437.jpg"],
            IBM: ["IBM", "https://www.ibm.com/design/language/331f29bd23328a3d372d3a8a54aa8187/core-blue40-blue90.svg"],
            COF: ["Capital One", "https://thumbor.forbes.com/thumbor/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fi.forbesimg.com%2Fmedia%2Flists%2Fcompanies%2Fcapital-one-financial_416x416.jpg"],
            TWTR: ["Twitter", "https://images-eu.ssl-images-amazon.com/images/I/31KluT5nBkL.png"],
        }
    }

    componentDidMount() {
        this.jsonFetchFB()
        this.jsonFetchMSFT()
        this.jsonFetchGOOGL()
        this.jsonFetchTWTR()
        this.jsonFetchIBM()
        this.jsonFetchCOF()
    }

    jsonFetchFB = () => {
        fetch("http://localhost:3000/FB")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchMSFT = () => {
        fetch("http://localhost:3000/MSFT")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchGOOGL = () => {
        fetch("http://localhost:3000/GOOGL")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchTWTR = () => {
        fetch("http://localhost:3000/TWTR")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchIBM = () => {
        fetch("http://localhost:3000/IBM")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchCOF = () => {
        fetch("http://localhost:3000/COF")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    render() {
        return (
            <div className="maincontainer">
                <NavBar logout={this.props.logout}/>
                <Switch>
                    <Route path="/watchlists" render={() => <WatchList watchlists={this.props.watchlists} removeFromWatchlist={this.props.removeFromWatchlist}/>} />
                    <Route path="/profile" render={() => <Profile myStocks={this.props.myStocks} logos={this.state.logos}/> } />
                    <Route path="/settings" render={() => <Settings money={this.props.money} addMoneySubmitHandler={this.props.addMoneySubmitHandler}/>} />
                    <Route path="/buystock" render={() => <BuyStock money={this.props.money} addToMyStocks={this.props.addToMyStocks}/>} />
                    <Route path="/sellstock" render={() => <SellStock money={this.props.money} sellStock={this.props.sellStock}/>} />
                    <Route path="/stocks" render={() => <Home myStocks={this.props.myStocks} stocks={this.state.stocks} addToWatchList={this.props.addToWatchList} logos={this.state.logos}/>} />
                </Switch>
            </div>
        )
    }

}

export default MainContainer;


    // fetchMSFT = () => {
    //     fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=I6V3R1JT2X3OK2EP")
    //     .then(response => response.json())
    //     .then(data => {
    //         if (!data["Note"]) {
    //             let newArray = [...this.state.stocks]
    //             newArray[1] = data["Global Quote"]
    //             this.setState({
    //                 stocks: newArray
    //             })
    //         } else {
    //             this.jsonFetchMSFT()
    //         }
    //     })
    // }