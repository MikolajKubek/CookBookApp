import React, { Component } from "react";
import Ingredient from './Ingredient'
import { Link } from "react-router-dom";

class IngredientsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ingredients: []
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:8000/api/ingredients/', {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    console.log(json.results)
                    this.setState({ ingredients: json.results })
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    render() {
        return (
            <section class="section">
                <div class="container">
                    {this.state.ingredients.map((item) => {
                        return (
                            <Ingredient key="item.name"
                                name={item.name}
                                fats={item.fats}
                                carbohydrates={item.carbohydrates}
                                proteins={item.proteins}
                                calories={item.calories}
                            />
                        )
                    })}
                    <div className="media"></div>
                    <Link className="button is-colored is-pulled-right" to="/addIngredient">Add Ingredient</Link>

                </div>
            </section>
        );
    }
}

export default IngredientsList;