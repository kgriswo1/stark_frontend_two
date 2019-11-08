import React from 'react';

class SignUp extends React.Component {

    state = {
        user: {
            first_name: '',
            last_name: '',
            username: '',
            phone_number: '',
            birthday: '',
            profile_picture: '',
            password: '',
            passwordConfirmation: ''
        },
        first_name: "field",
        last_name: "field",
        username: "field",
        profile_picture: "field",
        password: "field",
        passwordConfirmation: "field"
    }

    handleChange = (event) => {
        let newUser = {...this.state.user}
        newUser[event.target.name] = event.target.value
        this.setState({
            user: newUser
        })

        if (!(event.target.value)) {
            this.setState({
                [event.target.name]: "field error"
            })
        } else {
            this.setState({
                [event.target.name]: "field"
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.state.user.password === this.state.user.passwordConfirmation) {
            fetch("http://localhost:4000/api/v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ user: this.state.user })
            })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    alert("Please enter all fields")
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
                            <div className={this.state.first_name}>
                                <label>First Name</label>
                                <input name="first_name" value={this.state.user.first_name} onChange={this.handleChange} placeholder="first name" />
                            </div>
                            <div className={this.state.last_name}>
                                <label>Last Name</label>
                                <input name="last_name" value={this.state.user.last_name} onChange={this.handleChange} placeholder="last name" />
                            </div>
                            <div className={this.state.username}>
                                <label>Username</label>
                                <input name="username" value={this.state.user.username} onChange={this.handleChange} placeholder="username" />
                            </div>
                        </div>
                        <div className="three fields">
                            {/* <div className="field">
                                <label>Phone Number</label>
                                <input name="phone_number" value={this.state.user.phone_number} onChange={this.handleChange} placeholder="phone number" />
                            </div> */}
                            {/* <div className="field">
                                <label>Birthday</label>
                                <input name="birthday" value={this.state.user.birthday} onChange={this.handleChange} placeholder="birthday" />
                            </div> */}
                            <div className={this.state.profile_picture}>
                                <label>Profile Picture</label>
                                <input name="profile_picture" value={this.state.user.profile_picture} onChange={this.handleChange} placeholder="profile picture" />
                            </div>
                            <div className={this.state.password}>
                                <label>Password</label>
                                <input name="password" value={this.state.user.password} type="password" onChange={this.handleChange} placeholder="password" />
                            </div>
                            <div className={this.state.passwordConfirmation}>
                                <label>Password Confirmation</label>
                                <input name="passwordConfirmation" value={this.state.user.passwordConfirmation} type="password" onChange={this.handleChange} placeholder="password confirmation" />
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


