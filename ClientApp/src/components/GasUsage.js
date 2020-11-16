import React, { Component } from 'react';
import MenuHelper from './MenuHelper.js';
import StateCitySelector from './StateCitySelector';
 
export class GasUsage extends Component {
    static displayName = GasUsage.name;

    constructor(props) {
        super(props);
        this.state = {
            stateSelection: '',
            citySelection: '',
            nrelData: [],
            loading: true,
            sortingOrder: 'asc',
            orderBy: 'id',
            refreshing: false,
        };
    }

    async fetchData() {

        const data = await fetch("GasStationRecords").then(result => result.json());
        this.setState({ nrelData: data, loading: false });
    }

    async fetchCitySpecificData() {

        const data = await fetch("GasStationRecords/" + this.state.stateSelection + "/" + this.state.citySelection).then(response => response.json());
        this.setState({ nrelData: data, refreshing: false });
    }

    setStateAbbrev = (state) => {
        this.setState({ stateSelection: state });
    }

    setCityName = (cityName) => {
        this.setState({ citySelection: cityName });
    }

    onSearchClick = () => {
        this.setState({ refreshing: true });

        if (this.state.stateSelection.trim() === "")
            this.fetchData();
        else
            this.fetchCitySpecificData();
    }


    setSortingVars = (orderBy) => {
        let sortingOrder = this.state.sortingOrder;
        sortingOrder = sortingOrder === 'asc' ? 'decs' : 'asc';
        this.setState({ sortingOrder: sortingOrder, orderBy: orderBy });
    }

    sort() {
        const sortedList = [].concat(this.state.nrelData);
        sortedList.sort((a, b) => {
            let order = a[this.state.orderBy] > b[this.state.orderBy] ? 1 : -1;
            order = this.state.sortingOrder === 'decs' ? order * (-1) : order;
            return order;
        });

        return sortedList;
    }

    populateTable(nrelData) {

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <MenuHelper title='Station Name' orderByVar='stationName' sorting={this.setSortingVars} />
                        <MenuHelper title='Fuel Type' orderByVar='fuelType' sorting={this.setSortingVars} />
                        <MenuHelper title='Address' orderByVar='address' sorting={this.setSortingVars} />
                        <MenuHelper title='City' orderByVar='city' sorting={this.setSortingVars} />
                        <MenuHelper title='State' orderByVar='state' sorting={this.setSortingVars} />
                        <MenuHelper title='ZipCode' orderByVar='zipCode' sorting={this.setSortingVars} />
                    </tr>
                </thead>
                <tbody>
                    {this.sort().map(station =>
                        <tr key={station.id}>
                            <td>{station.stationName}</td>
                            <td>{station.fuelType}</td>
                            <td>{station.address}</td>
                            <td>{station.city}</td>
                            <td>{station.state}</td>
                            <td>{station.zipCode}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.populateTable(this.state.nrelData);

        if (this.state.loading)
            this.fetchData();

        contents = this.state.refreshing
            ? <p><em>Refreshing Results</em></p>
            : !this.state.loading ? this.populateTable(this.state.nrelData)
            : <p></p>;

        return (
            <div>
                <h1>Alternative Fuel Gas Stations </h1>
                {this.state.loading ? null :
                    < StateCitySelector
                    stateValue={this.state.stateSelection}
                    cityValueChanged={this.setCityName}
                    stateSelection={this.setStateAbbrev}
                    citySelection={this.props.citySelection}
                    onSearchClick={this.onSearchClick}
                />}
                {contents}
            </div>
        );
    }
}

