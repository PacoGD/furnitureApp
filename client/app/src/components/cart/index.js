import React, { Component } from 'react';
import Xtorage from '../xtorage'
import api from 'api';
import logic from '../../logic'
import './index.css'

class Cart extends Component {
    state = {
        deliveryAdress: '',
        creditCard: '',
        price: 0,
        cart: [],
        orders: [],
        products: []
    }

    componentDidMount() {
        if (!(Xtorage.local.get('user'))) {
            this.props.history.push(`/login`)
        }
        if (Xtorage.session.get('cart')) {
            this.retrieveItem()
        }
    }
    deliveryAdress = (e) => {
        const deliveryAdress = e.target.value
        this.setState({ deliveryAdress })
    }
    creditCard = (e) => {
        const creditCard = e.target.value
        this.setState({ creditCard })
    }

    buy = (e) => {
        e.preventDefault()
        api.newOrder((Xtorage.local.get('user')), this.state.deliveryAdress, this.state.creditCard, this.state.price, (Xtorage.session.get('cart')))
            .then(() => {
                alert('Your order will arrive in 4-7 days')
                logic.clearProductCart()
                this.props.history.push('/')
            })
            .catch(error => {
                alert(error)
                console.error(error)
                this.props.history.push(`/cart`)
            })
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

    removeFromcart(index) {
        this.setState({ price: 0 })
        logic.removeProductFromCart(index)
            .then(() => this.retrieveItem())
    }
    pay(){
        this.props.history.push(`/order`)
    }
    render() {
        return (
            <div>
                <div className="Mycart">
                    <h1>My Cart</h1>
                    {(Xtorage.session.get('cart')) ? (<div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map((item, index) => (

                                    <tr key={item._id}>
                                        <td width="10%"><img className="card-img-top cart-image" src={item.image} alt="course or category" /></td>
                                        <td> <h5 className="card-title">{item.title}</h5></td>
                                        <td> <h5 className="card-title">{item.price} €</h5></td>
                                        <td><a className="btn btn-outline-secondary" onClick={() => this.removeFromcart(index)} role="button">Remove from cart</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pay">
                            <h4 className="total" scope="col">Total:</h4>
                            <h4 className="price">{this.state.price} €  </h4>
                            <button className="btn btn-outline-secondary" onClick={()=>this.pay()}>Pay</button>
                        </div>
                    </div>)
                        : <p>No items yet</p>}
                </div>

            </div>
        )
    }
}

export default Cart
