import React, { Component } from 'react';
import api from 'api';
import Xtorage from '../xtorage'
import './index.css'
import logic from '../../logic'
import swal from 'sweetalert2'

class Order extends Component {
    state = {
        deliveryAdress: '',
        creditCard: '',
        price: 0,
        cart: [],
        products: [],
        orderId: ''
    }
    componentDidMount() {
        if (!(Xtorage.local.get('user'))) {
            this.props.history.push(`/login`)
        }
        if (!(Xtorage.session.get('cart'))) {
            this.props.history.push(`/cart`)
        }
        this.retrieveItem()
    }
    deliveryAdress = (e) => {
        const deliveryAdress = e.target.value
        this.setState({ deliveryAdress })
    }
    creditCard = (e) => {
        const creditCard = e.target.value
        this.setState({ creditCard })
    }
    retrieveItem() {
        let productsArray = []

        Promise.resolve()
            .then(() => this.setState({ cart: Xtorage.session.get('cart') }))
            .then(() => {
                const promises = this.state.cart.map(itemId =>
                    api.showItem(itemId)
                        .then(res => {
                            productsArray.push(res)
                        })
                )

                return Promise.all(promises)
            })
            .then(() => this.setState({ products: productsArray }))
            .then(() => this.state.products.map(item => {
                let price = this.state.price + item.price
                this.setState({ price })
            }))

    }
    buy = (e) => {
        e.preventDefault()
        api.newOrder((Xtorage.local.get('user')), this.state.deliveryAdress, this.state.creditCard, this.state.price, (Xtorage.session.get('cart')))
            .then(orderId => {
                this.setState({
                    orderId
                })
                swal({
                    title: 'Your order:' + this.state.orderId,
                    text: 'Will arrive in 4-7 days',
                    type: 'success',
                    animation: false,
                    customClass: 'animated pulse'
                })
                logic.clearProductCart()
                this.props.history.push(`/`)
            })
            .catch(error => {
                swal('' + error)
                console.error(error)
                this.props.history.push(`/order`)
            })
    }
    render() {
        return (
            <main className="order">
            <br /><h1>My order</h1><br />
                <div className="row ml-1 mt-4">
                    <div className="col-xl-9 col-lg-8 col-md-9 col-sm-12 col-xs-12 mb-4 mt-3">
                        <form className="mb-3 mx-auto" onSubmit={this.buy}>

                            <div className="row  mb-3">
                                <div className="col-md-11 input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroup-sizing-medium">Delivery Addres<i id='icon' className="fas fa-truck ml-2"></i></span>
                                    </div>
                                    <input type="text" name="delivery-address" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-medium" onChange={this.deliveryAdress} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="card-name" className="form-control" placeholder="First Name" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="card-name" className="form-control" placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <input type="number" name="card-number" className="form-control " placeholder="Card number" onChange={this.creditCard} />

                                </div>
                                <div className="col-md-3 mb-3">
                                    <input type="date" name="expirity-date" className="form-control" placeholder="Expiration Date" />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <input type="password" name="ccv" className="form-control" placeholder="cvv" />
                                </div>
                            </div>

                            <button className="btn btn-secondary btn-lg active my-2 my-sm-0 ml-1 mb-3 mt-4 mx-auto" type="submit">Pay</button>
                        </form>
                    </div>

                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 col-xs-8 mb-4 ">
                        <div className="card">
                            <h5 className="card-header" style={{ borderTopLeftRadius: "calc(1rem - 1px)", borderTopRightRadius: "calc(1rem - 1px)", backgroundColor: "gris" }}>Total</h5>
                            <div className="card-body">
                                <p className="card-text" >{this.state.price} €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Order
