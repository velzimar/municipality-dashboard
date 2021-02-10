import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/login";
import { PropTypes } from "prop-types";

//import { setAlert } from '../../actions/alert';

const navBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <Fragment>
      <div className="top-bar color-scheme-transparent">
        <div className="top-menu-controls">
          <div className="logged-user-w">
            <div className="logged-user-i">
              <div className="avatar-w">
                <img alt="" src="img/avatar1.jpg" />
              </div>
              <div className="logged-user-menu color-style-bright">
                <div className="logged-user-avatar-info">
                  <div className="avatar-w">
                    <img alt="" src="img/avatar1.jpg" />
                  </div>
                  <div className="logged-user-info-w">
                    <div className="logged-user-name">Admin</div>
                  </div>
                </div>
                <div className="bg-icon">
                  <i className="os-icon os-icon-wallet-loaded" />
                </div>
                <ul>
                  <li>
                    <a href="users_profile_big.html">
                      <i className="os-icon os-icon-user-male-circle2" />
                      <span>Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="/login">
                      <i className="os-icon os-icon-others-43" />
                      <span>Notifications</span>
                    </a>
                  </li>
                  <li>
                    <a href="/login" onClick={logout}>
                      <i className="os-icon os-icon-signs-11" />
                      <span>Se deconnecter</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/*------------------
              END - User avatar and menu in secondary top menu
              ------------------*/}
        </div>
        {/*------------------
            END - Top Menu Controls
            ------------------*/}
      </div>
    </Fragment>
  );
};

navBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(navBar);
