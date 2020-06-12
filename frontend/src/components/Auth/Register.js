import React, { Component } from "react";

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            repeatPassword: ''
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault()
    }

    handleLoginChange = (event) => {
        this.setState({ login: event.target.value })
    }


    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }
    
    handleRepeatPasswordChange = (event) => {
        this.setState({ repeatPassword: event.target.value })
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="box">
                        <h1 className="title">Sign Up</h1>
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

                            <div className="field">
                                <label className="label">Repeat password</label>
                                <div className="control">
                                    <input className="input" type="password" value={this.state.repeatPassword} onChange={this.handleRepeatPasswordChange} />
                                </div>
                            </div>

                            <div className="control">
                                <button className="button is-colored">Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default Register;