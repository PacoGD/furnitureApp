import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import api from 'api';
import './index.css'
import swal from 'sweetalert2'


class Register extends Component {
    state = {
        username: "",
        password: "",
        name: "",
        email: ""
    }
    inputValues = (e) => {
        let prop = e.target.name
        this.setState({ [prop]: e.target.value })
    }

    submit = (e) => {
        e.preventDefault()
        api.registerUser(this.state.username, this.state.name, this.state.surname, this.state.email, this.state.password)
            .then(() => {
                this.props.history.push(`/login`)
            })
            .catch(error => {
                swal(''+error)
                console.error(error)
                this.props.history.push(`/register`)

            })
    }
    render() {
        return (
            <div className="register">
                <div><br /><br />
                    <h1>Register</h1><br />
                    <form className="register-form" onSubmit={this.submit}>
                        <input className="form-control" type="text" name="username" placeholder="username" onChange={this.inputValues} /><br />
                        <input className="form-control" type="password" name="password" placeholder="password" onChange={this.inputValues} /><br />
                        <input className="form-control" type="email" name="email" placeholder="email" onChange={this.inputValues} /><br />
                        <input className="form-control" type="text" name="name" placeholder="name" onChange={this.inputValues} /><br />
                        <input className="form-control" type="text" name="surname" placeholder="surname" onChange={this.inputValues} /><br />
                        <button className="btn btn-secondary btn-lg active" type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);
