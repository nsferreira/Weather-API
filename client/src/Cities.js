import React from 'react';
import axios from 'axios';
import Graph from './Graph'
import './App.css';
import Table from './Table'

export default class Cities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: []
        }
    }

    componentDidMount() {
        setTimeout(() => { this.getCities() }, 1000);
    }

    /**
     * Get all cities.
     */
    getCities() {
        axios.get('http://localhost:3000/city')
          .then(res =>{
            this.setState({ cities : res.data });
            this.state.cities.forEach( city => this.updateCityFromApi(city)) });
    }

    /**
     * Get info city (temperature + sunrise + sunset).
     * @param {city} city 
     */
    updateCityFromApi(cityToSearch){
        let name = cityToSearch.name; 
        axios.get('http://localhost:3000/city/' + name)
        .then(res => {
            if (res.status == 200) {
                let cityChanges=this.state.cities.filter(city => city.name == name);
                cityChanges[0].temp= Math.round(res.data.temperature);
                cityChanges[0].sunrise = res.data.sunrise;
                cityChanges[0].sunset = res.data.sunset;
                this.setState( { state : this.state });
            }
        })
        .catch(e => {
            let cityChanges=this.state.cities.filter(city => city.name == name);
            cityChanges[0].temp= "city not exist";
            cityChanges[0].sunrise = "- - -";
            cityChanges[0].sunset = "- - -";
            this.setState( { state : this.state });
        })
    }

    render() {
        return (
             <div>
                <p>
                    <input type="button" onClick={this.getCities.bind(this)} value="Get Cities" />
                </p>
                <Graph cities={this.state.cities} />
                <Table cities={this.state.cities} />
             </div>
        )
    }
}