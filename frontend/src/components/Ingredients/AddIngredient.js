import React, { Component } from "react";
import Cookies from "universal-cookie";

class AddIngredient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            fats: 0,
            carbohydrates: 0,
            proteins: 0,
            calories: 0
        }
    }

    postIngredients = (id) => {
        const cookies = new Cookies()
        let token = cookies.get('auth_token')
        if (token !== undefined) {
            fetch('http://localhost:8000/api/ingredients/', {
                method: "POST",
                crossDomain: true,
                async: true,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    name: this.state.name,
                    fats: this.state.fats,
                    carbohydrates: this.state.carbohydrates,
                    proteins: this.state.proteins,
                    calories: this.state.calories,
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
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault()
        this.postIngredients()
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    handleFatsChange = (event) => {
        this.setState({ fats: event.target.value })
    }

    handleCarbohydratesChange = (event) => {
        this.setState({ carbohydrates: event.target.value })
    }

    handleProteinsChange = (event) => {
        this.setState({ proteins: event.target.value })
    }

    handleCaloriesChange = (event) => {
        this.setState({ calories: event.target.value })
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="box">
                        <h1 className="title">Add ingredient</h1>
                        <form onSubmit={this.onFormSubmit}>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input className="input" type="text" value={this.state.name} onChange={this.handleNameChange} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Fats</label>
                                <div className="control">
                                    <input className="input" type="number" value={this.state.fats} onChange={this.handleFatsChange} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Proteins</label>
                                <div className="control">
                                    <input className="input" type="number" value={this.state.proteins} onChange={this.handleProteinsChange} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Carbohydrates</label>
                                <div className="control">
                                    <input className="input" type="number" value={this.state.carbohydrates} onChange={this.handleCarbohydratesChange} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Calories</label>
                                <div className="control">
                                    <input className="input" type="number" value={this.state.calories} onChange={this.handleCaloriesChange} />
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

export default AddIngredient;