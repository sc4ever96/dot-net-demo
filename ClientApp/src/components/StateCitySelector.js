import React, { Component } from 'react';


const stateAbbreviations = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
        'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

class StateCitySelector extends Component  {

    render() {

        let abbrevDropdown = stateAbbreviations.map(abbrev => <option key={abbrev} value={abbrev} > {abbrev}</ option>);

        return (
            <form>
                <div className="form-row align-items-center">
                    <div className="col-auto">
                        <input type="text" className="form-control mb-2" id="inlineFormInput" placeholder="City name" onChange={event => this.props.cityValueChanged(event.target.value)}/>
                    </div>
                    <div className="col-auto">
                        <div className="form-check mb-2">
                            <select id="inputState" className="form-control" onChange={event => this.props.stateSelection(event.target.value)}>
                                <option defaultValue = {this.props.stateValue}>State</option>
                                {abbrevDropdown}
                            </select>
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type='button' className="btn btn-primary mb-2" onClick={this.props.onSearchClick}>Search</button>
                    </div>
                </div>
            </form>
            );
    }
}

export default StateCitySelector
