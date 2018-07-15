import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import api from 'api';

api.url = 'http://localhost:5000/api'

class Items extends Component {
    state = {
        title: "", image: "", description: "", color: "", category: "", stock: "", price: ""
    }
    inputValues = (e) => {
        let prop = e.target.name
        this.setState({ [prop]: e.target.value })
    }

    submit = (e) => {
        e.preventDefault()
        api.newItem(this.state.title, this.state.image, this.state.description, this.state.color, this.state.category, this.state.stock, this.state.price)
            .then(() => {
                console.log('registrado!')
                this.props.history.push(`/items`)
            })
            .catch(error => {
                console.error(error)
                this.props.history.push(`/items`)

            })
    }
    render() {
        return (
            <div className="Register">
                <h1>Insert Items </h1>
                <form onSubmit={this.submit}>
                    <input type="text" name="title" placeholder="title" onChange={this.inputValues} />
                    <input type="text" name="image" placeholder="image" onChange={this.inputValues} />
                    <input type="text" name="description" placeholder="description" onChange={this.inputValues} />
                    <input type="text" name="color" placeholder="color" onChange={this.inputValues} />
                    <input type="text" name="category" placeholder="category" onChange={this.inputValues} />
                    <input type="text" name="stock" placeholder="stock" onChange={this.inputValues} />
                    <input type="text" name="price" placeholder="price" onChange={this.inputValues} />
                    <button type="submit">newItem</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Items);
