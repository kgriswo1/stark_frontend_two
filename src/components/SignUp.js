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
            <div>
                <h1>SignUp</h1>
                <form onSubmit={this.handleSubmit}>
                    <input name="first_name" value={this.state.first_name} onChange={this.handleChange} placeholder="first_name" />
                    <input name="last_name" value={this.state.last_name} onChange={this.handleChange} placeholder="last_name" />
                    <input name="username" value={this.state.username} onChange={this.handleChange} placeholder="username" />
                    <input name="phone_number" value={this.state.phone_number} onChange={this.handleChange} placeholder="phone_number" />
                    <input name="birthday" value={this.state.birthday} onChange={this.handleChange} placeholder="birthday" />
                    <input name="profile_picture" value={this.state.profile_picture} onChange={this.handleChange} placeholder="profile_picture" />
                    <input name="password" value={this.state.password} type="password" onChange={this.handleChange} placeholder="password" />
                    <input name="passwordConfirmation" value={this.state.passwordConfirmation} type="password" onChange={this.handleChange} placeholder="passwordConfirmation" />
                    <button type="submit">SignUp</button>
                </form>
            </div>
        )
    }

}

export default SignUp