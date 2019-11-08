import React from 'react';
import { Link } from 'react-router-dom'

class SideBar extends React.Component {

    render() {
        console.log(this.props.current_user)
        return (
            <div className="ui inverted vertical menu">
                <div>Space</div>
                <div className="ui centered card">
                    <div className="image profile">
                        <img className="profile_pic" src={this.props.current_user.profile_picture}/>
                    </div>
                    {/* <div className="content">
                        <div className="content">{this.props.current_user.first_name}</div>
                    </div> */}
                </div>
                <Link to="/watchlists" className="white item">Watchlist</Link>
                <Link to="/profile" className="white item">Profile</Link>
                <Link to="/signin" className="white right item" onClick={this.props.logout}>Logout</Link>
            </div>
        )
    }

}

export default SideBar