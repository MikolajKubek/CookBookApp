import React, { Component } from "react";
import Cookies from "universal-cookie";

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault()
        this.fetchLogin(this.state.login, this.state.password)
    }

    fetchLogin = (login, password) => {
        fetch('http://localhost:8000/api/api-token-auth/', {
            method: "POST",
            crossDomain: true,
            async: true,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': login,
                'password': password
            })
        }).then(
            (response) => {
                response.json().then((json) => {
                    if (json.token) {
                        const cookies = new Cookies()
                        cookies.set("auth_token", json.token, {
                            path: '/',
                            maxAge: 3600
                        })
                    }
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    handleLoginChange = (event) => {
        this.setState({ login: event.target.value })
    }


    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="box">
                        <h1 className="title">Log in</h1>
                        <form onSubmit={this.onFormSubmit}>
                            <div className="field">
                                <label className="label">Login</label>
                                <div className="control">
                                    <input className="input" type="text" value={this.state.login} onChange={this.handleLoginChange} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input className="input" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                                </div>
                            </div>

                            <div className="control">
                                <button className="button is-colored">Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default Login;