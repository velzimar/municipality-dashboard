import React, { useState } from "react";
import NavBar from "../layout/navbar";
import SideBar from "../layout/sidebar";
import Alert from "../layout/alert";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { createMunicipalite } from "../../actions/Municipalite";

const AddMunicipality = ({ createMunicipalite, auth: { user } }) => {
  const [formData, setFormData] = useState({
    city: "",
    governorate: "",
    cityLatitude: "",
    cityLongitude: "",
  });

  const { city, governorate, cityLatitude, cityLongitude } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    console.log(city);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createMunicipalite(governorate, city, cityLatitude, cityLongitude);
  };

  return (
    <div>
      <div className="all-wrapper with-side-panel solid-bg-all">
        <div className="layout-w">
          <SideBar user={user} />
          <div className="content-w">
            <NavBar />
            <ul className="breadcrumb">
              <li className="breadcrumb-item">accueil</li>
              <li className="breadcrumb-item">
                Gestionnaire des municipalités
              </li>
              <li className="breadcrumb-item">Ajouter une municipalité</li>
            </ul>
            <div className="content-i">
              <div className="content-box">
                <div className="element-wrapper">
                  <div className="element-actions">
                    <Link
                      className="btn btn-white btn-sm"
                      to="/gestionnaireMunicipalité"
                    >
                      <i className="os-icon os-icon-arrow-left6"></i>
                      <span>Retourner</span>
                    </Link>
                  </div>
                  <h6 className="element-header">Ajouter une municipalité</h6>
                  <div className="element-box">
                    <form onSubmit={onSubmit}>
                      <h5 className="form-header">
                        Créer une nouvelle municipalité
                      </h5>
                      <div className="form-desc">
                        Pour la création d'une nouvelle municipalité veuillez
                        remplir le formulaire ci-dessous
                      </div>
                      <Alert />
                      <div className="form-group">
                        <label> Gouvernorat</label>
                        <input
                          className="form-control"
                          placeholder="Gouvernorat"
                          type="text"
                          name="governorate"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label> Municipalité</label>
                        <input
                          className="form-control"
                          placeholder="Municipalité"
                          type="text"
                          name="city"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label> Altitude</label>
                        <input
                          className="form-control"
                          placeholder="Altitude"
                          type="text"
                          name="cityLatitude"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label> Longitude</label>
                        <input
                          className="form-control"
                          placeholder="Longitude"
                          type="text"
                          name="cityLongitude"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-buttons-w text-right">
                        <button className="btn btn-primary" type="submit">
                          Créer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="display-type"></div>
      </div>
    </div>
  );
};

AddMunicipality.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  createMunicipalite: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { createMunicipalite })(
  AddMunicipality
);
