import React from 'react';
import '../App.css';
import { Route, withRouter, Switch, Redirect} from 'react-router-dom'
import MainContainer from './MainContainer'
import NavBar from './NavBar'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

class App extends React.Component {

  state = {
    current_user: null,
    watchlists: []
  }

  componentDidMount() {
    const user_id = localStorage.user_id
    // debugger
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
          this.setState({
            current_user: data
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
    let newWatchlists = [...this.state.watchlists, data.watchlists]
    this.setState({
      current_user: user,
      watchlist: newWatchlists
    }, () => {
      localStorage.user_id = user.id
      this.props.history.push("/")
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

  render() {
    console.log(this.state.watchlist)
    return (
      <div>
        <NavBar logout={this.logout}/>
        <Switch>

          {/* If you are logged in you can't go to the sign in or sign up page */}
          <Route path="/signin" >
            {localStorage.user_id ?
              <Redirect to="/" /> :
              <SignIn setUser={this.setUser} />
            }
          </Route>

          <Route path="/signup" >
            {localStorage.user_id ?
              <Redirect to="/" /> :
              <SignUp setUser={this.setUser} />
            }
          </Route>

          {/* If you are not logged in and try to go to a page it will redirect you to the login page */}
          <Route path="/"> 
            {localStorage.user_id ?
              <MainContainer watchlist={this.state.watchlist}/> :
              <Redirect to="/signin" />
            }
          </Route> 
        </Switch>
      </div>
    )
  }

}

export default withRouter(App);