import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/login';
import { Redirect } from 'react-router-dom';



const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
    
  };

  if (isAuthenticated) {
    return <Redirect to ="/gestionnaireMunicipalité"/>
  } 
  return (
    <Fragment>
      <div className="auth-wrapper">
        <div className="all-wrapper menu-side with-pattern">
          <div className="auth-box-w">
            <div className="logo-w">
              <a href="index.html"><img alt="" src="img/logo-big.png" /></a>
            </div>
            <h4 className="auth-header">
              Login Form
        </h4>
            <form className='form' onSubmit={onSubmit}>
              <div className="form-group">
                <label >Username</label><input className="form-control" placeholder="Enter your username"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required />
                <div className="pre-icon os-icon os-icon-user-male-circle"></div>
              </div>
              <div className="form-group">
                <label >Password</label><input className="form-control" placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required />
                <div className="pre-icon os-icon os-icon-fingerprint"></div>
              </div>
              <div className="buttons-w">
                <button className="btn btn-primary" type="submit" >Se connecter</button>
                <div className="form-check-inline">
                  <label className="form-check-label"><input className="form-check-input" type="checkbox" />Remember Me</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
