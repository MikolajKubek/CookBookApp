import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Recipe.css';

class Recipe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            description: this.props.description,
            id: this.props.id
        }
    }

    render() {
        return (
            <div className="media">
                <div className="card media-content">
                    <div className="card-content">
                        <p className="title">
                            {this.state.title}
                        </p>
                        <p className="subtitle">
                            {this.state.description}
                        </p>
                    </div>
                    <footer className="card-footer">
                        <p className="card-footer-item">
                            <span>
                                <Link className="details-link" to={`/recipe/${this.state.id}`}>Details</Link>
                            </span>
                        </p>
                    </footer>
                </div>
            </div>
        );
    }
}

export default Recipe;