import React, { Component } from "react";
import Cookies from "universal-cookie";
import './AddRecipe.css';

class AddRecipe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            ingredientName: '',
            ingredientAmount: 0,
            ingredients: [],
            addingIngredient: false,
            availableIngredients: [],
        }
    }

    componentDidMount = () => {
        this.fetchIngredients()
    }

    postRecipe = () => {
        const cookies = new Cookies()
        let token = cookies.get('auth_token')
        if (token !== undefined) {
            fetch('http://localhost:8000/api/recipes/', {
                method: "POST",
                crossDomain: true,
                async: true,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    author: 1, // has to be changed
                    title: this.state.title,
                    description: this.state.description
                })
            }).then(
                (response) => {
                    response.json().then((json) => {
                        console.log(json)
                        this.postIngredients(json.id)
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    }

    postIngredients = (id) => {
        const cookies = new Cookies()
        let token = cookies.get('auth_token')
        if (token !== undefined) {
            this.state.ingredients.forEach((ingredient) => {
                fetch('http://localhost:8000/api/recipeingredients/', {
                    method: "POST",
                    crossDomain: true,
                    async: true,
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                    body: JSON.stringify({
                        recipe: id,
                        ingredient: ingredient.id,
                        amount: ingredient.amount
                    })
                }).then(
                    (response) => {
                        response.json().then((json) => {
                            console.log(json)
                        })
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            })
        }
    }

    fetchIngredients = () => {
        fetch('http://localhost:8000/api/ingredients/', {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    this.setState({ availableIngredients: json.results })
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    onFormSubmit = (event) => {
        event.preventDefault()

        if (this.state.addingIngredient) {
            this.setState({
                addingIngredient: false
            })
        }
        else {
            console.log("siema")
            this.postRecipe()

            // this.setState({
            //     title: '',
            //     description: '',
            //     ingredientName: '',
            //     ingredientAmount: 0,
            //     ingredients: [],
            //     addingIngredient: false,
            // })
        }
    }

    addIngredientKeyDown = (event) => {
        if (event.key === "Enter") {
            this.setState({
                addingIngredient: true
            })

            this.addIngredient(event)
        }
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value })
    }

    handleIngredientNameChange = (event) => {
        this.setState({ ingredientName: event.target.value })
    }

    handleIngredientAmountChange = (event) => {
        this.setState({ ingredientAmount: event.target.value })
    }

    addIngredient = (event) => {
        event.preventDefault()
        let ingredients = this.state.ingredients
        let name = this.state.ingredientName
        let ingredient = {
            id: name.substr(0, name.indexOf(' ')),
            name: name.substr(name.indexOf(' ') + 1),
            amount: parseFloat(this.state.ingredientAmount)
        }

        if (!ingredients.map(item => item.name).includes(ingredient.name) && ingredient.name !== '' && ingredient.amount !== 0) {
            ingredients.push(ingredient)

            this.setState({
                ingredients: ingredients,
                ingredientName: '',
                ingredientAmount: 0,
            })
        }
    }

    removeIngredient = (key) => {
        let ingredients = this.state.ingredients
        ingredients = ingredients.filter(value => value.name !== key)

        this.setState({ ingredients: ingredients })
    }


    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="box">
                        <h1 className="title">Add recipe</h1>
                        <form onSubmit={this.onFormSubmit}>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input className="input" type="text" value={this.state.title} onChange={this.handleTitleChange} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Description</label>
                                <div className="control">
                                    <textarea className="textarea" value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
                                </div>
                            </div>

                            <div className="list is-hoverable">

                                {this.state.ingredients.map((item) => {
                                    return (
                                        <a key={item.name} className="list-item ingredient-amount">
                                            <div className="level" onClick={() => this.removeIngredient(item.name)}>
                                                <div className="level-left">
                                                    {item.name}
                                                </div>
                                                <div className="level-right">
                                                    {item.amount}g
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>


                            <label className="label">Ingredients</label>
                            <div className="columns">
                                <div className="column is-gapless">
                                    <div className="field">
                                        <div className="control">
                                            <div className="select">
                                                <select defaultValue="" onChange={this.handleIngredientNameChange}>
                                                    <option value="" disabled>Select your option</option>
                                                    {this.state.availableIngredients.map((item) => {
                                                        return (
                                                            <option key={item.id} value={`${item.id} ${item.name}`}>{item.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="number" placeholder="Amount" value={this.state.ingredientAmount} onChange={this.handleIngredientAmountChange} onKeyDown={this.addIngredientKeyDown} />
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-1">
                                    <div className="button is-colored" onClick={this.addIngredient}>+</div>
                                </div>
                            </div>

                            <div className="control">
                                <button className="button is-colored">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default AddRecipe;