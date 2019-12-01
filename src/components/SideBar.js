import React from 'react';
import { Link } from 'react-router-dom'
import Settings from './Settings'

class SideBar extends React.Component {

    state = {
        showPopup: false
    }

    togglePopup = () => {  
        this.setState({  
            showPopup: !this.state.showPopup  
        });  
    }

    render() {
        
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
                                    <Link onClick={this.togglePopup} className="header profile"><i className="plus square icon"></i>&nbsp;Add Money</Link>
                                    {/* <button onClick={this.togglePopup.bind(this)}> Click To Launch Popup</button>  */}
                                    {this.state.showPopup ?  
                                        <Settings money={this.props.money} addMoneySubmitHandler={this.props.addMoneySubmitHandler} closePopup={this.togglePopup} />  
                                        : null  
                                    }
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