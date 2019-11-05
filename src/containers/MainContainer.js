import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import WatchList from './WatchList'
import Profile from './Profile'
import Settings from '../components/Settings'
import BuyStock from '../components/BuyStock'

class MainContainer extends React.Component {

    state = {
        stocks: [],
    }

    componentDidMount() {
        this.fetchFB()
        // setInterval(this.fetchFB, 20000)
        this.fetchMSFT()
        // setInterval(this.fetchMSFT, 20000)
    }

    fetchFB = () => {
        fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=FB&apikey=XY5PAWELIZYGVXL8")
        .then(response => response.json())
        .then(data => {
            if(!data["Note"]) {
                let newArray = [...this.state.stocks]
                newArray[0] = data["Global Quote"]
                this.setState({
                    stocks: newArray
                })
            }
        })
    }

    fetchMSFT = () => {
        fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=I6V3R1JT2X3OK2EP")
        .then(response => response.json())
        .then(data => {
            if (!data["Note"]) {
                let newArray = [...this.state.stocks]
                newArray[1] = data["Global Quote"]
                this.setState({
                    stocks: newArray
                })
            }
        })
    }

    render() {
        return (
            <div>
                <h1>MainContainer</h1>
                <h1>My Money: {this.props.money}</h1>
                <Switch>
                    <Route path="/watchlists" render={() => <WatchList watchlists={this.props.watchlists} removeFromWatchlist={this.props.removeFromWatchlist}/>} />
                    <Route path="/profile" render={() => <Profile /> } />
                    <Route path="/settings" render={() => <Settings money={this.props.money} addMoneySubmitHandler={this.props.addMoneySubmitHandler}/>} />
                    <Route path="/buystock" render={() => <BuyStock addToMyStocks={this.props.addToMyStocks}/>} />
                    <Route exact path="/" render={() => <Home stocks={this.state.stocks} addToWatchList={this.props.addToWatchList} grabStock={this.grabStock}/>} />
                </Switch>
            </div>
        )
    }

}

export default MainContainer;
