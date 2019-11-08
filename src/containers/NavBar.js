import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

  render() {
    return (
        <div className="ui black inverted fixed menu">
          <Link to="/stocks" className="white item"><i className="black tie icon"></i>Stark</Link>
          <Link to="/watchlists" className="white item">Watchlist</Link>
          <Link to="/profile" className="white item">Profile</Link>
          <Link to="/signin" className="white right item" onClick={this.props.logout}>Logout</Link>
        </div>
    )
  }

}

export default NavBar
