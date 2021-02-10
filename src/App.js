import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';
import store from './store';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import { Provider} from 'react-redux';
//from utiles
import setAuthToken from './utils/setAuthToken';
//from actions
import { loadUser, logout } from './actions/login';
//from routing
import PrivateRoute from './routing/PrivateRoutes';
//from components
import Login from './components/auth/login';
//import Dashboard from './components/dashboard';
import historique from './components/layout/Historique';
import liste_agent from './components/Agents/Users';
import liste_admin from './components/GestionnaireAdmin/ListeAdmin'
import GestionnaireAdmin from './components/GestionnaireAdmin/GestionnaireAdmin';
import MunicipalityManager from '../src/components/municipalities/municipalityManager';
import AddMunicipality from '../src/components/municipalities/addMunicipality';
import getByCreationDate from '../src/components/filelog/getByCreationDate';
import getByUpdateDate from '../src/components/filelog/getByUpdateDate';

import getOneFile from "../src/components/file/getOneFile.js";
import usersDetails from "../src/components/Agents/UsersDetails.js";

if(cookie.load('token')){
  setAuthToken(cookie.load('token'))
  store.dispatch(loadUser())
  const decoded = jwt_decode(cookie.load('token'));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = '/login';
  }
}


const App = () => {
  
 // <PrivateRoute exact path="/dashboard" component={Dashboard} />
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
         <Switch> 
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/admin" component={GestionnaireAdmin} />
          <PrivateRoute exact path="/historique" component={historique} />
          <PrivateRoute exact path="/liste_agent" component={liste_agent} />
          <PrivateRoute exact path="/gestionnaireMunicipalité" component={MunicipalityManager} />
          <PrivateRoute exact path="/liste_admin" component={liste_admin} />
          <PrivateRoute exact path="/ajouterMunicipalité" component={AddMunicipality} />
          <PrivateRoute exact path="/getByCreationDate" component={getByCreationDate} />
          <PrivateRoute exact path="/getByUpdateDate" component={getByUpdateDate} />
          <PrivateRoute exact path="/getOneFile" component={getOneFile} />
          <PrivateRoute exact path="/usersDetails" component={usersDetails} />
          <Redirect from="/" to="/login"/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;