import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { GasUsage } from './components/GasUsage';
import { VehicleMiles } from './components/VehicleMiles';
import { EnergyAndGhg } from './components/EnergyAndGhg';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/gasUsage' component={GasUsage}/>
        <Route path='/energyAndGng' component={EnergyAndGhg} />
        <Route path='/vehicleMiles' component={VehicleMiles} />

      </Layout>
    );
  }
}
