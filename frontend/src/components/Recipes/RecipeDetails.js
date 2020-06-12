import React, { Component } from "react";
import './RecipeDetails.css'
import Comment from './Comment'
import AddComment from './AddComment'

class RecipeDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            id: '',
            author: '',
            ingredients: [],
            totalAmount: 0,
            totalFats: 0,
            totalProteins: 0,
            totalCarbohydrates: 0,
            totalCalories: 0,
            comments: [],
        }
    }

    componentDidMount = () => {
        let id = this.props.match.params.recipeID;
        this.fetchDefaults(id)
        this.fetchRecipeIngredients(id)
        this.fetchComments(id)
    }

    fetchComments = (id) => {
        fetch(`http://localhost:8000/api/comments/?recipe=${id}`, {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    console.log(json.results)
                    this.setState({ comments: json.results })
                })
            },
            (error) => {
                console.log(error);
            }
        )
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
                        this.calculateTotal()
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
        })
    }

    calculateTotal = () => {
        let totalAmount = 0
        let totalFats = 0
        let totalProteins = 0
        let totalCarbohydrates = 0
        let totalCalories = 0

        this.state.ingredients.forEach((item) => {
            let amount = parseFloat(item.amount)
            totalAmount += amount
            totalFats += Math.round(amount * parseFloat(item.fats)) / 100
            totalProteins += Math.round(amount * parseFloat(item.proteins)) / 100
            totalCarbohydrates += Math.round(amount * parseFloat(item.carbohydrates)) / 100
            totalCalories += Math.round(amount * parseFloat(item.calories)) / 100
        })

        this.setState({
            totalAmount: totalAmount,
            totalFats: totalFats,
            totalProteins: totalProteins,
            totalCarbohydrates: totalCarbohydrates,
            totalCalories: totalCalories,
        })
    }

    render() {
        return (
            <section className="hero is-colored-secondary is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                <div className="box">
                                    <h1 className="title">
                                        {this.state.title}
                                    </h1>
                                    <h2 className="subtitle">
                                        {this.state.description}
                                    </h2>
                                    <p className="subtitle">
                                        ~{this.state.author}
                                    </p>
                                </div>
                                <div className="box content">
                                    <div className="level is-mobile">
                                        <div className="level-left">
                                            Total values
                                        </div>
                                    </div>
                                    <ul>
                                        <li>
                                            <div className="level is-mobile">
                                                <div className="level-left">
                                                    Amount
                                            </div>
                                                <div className="level-right">
                                                    {this.state.totalAmount}g
                                            </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="level is-mobile">
                                                <div className="level-left">
                                                    Fats
                                            </div>
                                                <div className="level-right">
                                                    {this.state.totalFats}g
                                            </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="level is-mobile">
                                                <div className="level-left">
                                                    Proteins
                                            </div>
                                                <div className="level-right">
                                                    {this.state.totalProteins}g
                                            </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="level is-mobile">
                                                <div className="level-left">
                                                    Carbohydrates
                                            </div>
                                                <div className="level-right">
                                                    {this.state.totalCarbohydrates}g
                                            </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="level is-mobile">
                                                <div className="level-left">
                                                    Calories
                                            </div>
                                                <div className="level-right">
                                                    {this.state.totalCalories}
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="column">
                                <div className="list is-hoverable">
                                    {this.state.ingredients.map((item) => {
                                        let amount = parseFloat(item.amount)
                                        let fats = Math.round(amount * parseFloat(item.fats)) / 100
                                        let proteins = Math.round(amount * parseFloat(item.proteins)) / 100
                                        let carbohydrates = Math.round(amount * parseFloat(item.carbohydrates)) / 100
                                        let calories = Math.round(amount * parseFloat(item.calories)) / 100

                                        return (
                                            <div className="list-item">
                                                <div className="level is-mobile">
                                                    <div className="level-left">
                                                        {item.name}
                                                    </div>
                                                    <div className="level-right">
                                                        {amount}g
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <ul>
                                                        <li>
                                                            <div className="level is-mobile">
                                                                <div className="level-left">
                                                                    Fats
                                                                </div>
                                                                <div className="level-right">
                                                                    {fats}g
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="level is-mobile">
                                                                <div className="level-left">
                                                                    Proteins
                                                                </div>
                                                                <div className="level-right">
                                                                    {proteins}g
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="level is-mobile">
                                                                <div className="level-left">
                                                                    Carbohydrates
                                                                </div>
                                                                <div className="level-right">
                                                                    {carbohydrates}g
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="level is-mobile">
                                                                <div className="level-left">
                                                                    Calories
                                                                </div>
                                                                <div className="level-right">
                                                                    {calories}
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
                        {this.state.comments.map((comment) => {
                            return (
                                <Comment author={comment.author} content={comment.content} />
                            )
                        })}
                        <AddComment recipeId={this.state.id} />
                    </div>
                </div>
            </section>
        );
    }
}

export default RecipeDetails;