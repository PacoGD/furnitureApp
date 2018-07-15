import React, { Component } from 'react';
import Xtorage from '../xtorage'
import './index.css'

class Profile extends Component {
    state = {
        password: "",
        email: "",
        newpassword: ""
    }
    componentDidMount() {
        if (!(Xtorage.local.get('user'))) {
            this.props.history.push(`/login`)
        }
        
    }
    // unregister = (e) => {
    //     e.preventDefault()
    //     api.token = Xtorage.local.get('token')
    //     api.unregisterUser(Xtorage.local.get('user'), this.state.email, this.state.password, )
    //         .then(res => {
    //             if (res.status === 'OK') {
    //                 Xtorage.local.remove('user')
    //                 Xtorage.local.remove('token')
    //             }
    //         })
    //         .then(() => {
    //             this.props.history.push(`/`)
    //         })
    //         .catch(error => {
    //             window.alert("Wrong credentials!");
    //             console.error(error)
    //             this.props.history.push(`/profile`)

    //         })
    // }
    inputValues = (e) => {
        let prop = e.target.name
        this.setState({ [prop]: e.target.value })
    }
    render() {
        return (
            <div>
                <div className="profile"><br /><br />
                    <h1>My profile</h1>
                    
                    <img className="underConstruction" src="https://openclipart.org/download/293025/under-construction-woman_at_work-o-f.svg" alt="Paris"></img>
                </div>
                {/* <div className="Unregister">
                    <h1>Unregister</h1>
                    <form onSubmit={this.unregister}>
                        <input type="email" name="email" placeholder="email" onChange={this.inputValues} />
                        <input type="password" name="password" placeholder="password" onChange={this.inputValues} />
                        <button type="submit">Delete</button>
                    </form>
                </div>
                <div className="UpdatePassword">
                    <h1>Update Password</h1>
                    <form >
                        <input type="email" name="email" placeholder="email" onChange={this.inputValues} />
                        <input type="password" name="password" placeholder="password" onChange={this.inputValues} />
                        <input type="password" name="newpassword" placeholder="New password" onChange={this.inputValues} />
                        <button type="submit">Update</button>
                    </form>
                </div> */}

            </div>
        )
    }
}

export default Profile