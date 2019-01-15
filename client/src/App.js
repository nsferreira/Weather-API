import React from 'react';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from './Home';
import AddCity from './AddCity'
import ShowCities from './Cities'

export default class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/add">Add City</NavLink></li>
                        <li><NavLink to="/show">Show Cities</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route path="/" component={Home}/>
                        <Route path="/add" component={AddCity}/>
                        <Route path="/show" component={ShowCities}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}
