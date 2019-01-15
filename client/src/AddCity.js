import React from 'react';
import axios from 'axios';
import './App.css';

export default class AddCity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            country: "",
            result: ""
        }

        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleCountryChange(event) {
        this.state.country =  event.target.value;
        this.setState( { state : this.state });
    }
    handleCityChange(event) {
        this.state.value =  event.target.value;
        this.setState( { state : this.state });
    }
    
    handleSubmit(event) {
        if (this.state.value.length > 0) {
            // Validar se a cidade já existe
            axios.get('http://localhost:3000/city/' + this.state.value)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    if (res.data.message == "city not exist")
                    {
                        axios.post('http://localhost:3000/city/', {name: this.state.value, country: this.state.country})
                        .then(res => {
                            this.setState( { 
                                result: res.data
                            });
                        })
                        .catch(e => this.setState( {result: e.message} ))
                    }else {
                        this.setState( { 
                            result: this.state.value + " already exists ... "
                        });
                    }
                }
            })
            .catch(e => {
                this.setState( {result: e.message} ) 
            })
        } else {
            this.setState({result: "Please insert a city"});
        }
        
        event.preventDefault();
    }

    render() {
        return(
            <div id="AddCity">
                
                <form onSubmit={this.handleSubmit}>
                    <label>
                        City Name: <input type="text" value={this.state.value} onChange={this.handleCityChange} />
                        Country: <input type="text" value={this.state.country} onChange={this.handleCountryChange} />
                    </label>
                    <input type="submit" value="Add City" />
                </form>
                <h1>Result: {this.state.result} </h1>
                
            </div>
        );
    }
}