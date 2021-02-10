import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAgent } from '../../actions/GestionnaireAdmin';
import { getMunicipalite } from '../../actions/Municipalite';
import NavBar from '../layout/navbar';
import SideBar from '../layout/sidebar';
import { Link } from 'react-router-dom';

//import { setAlert } from '../../actions/alert';



const Admin = ({ addAgent, getMunicipalite, municipalite: { municipalites }, auth: { user } }) => {

    useEffect(() => {
        getMunicipalite();
    }, [getMunicipalite]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        municipalityId: ''
    });


    const { email, password, municipalityId } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addAgent(email, password, municipalityId);
        console.log(formData)
    };






    return (
        <div>
            <div className="all-wrapper with-side-panel solid-bg-all">
                <div className="layout-w">

                    <SideBar user={user} />
                    <div className="content-w">

                        <NavBar />


                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/admin">accueil</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="/admin">Gestionnaire des administrateur</a>
                            </li>

                        </ul>
                        <div className="content-i">
                            <div className="content-box">
                                <div className="row">
                                <div className="col-lg">
                                <div className="element-wrapper">
                                <div className="element-actions">
              <Link className="btn btn-white btn-sm" to="/liste_admin"><i className="os-icon os-icon-arrow-left6"></i><span>Retourner</span></Link>
              </div>
                                <h6 className="element-header">
        Gestionnaire des administrateur
      </h6>
      
                                    <div className="element-box">
                                        <form onSubmit={onSubmit}>
                                        <h5 className="form-header">
           Ajouter un Admin
          </h5>
                                            <div className="steps-w">
                                                <div className="step-content active" id="stepContent2">
                                                    <div className="step-contents">
                                                        <div className="form-group">
                                                            <label > adresse mails</label><input className="form-control" placeholder="Enter email"
                                                                type="email"
                                                                name="email"
                                                                value={email}
                                                                onChange={onChange}
                                                                required />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label > Mot de passe</label><input className="form-control" placeholder="Password"
                                                                        type="password"
                                                                        name="password"
                                                                        value={password}
                                                                        onChange={onChange}
                                                                        required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                           
                                                            
                                                            <label > Municipalités</label><select className="form-control"
                                                            name="municipalityId"
                                                                value={municipalityId}
                                                                onChange={onChange}
                                                                required>
                                                       <option value="none">veuillez choisir une municipalitée</option>

                                                                {municipalites.map((municipalite) => (

                                                                    <option  key={municipalite._id} value={municipalite._id}> {municipalite.city}  </option>


                                                                ))}

                                                            </select>
                                                            </div>
                                                        <div className="form-btn btn-primary-w text-right">
                                                            <button className="btn btn-primary" type="submit" >Ajouter</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>

    )
}

Admin.propTypes = {
    addAgent: PropTypes.func.isRequired,
    getMunicipalite: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    municipalite: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
    municipalite: state.municipalite,
    auth: state.auth
});

export default connect(mapStateToProps, { getMunicipalite, addAgent })(Admin);
