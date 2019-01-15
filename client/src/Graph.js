import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

export default class BarChartComponent extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            Data: {}       
        }
    }

    render()
    {
        // Get cities and temperatures
        this.names=[];
        this.temps=[];

        this.props.cities.forEach(city => { this.names.push(city.name) });
        this.props.cities.forEach(city => { this.temps.push(city.temp); });
        
        return(
            <div>
                <Bar
                    data = {{
                                labels: this.names,
                                datasets: [
                                    {
                                        label: 'City temperature',
                                        data:this.temps,
                                        backgroundColor:[
                                            'rgba(255,105,145,0.6)',
                                            'rgba(155,90,210,0.6)',
                                            'rgba(155,60,210,0.6)',
                                            'rgba(165,40,50,0.6)',
                                            'rgba(175,80,80,0.6)',
                                            'rgba(185,50,90,0.6)',
                                            'rgba(195,20,55,0.6)',
                                            'rgba(205,10,62,0.6)',
                                            'rgba(215,85,96,0.6)',
                                            'rgba(90,84,74,0.6)'
                                        ]
                                    }
                                ]
                            }}
                    options = {{ 
                        title:{
                            display: true,
                            text: 'Temperatures'
                        },
                        legend: {
                            display: false,
                            position: 'right'
                        },
                        maintainAspectRatio: false }}
                />
            </div>
        )
    }
}