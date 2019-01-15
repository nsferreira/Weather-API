import React, { Component } from 'react';
import { Reactable, Table, Thead, Th } from 'reactable';
import axios from 'axios';

export default class SgTeamsList extends Component {
    constructor(props) {
        super(props);
    }

    renderTable() {
        return (
            <Table className="table"
                filterable={['name']}
                noDataText="No matching records found"
                itemsPerPage={5}
                currentPage={0}
                sortable={true}
                data={this.props.cities}>
                <Thead>
                    <Th column="id">ID</Th>
                    <Th column="name">CITY</Th>
                    <Th column="temp">TEMPERATURE (ºC)</Th>
                    <Th column="sunrise">TIME SUNRISE</Th>
                    <Th column="sunset">TIME SUNSET</Th>
                </Thead>
            </Table>
        )
    }

    render() {
        return (
            <div>
                { this.renderTable() }
            </div>
        )
    }
}