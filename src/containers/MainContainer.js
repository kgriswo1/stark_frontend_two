import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import WatchList from './WatchList'
import Profile from './Profile'

class MainContainer extends React.Component {

    state = {
        stocks: [],
    }

    componentDidMount() {
        // this.fetchFB()
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
        fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo")
        .then(response => response.json())
        .then(data => {
            if (!data["Note"]) {
                let newArray = [...this.state.stocks]
                newArray[1] = data["Global Quote"]
                this.setState({
                    stocks: newArray
                })
            } else {
                console.log("in msft stocks", this.state.stocks)
            }
        })
    }

    addToWatchList = (ticker) => {
        fetch(`http://localhost:4000/api/v1/watchlists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: localStorage.user_id,
                ticker: ticker
            })
        })
        .then(response => response.json())
        // .then(console.log)
        // let newArray = [...this.state.watchlist, stock]
        // this.setState({
        //     watchlist: newArray
        // })
    }

    render() {
        return (
            <div>
            <h1>MainContainer</h1>
            <Switch>
                <Route path="/watchlist" render={() => <WatchList watchlist={this.props.watchlist} />} />
                <Route path="/profile" component={Profile} />
                <Route exact path="/" render={() => <Home stocks={this.state.stocks} addToWatchList={this.addToWatchList} />} />
            </Switch>
            </div>
        )
    }

}

export default MainContainer;
