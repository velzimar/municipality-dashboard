import React, { useEffect } from "react";
import NavBar from "../layout/navbar";
import SideBar from "../layout/sidebar";
import { connect } from "react-redux";
import { getMunicipalite } from "../../actions/Municipalite";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import MunicipalityItem from "./municipalityItem";

const MunicipalityManager = ({
  getMunicipalite,
  municipalite: { municipalites },
  auth: { user },
}) => {
  useEffect(() => {
    getMunicipalite();
  }, [getMunicipalite]);

  let municipalitiesData = null;

  if (municipalites.length > 0) {
    municipalitiesData = municipalites.map((municipality) => {
      return (
        <MunicipalityItem municipality={municipality} key={municipality._id} />
      );
    });
  }

  console.log(municipalites);

  return (
    <div className="all-wrapper with-side-panel solid-bg-all">
      <div className="layout-w">
        <SideBar user={user} />
        <div className="content-w">
          <NavBar />

          <ul className="breadcrumb">
            <li className="breadcrumb-item">accueil</li>
            <li className="breadcrumb-item">Gestionnaire des municipalités</li>
          </ul>
          <div className="content-i">
            <div className="content-box">
              <div className="element-wrapper">
                <div className="controls-above-table">
                  <div className="row">
                    <div className="col-sm-6">
                      <Link
                        className="btn btn-sm btn-secondary"
                        to="/ajouterMunicipalité"
                      >
                        Ajouter une municipalité
                      </Link>
                    </div>
                    <div className="col-sm-6">
                      <form className="form-inline justify-content-sm-end">
                        <input
                          className="form-control form-control-sm rounded bright"
                          placeholder="Chercher"
                          type="text"
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-lg table-v2 table-striped">
                    <thead>
                      <tr>
                        <th>gouvernorat</th>
                        <th>municipalité</th>
                        <th>Altitude</th>
                        <th>Longitude</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {municipalitiesData}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="display-type"></div>
    </div>
  );
};

MunicipalityManager.propTypes = {
  getMunicipalite: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  municipalite: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  municipalite: state.municipalite,
});

export default connect(mapStateToProps, { getMunicipalite })(
  MunicipalityManager
);
