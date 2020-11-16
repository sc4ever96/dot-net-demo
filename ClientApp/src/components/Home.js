import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

export class Home extends Component {
    static displayName = Home.name;

    render() {

        return (
          <div>
                <h1>National Renewal Energy Laboratory records viewer </h1>
                <p>This site allows you to check data on such topics as :</p>

                <NavLink tag={Link} className="text-primary" to="/vehicleMiles">Miles travelled and fuel consumption by city</NavLink>
                <NavLink tag={Link} className="text-primary" to="/energyAndGng">Energy/Emmission</NavLink>
                <NavLink tag={Link} className="text-primary" to="/gasUsage">Alternative fuels gas stations locations</NavLink>
          </div>
        );
  }
}
