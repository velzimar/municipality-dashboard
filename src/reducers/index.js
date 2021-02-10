import { combineReducers } from 'redux';
import auth from './auth'
import alert from './alert'
import post from './posts'
import municipalite from './municipalite'
import GestionnaireAdmin from './GestionnaireAdmin'
import admin from './admin'
import statistic from './statistic'
import created from './created'
import updated from './updated'
import getOneFile from './getOneFile'

export default combineReducers({
    alert,
    auth,
    post,
    GestionnaireAdmin,
    municipalite,
    admin,
    statistic,
    created,
    updated,
    getOneFile
});