import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../New folder/Grid/GridItem";
import GridContainer from "../New folder/Grid/GridContainer.js";
import Table from "../New folder/Table/Table.js";
import Card from "../New folder/Card/Card.js";
import CardHeader from "../New folder/Card/CardHeader.js";
import CardBody from "../New folder/Card/CardBody.js";
import NavBar from "../layout/navbar";
import SideBar from "../layout/sidebar";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router";
import CardFooter from "../New folder/Card/CardFooter.js";
import {
  getOneFile,
  getOneFileConditions,
  getOneFilePieces,
  getFileLog_ByFileId,
} from "../../actions/getOneFile";
import {sendIdFile,sendId} from "../../actions/getOneFile"
import { getFileLog_ByUpdateDate } from "../../actions/updated";
import { LEAVE } from "../../actions/types";
import { Link } from "react-router-dom";
import store from "../../store";
import {
  whiteColor,
  grayColor,
  hexToRgb,
} from "../../assets/jss/material-dashboard-react";
import moment from "moment-timezone";
const styles = {
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};
const useStyles = makeStyles(styles);
const GetOneFile = ({
  getOneFile,
  getOneFileConditions,
  getOneFilePieces,
  getFileLog_ByFileId,
  getFileLog_ByUpdateDate,
  file: { file },
  conditions: { conditions },
  pieces: { pieces },
  log: { log },
  auth: { user },
  fileId: { fileId },
  updated: { updated },
  sendIdFile,
  sendId
}) => {
  const onLeave = () => store.dispatch({ type: LEAVE });
  const today = moment()
    .utcOffset("+01:00")
    .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    .substring(0, 10);
  const classes = useStyles();
  const [marker, setMarker] = useState();
  const [updatedRender, setUpdatedRender] = useState();
  const [createdRender, setCreatedRender] = useState();
  const [countLogs, countLogSetter] = useState();
  const [todayCountLogs, todayCountLogSetter] = useState();
  const [ConditionRender, ConditionSetter] = useState();
  const [PieceRender, PieceSetter] = useState();
  const history = useHistory();
  const backHandler = () => {
    onLeave();
    history.goBack();
  };

  useEffect(
    () => {
      if (!fileId) {
        console.log("noId");
      } else {
        console.log(conditions);
        if (conditions.length === 0) {
          getOneFileConditions(fileId);
        } else {
          let t = [];
          conditions.doc.forEach((cond) => {
            t.push([
              cond.conditionfournie,
              cond.commentaire,
              cond.isSatisfied ? "Oui" : "Non",
            ]);
          });
          ConditionSetter(
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Conditions</h4>
                  <p className={classes.cardCategoryWhite}>
                    Liste des conditions fournies
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Condition", "Commentaire", "Done"]}
                    tableData={t}
                  />
                </CardBody>
              </Card>
            </GridItem>
          );
        }
      }
    },
    [conditions],
    [fileId]
  ); //when those [params] changes the useEffect is called too

  useEffect(
    () => {
      if (!fileId) {
        console.log("noId");
      } else {
        if (pieces.length === 0) {
          getOneFilePieces(fileId);
        } else {
          let p = [];
          pieces.doc.forEach((piece) => {
            p.push([
              piece.piecefournie,
              piece.commentaire,
              piece.isSatisfied ? "Oui" : "Non",
            ]);
          });
          PieceSetter(
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Pieces</h4>
                  <p className={classes.cardCategoryWhite}>
                    Liste des pieces fournies
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Piece", "Commentaire", "Done"]}
                    tableData={p}
                  />
                </CardBody>
              </Card>
            </GridItem>
          );
        }
      }
    },
    [pieces],
    [fileId]
  ); //when those [params] changes the useEffect is called too

  useEffect(() => {
    if (!fileId) {
      console.log("noId");
    } else {
      if (file.length === 0) {
        getOneFile(fileId);
      } else {
        setUpdatedRender(
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger" stats icon>
                <p className={classes.cardCategory}>Dernière modification le</p>
                <h3 className={classes.cardTitle}>
                  {file[0].lastUpdateDate.substring(0, 10)}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <p className={classes.cardCategory}>
                  {file[0].lastUpdateDate.substring(11, 19)}
                </p>
              </CardFooter>
            </Card>
          </GridItem>
        );
        setCreatedRender(
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger" stats icon>
                <p className={classes.cardCategory}>Crée le</p>
                <h3 className={classes.cardTitle}>
                  {file[0].creationDate.substring(0, 10)}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <p className={classes.cardCategory}>
                  {file[0].creationDate.substring(11, 19)}
                </p>
              </CardFooter>
            </Card>
          </GridItem>
        );
        setMarker(
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Dossier</h4>
                <p className={classes.cardCategoryWhite}>
                  Informations sur le dossier
                </p>
              </CardHeader>
              <CardBody>
                <div className={classes.typo}>
                  <div className={classes.note}>Crée par l'agent</div>
                  <h3>{file[0].agent}</h3>
                </div>
                <div className={classes.typo}>
                  <div className={classes.note}>Workflow utilisé</div>
                  <h3>{file[0].workflow}</h3>
                </div>
                <div className={classes.typo}>
                  <div className={classes.note}>Nom de citoyen</div>
                  <h3>{file[0].nomcitoyen}</h3>
                </div>
                <div className={classes.typo}>
                  <div className={classes.note}>Prenom de citoyen</div>
                  <h3>{file[0].prenomcitoyen}</h3>
                </div>
                <div className={classes.typo}>
                  <div className={classes.note}>Email de citoyen</div>
                  <h3>{file[0].emailcitoyen}</h3>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        );
      }
    }
  }, [file]); //when those [params] changes the useEffect is called too

  useEffect(
    () => {
      if (!fileId) {
        console.log("noId");
      } else {
        if (log.length === 0) getFileLog_ByFileId(fileId);
        else {
          countLogSetter(
            <CardHeader color="danger" stats icon>
              <p className={classes.cardCategory}>Nombre de modification</p>
              <h3 className={classes.cardTitle}>
                {log.length !== 0 ? log.count : 0}
              </h3>
            </CardHeader>
          );
        }
      }
    },
    [log],
    [fileId]
  );

  useEffect(
    () => {
      if (!fileId) {
        console.log("noId");
      } else {
        if (updated.length === 0) {
          getFileLog_ByUpdateDate(today, null, null, fileId);
        } else {
          todayCountLogSetter(
            <CardFooter stats>
              <p className={classes.cardCategory}>
                {updated.length !== 0 ? updated.count : 0} Aujourd'hui
              </p>
              <div className={classes.stats}>
                <Link
                  onClick={()=>{console.log("to send "+fileId);onLeave();sendIdFile(fileId)}}
                  to={{
                    pathname: "/getByUpdateDate",
                  }}
                >
                  Voir historique
                </Link>
              </div>
            </CardFooter>
          );
        }
      }
    },
    [updated],
    [fileId]
  );

  if (fileId)
    return (
      <div className="all-wrapper with-side-panel solid-bg-all">
        <div className="layout-w">
          <SideBar user={user} />
          <div className="content-w">
            <NavBar />
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/getByCreationDate">accueil</a>
              </li>
              <li className="breadcrumb-item">Dossier détaillé</li>
            </ul>
            <div className="content-i">
              <div className="content-box">
                <div className="element-wrapper">
                  <div className="controls-above-table">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="d-flex justify-content-end">
                          <Link
                            color={"primary"}
                            className="btn btn-sm btn-secondary"
                            onClick={backHandler}
                            to={{
                              pathname: "/getByCreationDate",
                            }}
                          >
                            Retourner
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <GridContainer>
                        {marker}
                        <GridItem xs={12} sm={12} md={4}>
                          <GridItem xs={12} sm={12} md={12}>
                            <Card>
                              {countLogs}
                              {todayCountLogs}
                            </Card>
                          </GridItem>
                          {updatedRender}
                          {createdRender}
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <GridContainer>
                        {ConditionRender}
                        {PieceRender}
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
};

GetOneFile.propTypes = {
  auth: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired,
  conditions: PropTypes.object.isRequired,
  pieces: PropTypes.object.isRequired,
  log: PropTypes.object.isRequired,
  fileId: PropTypes.object.isRequired,
  updated: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  file: state.getOneFile,
  conditions: state.getOneFile,
  pieces: state.getOneFile,
  fileId: state.getOneFile,
  log: state.getOneFile,
  updated: state.updated,
});

export default connect(mapStateToProps, {
  getOneFile,
  getOneFileConditions,
  getOneFilePieces,
  getFileLog_ByFileId,
  getFileLog_ByUpdateDate,
  sendIdFile,
  sendId
})(GetOneFile);
