import React from 'react';
import { Link } from 'react-router-dom'

class SignIn extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault() 
    fetch("https://stark-backend-2.herokuapp.com/api/v1/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        this.props.setUser(data)
      }
    })
  }

  render() {
    return (
        <div className="signinDiv">
          <h1 id="stark">STARK</h1>
          <form onSubmit={this.handleSubmit} className="login-form">
            <p className="login-text">
              <span className="fa-stack fa-lg">
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-lock fa-stack-1x"></i>
              </span>
            </p>

            <input name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" className="login-username"/>
            <input name="password" value={this.state.password} type="password" onChange={this.handleChange} placeholder="Password" className="login-password"/>
            <input type="submit" name="Login" value="Sign In" className="login-submit" />
            <Link to="/signup" className="signin">sign up?</Link>
          </form>
        </div>
    )
  }

}

export default SignIn
