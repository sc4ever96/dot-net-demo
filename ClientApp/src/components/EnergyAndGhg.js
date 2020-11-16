import React, { Component } from 'react';
import MenuHelper from './MenuHelper.js';
import StateCitySelector from './StateCitySelector';

export class EnergyAndGhg extends Component {
    static displayName = EnergyAndGhg.name;

    constructor(props) {
        super(props);
        this.state = {
            stateSelection: '',
            citySelection: '',
            sortingOrder: 'asc',
            orderBy: 'type',
            loading: true,
            nrelData: [],
            canSort :true
        }
    }

    async fetchData() {

        console.log("fetching data");

        const data = await fetch("EnergyAndGhg/" + this.state.stateSelection + "/" + this.state.citySelection).then(response => response.json());
        this.setState({ nrelData: data, loading: false });
    }

    setStateAbbrev = (state) => {
        this.setState({ stateSelection: state });
        console.log(state);
    }

    setCityName = (cityName) => {
        this.setState({ citySelection: cityName });
    }

    setSortingVars = (orderBy) => {
        let sortingOrder = this.state.sortingOrder;
        sortingOrder = sortingOrder === 'asc' ? 'decs' : 'asc';
        this.setState({ sortingOrder: sortingOrder, orderBy: orderBy });
    }

    onSearchClick = () => {
        this.setState({ loading: true });
        this.fetchData();
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
            <div>
                <p> Statistics  for {nrelData[0].cityName} {nrelData[0].state}. By clicking on column names values can be sorted </p>
                <br />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <MenuHelper title='Sector' orderByVar='type' sorting={this.setSortingVars}  />
                            <MenuHelper title='Units' orderByVar='units' sorting={this.setSortingVars} />
                            <MenuHelper title='Population (residential only)' orderByVar='population' sorting={this.setSortingVars} />
                            <MenuHelper title='Electrity consumpsion (MWhr)' orderByVar='elecMwh' sorting={this.setSortingVars}  />
                            <MenuHelper title='Nat. gas Consuption (Mcub. ft.' orderByVar='gasMcf' sorting={this.setSortingVars} />
                            <MenuHelper title='Cost of electricity ($thousand)' orderByVar='elec1kDollars' sorting={this.setSortingVars}  />
                            <MenuHelper title='Cost of nat. gas ($thousand)' orderByVar='gas1kDollars' sorting={this.setSortingVars} />
                            <MenuHelper title='Environmental impact from  electical(lb)' orderByVar='elecLbGhg' sorting={this.setSortingVars} />
                            <MenuHelper title='Environmental impact from nat.gas(lb) ' orderByVar='gasLbGhg' sorting={this.setSortingVars} />
                        </tr>
                    </thead>
                    <tbody>
                        {this.sort().map((sector , index)=>
                            <tr key={index}>
                                <td>{sector.type}</td>
                                <td>{sector.units.toLocaleString()}</td>
                                <td>{sector.population.toLocaleString()}</td>
                                <td>{sector.elecMwh.toLocaleString()}</td>
                                <td>{sector.gasMcf.toLocaleString()}</td>
                                <td>{sector.elec1kDollars.toLocaleString()}</td>
                                <td>{sector.gas1kDollars.toLocaleString()}</td>
                                <td>{sector.elecLbGhg.toLocaleString()}</td>
                                <td>{sector.gasLbGhg.toLocaleString()}</td>
                            </tr>
                        )}
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
                <h2>Energy and Natural Gas</h2>
                <p>This page allows to see electricity and natural gas consumption and green house gas emission for particular city</p>
                <h5> Both City and State are required</h5>
                <StateCitySelector
                    stateValue={this.state.stateSelection}
                    cityValueChanged={this.setCityName}
                    stateSelection={this.setStateAbbrev}
                    citySelection={this.state.citySelection}
                    onSearchClick={this.onSearchClick}
                />
                {contents}
            </div>
        );
    }
}
