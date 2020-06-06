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
                <div class="card media-content">
                    <div class="card-content">
                        <p class="title">
                            {this.state.title}
                        </p>
                        <p class="subtitle">
                            {this.state.description}
                        </p>
                    </div>
                    <footer class="card-footer">
                        <p class="card-footer-item">
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