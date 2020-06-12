import React, { Component } from "react";
import Cookies from "universal-cookie";

class AddComment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }

    postComment = () => {
        const cookies = new Cookies()
        let token = cookies.get('auth_token')
        fetch(`http://localhost:8000/api/comments/`, {
            method: "POST",
            crossDomain: true,
            async: true,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                content: this.state.content,
                author: 2,
                recipe: this.props.recipeId
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

    handleContentChange = (event) => {
        this.setState({ content: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault()
        this.postComment()
    }

    render() {
        return (
            <form className="box" onSubmit={this.onFormSubmit}>
                <div className="field">
                    <label className="label">Comment</label>
                    <div className="control">
                        <input className="input" type="textarea" value={this.state.content} onChange={this.handleContentChange} />
                    </div>
                </div>
                <div className="control">
                    <button className="button is-colored">Submit</button>
                </div>
            </form>
        );
    }
}

export default AddComment;