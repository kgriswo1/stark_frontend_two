import React from 'react';

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
    fetch("http://localhost:4000/api/v1/signin", {
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
        console.log(data)
        this.props.setUser(data)
      }
    })
  }

  render() {
    return (
        <div>
            <h1>SignIn</h1>
            <form onSubmit={this.handleSubmit}>
              <input name="username" value={this.state.username} onChange={this.handleChange} placeholder="username"/>
              <input name="password" value={this.state.password} type="password" onChange={this.handleChange} placeholder="password"/>
              <button type="submit">SignIn</button>
            </form>
        </div>
    )
  }

}

export default SignIn