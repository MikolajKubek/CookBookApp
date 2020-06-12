import React, { Component } from "react";

class Comment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: this.props.content,
            author_id: this.props.author,
            author: ''
        }
    }

    componentDidMount = () => {
        this.fetchAuthor()
    }

    fetchAuthor = () => {
        fetch(`http://localhost:8000/api/users/${this.state.author_id}`, {
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

    render() {
        return (
            <div className="box">
                <p className="subtitle">
                    {this.state.content}
                </p>
                <p className="level-right">
                    ~{this.state.author}
                </p>
            </div>
        );
    }
}

export default Comment;