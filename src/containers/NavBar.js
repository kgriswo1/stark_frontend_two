import React from 'react';
// import { Link } from 'react-router-dom'

class NavBar extends React.Component {

  render() {
    return (
        <div>
            <h1>NavBar</h1>
            <h2 onClick={this.props.logout}>Logout</h2>
        </div>
    )
  }

}

export default NavBar
