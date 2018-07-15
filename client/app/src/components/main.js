
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Register from './register'
import Login from './login'
import Landing from './landing'
import Items from './items'
import Tables from './tables'
import Chairs from './chairs'
import Sofa from './sofa'
import Cart from './cart';
import Profile from './profile';
import Order from './order';

function Main(){

    return (
    <div className = "main">
        <Switch>
            <Route exact path = '/'component={Landing}/>
            <Route path = '/register'component={Register}/>
            <Route path = '/login'component={Login}/>
            <Route path = '/tables'component={Tables}/>
            <Route path = '/chairs'component={Chairs}/>
            <Route path = '/sofa'component={Sofa}/>
            <Route path = '/items'component={Items}/>
            <Route path = '/cart' component={Cart}/>
            <Route path = '/profile' component={Profile}/>
            <Route path = '/order' component={Order}/>
        </Switch>
    </div>
    )
}

export default Main;