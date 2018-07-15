import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import api from 'api';
import Xtorage from '../xtorage'
import './index.css'
import swal from 'sweetalert2'

class Login extends Component {
    state = {
        email: '',
        password: '',
        state: '',
        token: ''
    }
    email = (e) => {
        const email = e.target.value
        this.setState({ email })
    }
    userPassword = (e) => {
        const password = e.target.value
        this.setState({ password })
    }
    submit = (e) => {
        e.preventDefault()
        api.authenticateUser(this.state.email, this.state.password)
            .then(res => {
                Xtorage.local.set('user', res.data.id)
                this.props.history.push(`/`)
            })
            .catch(error => {
                swal(''+error)
                console.error(error)
                this.props.history.push(`/login`)
            })

    }
    render() {
        return (
            <div className="login">
                <div ><br /><br />
                    <h1>Login</h1><br /><br />
                    <form className="login-form" onSubmit={this.submit}>
                        <input className="form-control" type="text" onChange={this.email} placeholder="Email" autoComplete="off" /><br /><br />
                        <input className="form-control" type="password" onChange={this.userPassword} placeholder="Password" autoComplete="off" /><br /><br />
                        <button className="btn btn-secondary btn-lg active" type="submit">Login</button>
                    </form>

                </div>
            </div>
        )
    }
}

export default withRouter(Login);