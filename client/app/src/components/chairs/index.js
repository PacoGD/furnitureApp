import React, { Component } from 'react';
import { Button } from 'reactstrap';
import api from 'api';
import Xtorage from '../xtorage'
import logic from '../../logic'
import './index.css'
import swal from 'sweetalert2'

class Chairs extends Component {
    state = {
        items: []
    }
    componentDidMount() {
        api.showItems('chairs')
            .then((chairs) => {
                this.setState({
                    items: chairs
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
            <div className="chairs">
                <h1 className="landing-h1">Furniture Chairs </h1>
                <div >
                    {this.state.items.map(item => {
                        return (
                            <div className="card float-sm-left" style={{ width: '18rem' }}>
                                <img className="card-img-top" src={item.image} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
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

export default Chairs