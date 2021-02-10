import React from 'react';
import { Switch } from 'react-router-dom';
import Alert from '../components/layout/alert';
import Dashboard from '../components/dashboard';
import Admin from '../components/GestionnaireAdmin';
import PrivateRoute from './PrivateRoutes';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <PrivateRoute exact path="/admin" component={Admin} />
      </Switch>
    </section>
  );
};

export default Routes;