import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../New folder/Grid/GridItem.js";
import GridContainer from "../New folder/Grid/GridContainer.js";
import CustomInput from "../New folder/CustomInput/CustomInput.js";
import Button from "../New folder/CustomButtons/Button.js";
import Card from "../New folder/Card/Card.js";
import CardHeader from "../New folder/Card/CardHeader.js";
import CardBody from "../New folder/Card/CardBody.js";
import CardFooter from "../New folder/Card/CardFooter.js";
import NavBar from "../layout/navbar";
import SideBar from "../layout/sidebar";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
import CardIcon from "../New folder/Card/CardIcon.js";
import { Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  getFileLog_ByCreationDate,
  getFileLog_ByCreationDate_today,
} from "../../actions/created";
import {
  getFileLog_ByUpdateDate,
  getFileLog_ByUpdateDate_today,
} from "../../actions/updated";

import { getOneAgent } from "../../actions/GestionnaireAdmin";

import { sendId } from "../../actions/getOneFile";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import moment from "moment-timezone";

import { useHistory, Redirect } from "react-router";
const useStyles = makeStyles(styles);
//const today = moment.tz(new Date(), "Europe/Paris").format().substring(0, 10);
const UserProfile = ({
  auth: { user },
  created: { created },
  updated: { updated },
  createdToday: { createdToday },
  updatedToday: { updatedToday },
  getFileLog_ByCreationDate,
  getFileLog_ByUpdateDate,
  getFileLog_ByCreationDate_today,
  getFileLog_ByUpdateDate_today,
  fileId: { fileId },
  sendId,
  getOneAgent,
  agent: { agent },
}) => {
  const classes = useStyles();
  const [creationCount, setCreationCount] = useState();
  const [updateCount, setUpdateCount] = useState();
  const [markerC, setCreationTodayMarker] = useState();
  const [markerU, setUpdatedTodayMarker] = useState();
  const [profile, setProfile] = useState();

  const [email, setEmail] = useState("");

  const send = (id) => {
    sendId(id);
  };
  const HandleChangeEmail = (e) => {
    console.log("e.target.value");
    console.log(e.target.value);
    console.log("e.target.value");
    setEmail(e.target.value);
  };
  const HandleSubmit = () => {
    console.log("submitted");

    console.log("email: " + email);

    console.log("submitted");
  };
  useEffect(
    () => {
      console.log("entered to agent");
      // console.log(created.length === 0);

      // console.log("created");
      if (agent.length === 0) {
        console.log("no agent");
        getOneAgent(fileId);
      } else {
        console.log(" agent");
        console.log(agent);
        setProfile(
          <GridItem xs={12} sm={12} md={9}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Vous pouvez modifier le nom, le prenom, l'addresse email, le
                  mot de passe et la status
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText={"Municipalité: " + agent[0].municipality.city}
                      id="muni"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText={"Login: " + agent[0].login}
                      id="login"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={"Nom: " + agent[0].firstName}
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={"Prenom: " + agent[0].lastName}
                      id="last"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={
                        "Date d'inscription: " +
                        agent[0].creationDate.substring(0, 10) +
                        " à " +
                        agent[0].creationDate.substring(11, 19)
                      }
                      id="ins"
                      inputProps={{
                        disabled: true,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={
                        "Dernière connexion: " +
                        agent[0].lastLoginDate.substring(0, 10) +
                        " à " +
                        agent[0].lastLoginDate.substring(11, 19)
                      }
                      inputProps={{
                        disabled: true,
                      }}
                      id="lastlogin"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={"Mot de Passe: "}
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={HandleSubmit}>
                  Mettre à jour
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        );
      }
    },
    [agent]
  );

  useEffect(() => {
    if (!fileId) {
    } else {
      if (agent.length !== 0) {
        console.log(" agent.length !== 01");
        console.log(" email");
        console.log( email);
        // update request here
        console.log(" agent.length !== 02");
      }
    }
  }, [email]);

  useEffect(() => {
    if (!fileId) {
      ///console.log("no fileId");
    } else {
      // console.log("created");
      // console.log(created.length === 0);

      // console.log("created");
      if (created.length === 0) {
        //  console.log("no created");
        getFileLog_ByCreationDate(null, fileId, null);
      } else {
        //console.log(created);
        // console.log(created.count);
        setCreationCount(created.count);
      }
    }
  }, [created]);

  useEffect(() => {
    if (!fileId) {
      //console.log("no fileId");
    } else {
      //console.log("updated");
      //console.log(updated.length === 0);
      //console.log("updated");
      if (updated.length === 0) {
        //console.log("no updated");
        getFileLog_ByUpdateDate(null, fileId, null, null, null);
      } else {
        //console.log(updated);
        //console.log(updated.count);
        setUpdateCount(updated.count);
      }
    }
  }, [updated]);
  useEffect(() => {
    if (!fileId) {
      //console.log("no fileId");
    } else {
      //console.log("createdToday");
      // console.log(createdToday.length === 0);

      //console.log("createdToday");
      if (createdToday.length === 0) {
        //console.log("no createdToday");
        getFileLog_ByCreationDate_today(
          moment()
            .utcOffset("+01:00")
            .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            .substring(0, 10),
          fileId
        );
      } else {
        //console.log("createdToday != 0");
        //console.log(createdToday);
        //console.log(createdToday.count);
        //setCreationCount(createdToday.count);
        // console.log("createdToday");
        setCreationTodayMarker(
          <p className={classes.cardCategory}>
            {createdToday.count} aujourd'hui
          </p>
        );
      }
    }
  }, [createdToday]);

  useEffect(() => {
    if (!fileId) {
      console.log("no fileId");
    } else {
      console.log("updatedToday");
      console.log(updatedToday === undefined);
      console.log(!updatedToday);

      console.log("updatedToday");

      if (updatedToday.length === 0) {
        console.log("no updatedToday");
        getFileLog_ByUpdateDate_today(
          moment()
            .utcOffset("+01:00")
            .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            .substring(0, 10),
          fileId
        );
      } else {
        console.log("updatedToday != 0");
        console.log(updatedToday);
        console.log(updatedToday.count);
        console.log("updatedToday");
        setUpdatedTodayMarker(
          <p className={classes.cardCategory}>
            {updatedToday.count} aujourd'hui
          </p>
        );
      }
    }
  }, [updatedToday]);

  if (fileId) {
    return (
      <div className="all-wrapper with-side-panel solid-bg-all">
        <div className="layout-w">
          <SideBar user={user} />
          <div className="content-w">
            <NavBar />
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/liste_agent">accueil</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/liste_agent">Historique des Agents</a>
              </li>
            </ul>
            <div className="content-i">
              <div className="content-box">
                <div>
                  <GridContainer>
                    {profile}
                    <GridItem xs={12} sm={12} md={3}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Card>
                            <CardHeader color="danger" stats icon>
                              <CardIcon color="danger">
                                <Icon>
                                  <i className="os-icon os-icon-edit" />
                                </Icon>
                              </CardIcon>
                              <p className={classes.cardCategory}>
                                Dossier modifié
                              </p>
                              <h3 className={classes.cardTitle}>
                                {updateCount}
                              </h3>
                            </CardHeader>
                            <CardFooter stats>
                              {markerU}
                              <div className={classes.stats}>
                                <Link
                                  onClick={send.bind(this, fileId)}
                                  to={{
                                    pathname: "/getByUpdateDate",
                                  }}
                                >
                                  Voir historique
                                </Link>
                              </div>
                            </CardFooter>
                          </Card>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Card>
                            <CardHeader color="success" stats icon>
                              <CardIcon color="success">
                                <Icon>
                                  <i className="os-icon os-icon-file" />
                                </Icon>
                              </CardIcon>
                              <p className={classes.cardCategory}>
                                Dossier crée
                              </p>
                              <h3 className={classes.cardTitle}>
                                {creationCount}
                              </h3>
                            </CardHeader>
                            <CardFooter stats>
                              {markerC}
                              <div className={classes.stats}>
                                <Link
                                  onClick={send.bind(this, fileId)}
                                  to={{
                                    pathname: "/getByCreationDate",
                                  }}
                                >
                                  Voir historique
                                </Link>
                              </div>
                            </CardFooter>
                          </Card>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                      <CustomInput
                        labelText={
                          "Email: " +
                          (email === undefined
                            ? "No email address provided"
                            : email)
                        }
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: HandleChangeEmail,
                          defaultValue: "",
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
};
UserProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  created: PropTypes.object.isRequired,
  updated: PropTypes.object.isRequired,
  createdToday: PropTypes.object.isRequired,
  updatedToday: PropTypes.object.isRequired,
  fileId: PropTypes.object.isRequired,
  agent: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  created: state.created,
  updated: state.updated,
  createdToday: state.created,
  updatedToday: state.updated,
  fileId: state.getOneFile,
  agent: state.GestionnaireAdmin,
});

export default connect(mapStateToProps, {
  getFileLog_ByCreationDate,
  getFileLog_ByUpdateDate,
  getFileLog_ByCreationDate_today,
  getFileLog_ByUpdateDate_today,
  sendId,
  getOneAgent,
})(UserProfile);
