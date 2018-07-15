import React, { Component } from 'react';
import api from 'api';
import Xtorage from '../xtorage'
import './index.css'
import { Button } from 'reactstrap';
import logic from '../../logic'
import swal from 'sweetalert2'


class Sofa extends Component {
    state = {
        items: []
    }
    componentDidMount() {
        api.showItems('sofa')
            .then((sofa) => {
                this.setState({
                    items: sofa
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
            <div className="sofa">
                <h1 className="landing-h1">Furniture Sofa </h1>
                <div>
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

export default Sofa