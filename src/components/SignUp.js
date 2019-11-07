import React from 'react';

class SignUp extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        username: '',
        phone_number: '',
        birthday: '',
        profile_picture: '',
        password: '',
        passwordConfirmation: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.state.password === this.state.passwordConfirmation) {
            fetch("http://localhost:4000/api/v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ user: this.state })
                //     first_name: this.state.first_name,
                //     last_name: this.state.last_name,
                //     username: this.state.username,
                //     phone_number: this.state.phone_number,
                //     password: this.state.password,
                //     birthday: this.state.birthday,
                //     profile_picture: this.state.profile_picture
                // })
            })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors)
                } else {
                    this.props.setUser(data)
                }
            })
        } else {
            alert("Passwords don't match!")
        }
    }

    render() {
        return (
            <div className="signupDiv">
                <div className="ui form">
                    <h1 id="stark">Stark</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="three fields">
                            <div className="field">
                                <label>First Name</label>
                                <input name="first_name" value={this.state.first_name} onChange={this.handleChange} placeholder="first name" />
                            </div>
                            <div className="field">
                                <label>Last Name</label>
                                <input name="last_name" value={this.state.last_name} onChange={this.handleChange} placeholder="last name" />
                            </div>
                            <div className="field">
                                <label>Username</label>
                                <input name="username" value={this.state.username} onChange={this.handleChange} placeholder="username" />
                            </div>
                        </div>
                        <div className="three fields">
                            <div className="field">
                                <label>Phone Number</label>
                                <input name="phone_number" value={this.state.phone_number} onChange={this.handleChange} placeholder="phone number" />
                            </div>
                            <div className="field">
                                <label>Birthday</label>
                                <input name="birthday" value={this.state.birthday} onChange={this.handleChange} placeholder="birthday" />
                            </div>
                            <div className="field">
                                <label>Profile Picture</label>
                                <input name="profile_picture" value={this.state.profile_picture} onChange={this.handleChange} placeholder="profile picture" />
                            </div>
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <label>Password</label>
                                <input name="password" value={this.state.password} type="password" onChange={this.handleChange} placeholder="password" />
                            </div>
                            <div className="field">
                                <label>Password Confirmation</label>
                                <input name="passwordConfirmation" value={this.state.passwordConfirmation} type="password" onChange={this.handleChange} placeholder="password confirmation" />
                            </div>
                        </div>
                        <div className="signup-button">
                            <button type="submit" className="ui submit button signup">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default SignUp


