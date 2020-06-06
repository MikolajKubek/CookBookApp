import React, { Component } from "react";
import './RecipeDetails.css'

class RecipeDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            id: '',
            author: '',
            ingredients: [],
        }
    }

    componentDidMount = () => {
        let id = this.props.match.params.recipeID;
        this.fetchDefaults(id)
        this.fetchRecipeIngredients(id)
    }

    fetchDefaults = (id) => {
        this.setState({ id: id })
        fetch(`http://localhost:8000/api/recipes/${id}`, {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    console.log(json)
                    this.setState({
                        title: json.title,
                        description: json.description,
                    })
                    this.fetchAuthor(json.author)
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    fetchAuthor = (authorId) => {
        fetch(`http://localhost:8000/api/users/${authorId}`, {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    console.log(json)
                    this.setState({
                        author: json.username
                    })
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    fetchRecipeIngredients = (id) => {
        fetch(`http://localhost:8000/api/recipeingredients/?recipe=${id}`, {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    console.log(json.results)
                    this.fetchIngredients(json.results)
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    fetchIngredients = (results) => {
        results.forEach(element => {
            console.log(element.ingredient)
            fetch(`http://localhost:8000/api/ingredients/${element.ingredient}`, {
                method: "GET",
                crossDomain: true,
                async: true,
                mode: 'cors',
            }).then(
                (response) => {
                    response.json().then((json) => {
                        json['amount'] = element.amount
                        console.log(json)
                        let ingredients = this.state.ingredients
                        ingredients.push(json)
                        this.setState({ ingredients: ingredients })
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
        })
    }

    render() {
        return (
            <section class="hero is-colored-secondary is-fullheight">
                <div class="hero-body">
                    <div class="container">
                        <div className="columns">
                            <div className="column">
                                <div className="box">
                                    <h1 class="title">
                                        {this.state.title}
                                    </h1>
                                    <h2 class="subtitle">
                                        {this.state.description}
                                    </h2>
                                    <p class="subtitle">
                                        ~{this.state.author}
                                    </p>
                                </div>
                            </div>
                            <div className="column">
                                <div class="list is-hoverable">
                                    {this.state.ingredients.map((item) => {
                                        return (
                                            <div className="list-item">
                                                <div className="level is-mobile">
                                                    <div className="level-left">
                                                        {item.name}
                                                    </div>
                                                    <div className="level-right">
                                                        {item.amount}g
                                                    </div>
                                                </div>
                                                <div class="content">
                                                    <ul>
                                                        <li>
                                                            <div className="level is-mobile">
                                                                <div className="level-left">
                                                                    Fats
                                                                </div>
                                                                <div className="level-right">
                                                                    {item.fats}g
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="level is-mobile">
                                                                <div className="level-left">
                                                                    Proteins
                                                                </div>
                                                                <div className="level-right">
                                                                    {item.proteins}g
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="level is-mobile">
                                                                <div className="level-left">
                                                                    Carbohydrates
                                                                </div>
                                                                <div className="level-right">
                                                                    {item.carbohydrates}g
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default RecipeDetails;