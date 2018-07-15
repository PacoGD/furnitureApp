import React, { Component } from 'react';
import api from 'api';
import Xtorage from '../xtorage'
import './index.css'
import { Button } from 'reactstrap';
import logic from '../../logic'
import swal from 'sweetalert2'

class Tables extends Component {
    state = {
        items: [],
        order: []
    }
    componentDidMount() {
        api.showItems('tables')
            .then((tables) => {
                this.setState({
                    items: tables
                })
            })
            .catch(error => {
                console.error(error)
                this.props.history.push(`/`)
            })
    }
    buy = itemId => {
        if ((Xtorage.local.get('user'))) {
            logic.addProductToCart(itemId)
        } else {
            swal("Login first")
            this.props.history.push(`/login`)
        }
    }
    render() {
        return (
            <div className="tables">
                <h1 className="landing-h1">Furniture Tables </h1>
                <div >
                    {this.state.items.map(item => {
                        return (
                            <div className="card float-sm-left" style={{ width: '18rem' }}>
                                <img className="card-img-top" src={item.image} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
                                    {/* <a href="#" className="btn btn-primary">Add cart</a> */}
                                    <Button onClick={() => this.buy(item._id)}>Add cart</Button>

                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

        )
    }
}

export default Tables