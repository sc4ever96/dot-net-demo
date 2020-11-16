import React, { Component } from 'react';
import StateCitySelector from './StateCitySelector';

export class VehicleMiles extends Component {
    static displayName = VehicleMiles.name;

    constructor(props) {
        super(props);
        this.state = {
            stateSelection: '',
            citySelection: '',
            loading: true,
            nrelData: [],
        }
    }

    async fetchData() {
        const data = await fetch("VehicleMilesTravelled/" + this.state.stateSelection + "/" + this.state.citySelection).then(response => response.json());
        this.setState({ nrelData: data, loading: false });
    }

    setStateAbbrev = (state) => {
        this.setState({ stateSelection: state });
        console.log(state);
    }

    setCityName = (cityName) => {
        this.setState({ citySelection: cityName });
    }

    onSearchClick = () => {

        if (this.state.stateSelection.trim() !== "" && this.state.citySelection.trim() !== "") {
            this.setState({ loading : true});
            this.fetchData();
        }
    }

    populateTable(nrelData) {

        return (
            <div>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>City Name</th>
                            <th> State </th>
                            <th> Miles travelled </th>
                            <th> Natl AVG </th>
                            <th> Natl per capite AVG  </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={nrelData.id}>
                            <td>{nrelData.cityName}</td>
                            <td>{nrelData.state}</td>
                            <td>{nrelData.cityEstimate.toLocaleString()}</td>
                            <td>{nrelData.natlAvgEstimate.toLocaleString()}</td>
                            <td>{nrelData.natlPerCapitaEstimate.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Gas usage (gal) </th>
                            <th>Diesel usage (gal) </th>
                            <th>GHS on gas usage (in lbs) </th>
                            <th>GHS on diesel usage ( in lbs)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={nrelData.id}>
                            <td>{nrelData.gasUsed.toLocaleString()}</td>
                            <td>{nrelData.dieselUsed.toLocaleString()}</td>
                            <td>{nrelData.gasGhs.toLocaleString()}</td>
                            <td>{nrelData.dieselGhs.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    
    render() {

        let contents = this.state.loading
            ? <p></p>
            : this.populateTable(this.state.nrelData);

        return (
            <div>
                <h3>Displays miles travelled(VMT) and compares to national average.</h3>
                <h3>Also presents consuption of gas and diesel fuels with enviromental impact in lbs of green house gas (GHS)</h3>
                <h5> Both City and State are required</h5>
                <StateCitySelector
                    stateValue={this.state.stateSelection}
                    cityValueChanged={this.setCityName}
                    stateSelection={this.setStateAbbrev}
                    citySelection={this.props.citySelection}
                    onSearchClick={this.onSearchClick}
                />
                {contents}
            </div>
        );
    }
}
