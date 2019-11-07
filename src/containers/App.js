import React from 'react';
import '../App.css';
import '../SignIn.scss';
import { Route, withRouter, Switch, Redirect} from 'react-router-dom'
import MainContainer from './MainContainer'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

class App extends React.Component {

  state = {
    current_user: null,
    watchlists: [],
    myStocks: [],
    money: 0
  }

  componentDidMount() {
    const user_id = localStorage.user_id
    if (user_id) {
      fetch("http://localhost:4000/api/v1/autologin", {
        headers: {
          "Authorization": user_id
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          alert(data.errors)
        } else {
          let user = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            phone_number: data.phone_number,
            birthday: data.birthday,
            profile_picture: data.profile_picture,
            money: data.money
          }
          let newWatchlists = data.watchlists
          let newMyStocks = data.stocks
          let datamoney = 0
          {data.money ? datamoney = data.money : datamoney = 0}
          this.setState({
            current_user: user,
            watchlists: newWatchlists,
            money: datamoney,
            myStocks: newMyStocks
          })
        }
      })
    }
  }

  setUser = (data) => {
    let user = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      phone_number: data.phone_number,
      birthday: data.birthday,
      profile_picture: data.profile_picture
    }
    let newWatchlists = data.watchlists          
    let newMyStocks = data.stocks
    let datamoney = 0
    {data.money ? datamoney = data.money : datamoney = 0}
    this.setState({
      current_user: user,
      watchlists: newWatchlists,
      myStocks: newMyStocks,
      money: datamoney
    }, () => {
      localStorage.user_id = user.id
      this.props.history.push("/stocks")
    })
  }

  logout = () => {
    this.setState({
      current_user: null
    }, () => {
      localStorage.removeItem("user_id")
      this.props.history.push("/signin")
    })
  }


  addToWatchList = (ticker) => {
    let haveThisStock = false
    if (this.state.watchlists.length > 0) {
      this.state.watchlists.forEach(stock => {
        if (stock.ticker === ticker) {
          haveThisStock = true
        }
      })
    }
    if (!haveThisStock) {
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
      .then(data => {
        let newArray = [...this.state.watchlists, data]
        this.props.history.push("/watchlists")
        this.setState({
          watchlists: newArray
        })
      })
    } else {
      alert("This stock is already in your watch list")
    }
  }

  removeFromWatchlist = (stock) => {
    let id = stock.id
    let newArray = [...this.state.watchlists]
    newArray = newArray.filter(s => s.id !== id)
    fetch(`http://localhost:4000/api/v1/watchlists/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => this.setState({
      watchlists: newArray
    }))
  }

  addMoneySubmitHandler = (e, amount) => {
    e.preventDefault() 
    let newInfo = {...this.state.current_user}
    newInfo.money = this.state.money + amount
    fetch(`http://localhost:4000/api/v1/users/${this.state.current_user.id}`, {
      method: "PATCH", 
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify(newInfo)
    })
    .then(response => response.json())
    .then(data => this.setState({
      money: data.money
    }))
    e.target.reset()
  }

  decreaseMoney = (amount) => {
    let newInfo = {...this.state.current_user}
    newInfo.money = this.state.money - amount
    fetch(`http://localhost:4000/api/v1/users/${this.state.current_user.id}`, {
      method: "PATCH", 
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify(newInfo)
    })
    .then(response => response.json())
    .then(data => this.setState({
      money: data.money
    }))
  }

  addToMyStocks = (e, stockGiven) => {
    e.preventDefault()

    let id = parseInt(stockGiven.user_id)
    stockGiven.user_id = id
    let price = 0
    if (stockGiven.quantity) {
      price = parseInt(stockGiven.quantity) * parseInt(stockGiven.price)
    }
    if (this.state.money - price > 0) {
      fetch(`http://localhost:4000/api/v1/stocks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(stockGiven)
      })
      .then(response => response.json())
      .then(data => {
        if (!data.errors) {
          this.props.history.push("/stocks")
          let newArray = [...this.state.myStocks, data]
          this.setState({
            myStocks: newArray
          })
        } else {
          alert(data.errors)
        }
      })
      this.decreaseMoney(price)
    } else {
      alert("You don't have enough money!")
    }
  }

  sellStock = (e, stockGiven) => {
    e.preventDefault()

    let stocks = this.state.myStocks
    debugger 
   
  }

  render() {
    return (
      <div className="app">
        <Switch>

          {/* If you are logged in you can't go to the sign in or sign up page */}
          <Route path="/signin" >
            {localStorage.user_id ?
              <Redirect to="/stocks" /> :
              <SignIn setUser={this.setUser} />
            }
          </Route>

          <Route path="/signup" >
            {localStorage.user_id ?
              <Redirect to="/stocks" /> :
              <SignUp setUser={this.setUser} />
            }
          </Route>

          {/* If you are not logged in and try to go to a page it will redirect you to the login page */}
          <Route path="/"> 
            {localStorage.user_id ?
              <MainContainer 
                watchlists={this.state.watchlists} 
                addToWatchList={this.addToWatchList} 
                removeFromWatchlist={this.removeFromWatchlist} 
                addMoneySubmitHandler={this.addMoneySubmitHandler} 
                money={this.state.money}
                addToMyStocks={this.addToMyStocks}
                sellStock={this.sellStock}
                myStocks={this.state.myStocks}
                logout={this.logout}
              /> :
              <Redirect to="/signin" />
            }
          </Route> 
        </Switch>
      </div>
    )
  }

}

export default withRouter(App);