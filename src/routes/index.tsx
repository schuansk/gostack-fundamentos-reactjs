import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import PerformTransaction from '../pages/PerformTransaction';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/import" component={Import} />
    <Route path="/perform-transaction" component={PerformTransaction} />
  </Switch>
);

export default Routes;
