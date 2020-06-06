import React, { Component } from "react";
import Recipe from './Recipe.js';
import { Link } from "react-router-dom";

class RecipeList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            recipes: []
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:8000/api/recipes/', {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    console.log(json.results)
                    this.setState({ recipes: json.results })
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
                    {this.state.recipes.map((item) => {
                        return (
                            <Recipe title={item.title} description={item.description} id={item.id} />
                        )
                    })}
                    <div className="media"></div>
                    <Link className="button is-colored is-pulled-right" to="/add">Add recipe</Link>

                </div>
            </section>
        );
    }
}

export default RecipeList;