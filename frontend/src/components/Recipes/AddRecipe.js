import React, { Component } from "react";
import './AddRecipe.css';

class AddRecipe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            ingredientName: '',
            ingredientAmount: 0,
            ingredients: []
        }
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    }

    handleIngredientNameChange = (event) => {
        this.setState({ingredientName: event.target.value})
    }

    handleIngredientAmountChange = (event) => {
        this.setState({ingredientAmount: event.target.value})
    }

    addIngredient = (event) => {
        event.preventDefault()
        let ingredients = this.state.ingredients
        let ingredient = {
            name: this.state.ingredientName,
            amount: this.state.ingredientAmount
        }

        if (!ingredients.includes(ingredient)){
            ingredients.push(ingredient)
        }

        this.setState({
            ingredients: ingredients,
            ingredientName: '',
            ingredientAmount: 0
        })
    }

    removeIngredient = (key) => {
        let ingredients = this.state.ingredients
        ingredients = ingredients.filter(value => value.name != key)

        console.log(ingredients)

        this.setState({ingredients: ingredients})
    }


    render() {
        return (
            <section class="section">
                <div class="container">
                    <div className="box">
                        <h1 className="title">Add recipe</h1>
                        <form>
                            <div class="field">
                                <label class="label">Title</label>
                                <div class="control">
                                    <input class="input" type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Description</label>
                                <div class="control">
                                    <textarea class="textarea" value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
                                </div>
                            </div>

                            <div class="list is-hoverable">

                                {this.state.ingredients.map((item) => {
                                    return (
                                        <a class="list-item ingredient-amount">
                                            <div key={item.name} className="level" onClick={() => this.removeIngredient(item.name)}>
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


                            <label class="label">Ingredients</label>
                            <div className="columns is-gapless">
                                <div className="column">
                                    <div class="field">
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Ingredient" value={this.state.ingredientName} onChange={this.handleIngredientNameChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div class="field">
                                        <div class="control">
                                            <input class="input" type="number" placeholder="Amount" value={this.state.ingredientAmount} onChange={this.handleIngredientAmountChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-1">
                                    <div className="button is-colored" onClick={this.addIngredient}>+</div>
                                </div>
                            </div>

                            <div class="control">
                                <button class="button is-colored">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default AddRecipe;