import React, { Component } from 'react';
import Main from './components/main'
import Header from './components/header'
import './App.css';
import logic from './logic/index'
import api from 'api'
  
logic.cart = function (cart) {
  if (typeof cart !== 'undefined') {
    if (cart === null)
      sessionStorage.removeItem('cart')
    else {
      sessionStorage.setItem('cart', JSON.stringify(cart))
    }

    return
  }

  return JSON.parse(sessionStorage.getItem('cart'))
}

api.token = function(token) {
  if (typeof token !== 'undefined') {
    if (token === null)
      localStorage.removeItem('token')
    else {
      localStorage.setItem('token', token)
    }

    return
  }

  return localStorage.getItem('token')
}

class App extends Component {
  state = {
    url: '',
    token: '',
    username: '',
    password: '',
    id: ''
  }

  render() {
    return (
      <div className="App">

        <Header />
        <Main />

      </div>
    );
  }
}

export default App;

