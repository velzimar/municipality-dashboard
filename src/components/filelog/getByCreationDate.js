import React, { useEffect, useState } from "react";
import NavBar from "../layout/navbar";
import SideBar from "../layout/sidebar";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getFileLog_ByCreationDate } from "../../actions/created";
import { LEAVE } from "../../actions/types";
import { getAgents } from "../../actions/GestionnaireAdmin";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import store from "../../store";
import { sendId } from "../../actions/getOneFile";
import { Button } from "@material-ui/core";
const GetFileLog_ByCreationDate = ({
  getAgents,
  agent: { agents },
  getFileLog_ByCreationDate,
  created: { created },
  auth: { user },
  sendId,
  fileId: { fileId },
}) => {
  //init states
  const onLeave = () => store.dispatch({ type: LEAVE });
  //var moment = require('moment-timezone');
  var [agent, setAgent] = useState(null);
  var [creationDate, set] = useState(null);
  var [creationDateEnd, setEnd] = useState(null);
  var [optionsState, setOption] = useState("");
  var [marker, setMarker] = useState(null);
  var [currentId, idSetter] = useState("");
  
  useEffect(
    () => {
      // useEffect is called when the component renders
      //getAgents();
      
      console.log("rendered");
      console.log(created.files);
      //console.log(fileId)
      console.log("rendered");
      if (created.files) {
        console.log("created.files");
        console.log(created.files);
        let m = created.files.map((file) => {
          var time = file.creationDate.substring(11, 19);
          var nom = file.nomcitoyen;
          var prenom = file.prenomcitoyen;
          var agent = file.agent.login;
          var date = file.creationDate.substring(0, 10);

          return (
            <tbody key={file._id}>
              <tr>
                <td className="text-center">{agent}</td>
                <td className="text-center">{nom}</td>
                <td className="text-center">{prenom}</td>
                <td className="text-center">{time}</td>
                <td className="text-center">{date}</td>
                <td className="row-actions">
                  <Link
                    to={{
                      pathname: "/",
                    }}
                  >
                    <Button>
                      <i className="os-icon os-icon-ui-49" />
                    </Button>
                  </Link>
                  <Link
                    onClick={send.bind(this, file._id)}
                    to={{
                      pathname: "/getOneFile",
                    }}
                  >
                    <Button>
                      <i className="os-icon os-icon-grid-10" />
                    </Button>
                  </Link>
                  <Link
                    className="danger"
                    to={{
                      pathname: "/",
                    }}
                  >
                    <Button>
                      <i className="os-icon os-icon-ui-15" />
                    </Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          );
        });
        console.log(m);
        setMarker(m);
      }
    },
    [created],
    [creationDate],
    [creationDateEnd],
    [agent]
  ); //when those [params] changes the useEffect is called too

  useEffect(() => {
    if (fileId)
      getFileLog_ByCreationDate(creationDate, fileId, creationDateEnd);
    else getFileLog_ByCreationDate(creationDate, agent, creationDateEnd);
    getAgents();
  }, [getAgents]);

  useEffect(() => {
    console.log("local id");
    console.log(currentId);
    console.log("local id end");
    console.log("received from store");
    console.log(fileId);
    console.log("received from store end");
  }, [fileId]);

  const send = (currentId) => {
    console.log("clicked");
    console.log("last Id from store");
    console.log(fileId);
    console.log(currentId);
    idSetter(currentId);
    sendId(currentId);
    console.log("clickedend end");
  };

  const handleChange = (date) => {
    //onChange date
    if (moment(date, "YYYY-MM-DD").isValid()) {
      var d = moment(date).utcOffset("+00.00");
      //console.log(d)
      date = new Date(d);
      set(date);
      getFileLog_ByCreationDate(date, agent, creationDateEnd);
    } else {
      getFileLog_ByCreationDate(null, agent, null);
    }
  };

  const handleChangeEnd = (date) => {
    if (moment(date, "YYYY-MM-DD").isValid()) {
      var d = moment(date).utcOffset("+00.00");
      //console.log(d)
      date = new Date(d);
      //onChange date
      setEnd(date);
      getFileLog_ByCreationDate(creationDate, agent, date);
    } else {
      getFileLog_ByCreationDate(creationDate, agent, null);
    }
  };

  const handleAgent = (val) => {
    //onChange Agent
    optionsState = val.target.value;
    getFileLog_ByCreationDate(creationDate, val.target.value, creationDateEnd);
    console.log(created);
    setAgent(val.target.value);
    setOption(val.target.value);
  };
  let agentListe = null;
  if (agents !== undefined && agents.response === true) {
    agentListe = agents.agents.map((agent) => {
      //console.log(typeof (agent._id))
      return (
        <option key={agent.login} value={agent._id}>
          {agent.login}
        </option>
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
              <a href="/getByCreationDate">accueil</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/getByCreationDate">Historique de création</a>
            </li>
          </ul>
          <div className="content-i">
            <div className="content-box">
              <div className="element-wrapper">
                <div className="controls-above-table">
                  <div className="row">
                    <div className="col-sm-8">
                      <div className="d-flex justify-content-start">
                        <DatePicker
                          selected={creationDate}
                          onChange={handleChange}
                          placeholderText="Date de création"
                        />
                        <DatePicker
                          selected={creationDateEnd}
                          onChange={handleChangeEnd}
                          placeholderText="date fin"
                        />
                        <select onChange={handleAgent} value={optionsState}>
                          <option key="0" value="">
                            All agents
                          </option>
                          {agentListe}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-lg table-v2 table-striped">
                    <thead>
                      <tr>
                        <th>Agent</th>
                        <th>Nom de citoyen</th>
                        <th>Prenom de citoyen</th>
                        <th>Temps de création</th>
                        <th>Jour de création</th>
                        <th>Actions</th>
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

GetFileLog_ByCreationDate.propTypes = {
  getAgents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  agent: PropTypes.object.isRequired,
  created: PropTypes.object.isRequired,
  fileId: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  created: state.created,
  agent: state.GestionnaireAdmin,
  fileId: state.getOneFile,
});

export default connect(mapStateToProps, {
  getFileLog_ByCreationDate,
  getAgents,
  sendId,
})(GetFileLog_ByCreationDate);
