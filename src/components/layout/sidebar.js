import React from "react";
import { Link } from "react-router-dom";

//import { setAlert } from '../../actions/alert';

export default function SideBar(props) {
  let isLoggedIn = props.user.super_admin;

  const render = () => {
    if (isLoggedIn) {
      return (
        <li className="selected">
          <Link to="/liste_admin">
            <div className="icon-w">
              <div className="fi-torso-business" />
            </div>
            <span>Administrateurs</span>
          </Link>
        </li>
      );
    }
  };

  return (
    <div className="menu-w color-scheme-light color-style-default menu-position-side menu-side-left menu-layout-compact sub-menu-style-inside sub-menu-color-light selected-menu-color-light menu-activated-on-click menu-has-selected-link">
      <div className="logo-w">
        <a className="logo" href="index.html">
          <div className="logo-element" />
          <div className="logo-label">Wazolab</div>
        </a>
      </div>

      <h1 className="menu-page-header">Page Header</h1>

      <ul className="main-menu">
        <li className="sub-header">
          <span>Gestionnaire des données</span>
        </li>
        <li className="selected">
          <a href="/dashboard">
            <div className="icon-w">
              <div className="entypo-icon-location" />
            </div>

            <span>Carte et statistiques</span>
          </a>
        </li>
        <li className="selected">
          <a href="/historique">
            <div className="icon-w">
              <div className="fi-book-bookmark" />
            </div>
            <span>Historique</span>
          </a>
        </li>
        <li className="selected">
          <Link to="/gestionnaireMunicipalité">
            <div className="icon-w">
              <div className="fa fa-university" />
            </div>
            <span>Municipalités</span>
          </Link>
        </li>
        <li className="sub-header">
          <span>Gestionnaire des comptes</span>
        </li>
        <li>
          <a href="/liste_agent">
            <div className="icon-w">
              <div className="fi-torso" />
            </div>
            <span>Agents</span>
          </a>
        </li>
        <li className="sub-header">
          <span>Gestionnaire des dossiers</span>
        </li>
        <li>
          <a href="/getByCreationDate">
            <div className="icon-w">
              <div className="os-icon">
                <div className="os-icon-clipboard" />
              </div>
            </div>
            <span>Liste des dossiers</span>
          </a>
        </li>
        <li>
          <a href="/getByUpdateDate">
            <div className="icon-w">
              <div className="os-icon">
                <div className="os-icon-clipboard" />
              </div>
            </div>
            <span>Historique des modifications</span>
          </a>
        </li>
        {render()}
      </ul>
    </div>
  );
}
