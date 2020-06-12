import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
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

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="box">
                        <Link to="/recipes" className="navbar-item">Recipes</Link>
                        <Link to="/ingredients" className="navbar-item">Ingredients</Link>
                        <Link to="/signup" className="navbar-item">Sign up</Link>
                        <Link to="/login" className="navbar-item">Log in</Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default Home;