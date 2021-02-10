import React, { useEffect } from "react";
import NavBar from "../layout/navbar";
import SideBar from "../layout/sidebar";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAdmin } from "../../actions/SuperAdmin";
import { Link } from "react-router-dom";

const ListeAdmin = ({ getAdmin, admin: { admins }, auth: { user } }) => {
  useEffect(() => {
    getAdmin();
  }, [getAdmin]);

  console.log(admins);
  let marker = null;
  if (admins.response) {
    console.log(admins.result);
    marker = admins.result.map((admin) => {
      return (
        <tbody key={admin._id}>
          <tr>
            <td className="text-center">{admin.email}</td>
            <td className="text-center">
              {admin.municipality != null ? admin.municipality.city : ""}
            </td>
            <td className="text-center">
              {admin.municipality != null ? admin.municipality.governorate : ""}
            </td>
            <td className="row-actions">
              <a href="/historique">
                <i className="os-icon os-icon-ui-49" />
              </a>
              <a href="/historique">
                <i className="os-icon os-icon-grid-10" />
              </a>
              <a className="danger" href="/historique">
                <i className="os-icon os-icon-ui-15" />
              </a>
            </td>
          </tr>
        </tbody>
      );
    });
  }
  return (
    <div className="all-wrapper with-side-panel solid-bg-all">
      <div className="layout-w">
        <SideBar user={user} />
        {}
        <div className="content-w">
          <NavBar />

          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/historique">accueil</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/historique">Historique</a>
            </li>
          </ul>

          <div className="content-i">
            <div className="content-box">
              <div className="element-wrapper">
                <div className="controls-above-table">
                  <div className="row">
                    <div className="col-sm-6">
                      <Link className="btn btn-sm btn-secondary" to="/admin">
                        Ajouter un Admin
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
                        <th>email</th>
                        <th>ville</th>
                        <th>gouvernorat</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    {marker}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ListeAdmin.propTypes = {
  getAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
});

export default connect(mapStateToProps, { getAdmin })(ListeAdmin);
