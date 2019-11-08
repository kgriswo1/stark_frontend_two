import React from 'react';
import { Link } from 'react-router-dom'

class SideBar extends React.Component {

    render() {
        console.log(this.props.current_user)
        return (
            <>
                {this.props.current_user ? 
                    (
                        <div className="sidebar">
                            <div className="ui card profile">
                                <div className="image profile">
                                    <img className="profile_pic" src={this.props.current_user.profile_picture}/>
                                </div>
                                <div className="content profile">
                                    <br/>
                                    <div className="header profile"><i className="user icon"><br/></i>&nbsp;{this.props.current_user.first_name + " " + this.props.current_user.last_name}</div>
                                    <br/>
                                    <div className="header profile"><i className="dollar sign icon"></i>&nbsp;{this.props.current_user.money}</div>
                                    <br/>
                                    <Link to="/settings" className="header profile"><i className="plus square icon"></i>&nbsp;Add Money</Link>
                                </div>
                            </div>
                        </div>

                    ) : 
                    (<h1>Loading</h1>)
                }
            </>
        )
    }

}

export default SideBar