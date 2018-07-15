import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import './index.css'
import Xtorage from '../xtorage'
import { Button } from 'reactstrap';
import logic from '../../logic'

class Header extends Component {
    state = {
        collapsed: true
    }
    logOutHeader = (
        <header>
            <div >Welcome, guest, you can <Link to="/login">Login</Link> or <Link to="/register">Create an account</Link> </div>
        </header>
    )
    logHeader = (
        <nav className="nav_login">
            <div className="logout"> <Button color="link" onClick={() => this._handleUnlog()} >Logout</Button><Button color="link" onClick={() => this.props.history.push('/profile')}>Profile</Button><Link to="/cart"><img className="cart" alt="cart" title="Cart" src="https://minicooperbmw.files.wordpress.com/2011/04/carrito-de-compras.png" /></Link></div>
        </nav>
    )
    _handleUnlog = () => {
        Xtorage.local.remove('token')
        Xtorage.local.remove('user')
        logic.clearProductCart()
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <header>
                    {(Xtorage.local.get('user')) ? this.logHeader : this.logOutHeader}
                </header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">FurnitureApp</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/tables">Tables</Link>
                            <Link className="nav-item nav-link" to="/chairs">Chairs</Link>
                            <Link className="nav-item nav-link" to="/sofa">Sofa</Link>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Header)

