import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Ingredient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            fats: this.props.fats,
            carbohydrates: this.props.carbohydrates,
            proteins: this.props.proteins,
            calories: this.props.calories
        }
    }

    render() {
        return (
            <div className="media">
                <div className="card media-content">
                    <div className="card-content">
                        <p className="title">
                            {this.state.name}
                        </p>
                        <ul>
                            <li>
                                <div className="level is-mobile">
                                    <div className="level-left">
                                        Fats
                                            </div>
                                    <div className="level-right">
                                        {this.state.fats}g
                                            </div>
                                </div>
                            </li>
                            <li>
                                <div className="level is-mobile">
                                    <div className="level-left">
                                        Proteins
                                            </div>
                                    <div className="level-right">
                                        {this.state.proteins}g
                                            </div>
                                </div>
                            </li>
                            <li>
                                <div className="level is-mobile">
                                    <div className="level-left">
                                        Carbohydrates
                                            </div>
                                    <div className="level-right">
                                        {this.state.carbohydrates}g
                                            </div>
                                </div>
                            </li>
                            <li>
                                <div className="level is-mobile">
                                    <div className="level-left">
                                        Calories
                                            </div>
                                    <div className="level-right">
                                        {this.state.calories}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ingredient;