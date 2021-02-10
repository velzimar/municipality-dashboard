import React, { useEffect, useState } from "react";
import NavBar from "../layout/navbar";
import SideBar from "../layout/sidebar";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getFileLog_ByUpdateDate } from "../../actions/updated";
import { LEAVE } from "../../actions/types";
import { getAgents } from "../../actions/GestionnaireAdmin";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import store from "../../store";
const GetFileLog_ByUpdateDate = ({
  getAgents,
  agent: { agents },
  getFileLog_ByUpdateDate,
  updated: { updated },
  auth: { user },
  fileId: { fileId },
  fileIdfile: { fileIdfile },
}) => {
  //init states
  const onLeave = () => store.dispatch({ type: LEAVE });
  //var moment = require('moment-timezone');
  var [agent, setAgent] = useState(null);
  var [updateDate, set] = useState(null);
  var [updateDateEnd, setEnd] = useState(null);

  var [optionsState, setOption] = useState("");
  var [typesState, setTypes] = useState("");
  var [marker, setMarker] = useState(null);
  var [type, setType] = useState(null);
  useEffect(
    () => {
      // useEffect is called when the component renders
      //getAgents();
      console.log("rendered");
      console.log("fileIdfile")
      console.log(fileIdfile)
      console.log("fileIdfile")
      console.log(updated.files);
      console.log(typesState);
      console.log(type);
      console.log("rendered");
      if (updated.files) {
        console.log("updated.files");
        console.log(updated.files);

        let m = updated.files.map((file) => {
          var time = file.updateDate.substring(11, 19);
          var agent = file.agent.login;
          var fileId = file.file;
          var date = file.updateDate.substring(0, 10);
          var modif = file.updated;
          


          let i = 0;
          let old = Object.keys(file.oldFields).map((key) => {
            i++;
            console.log(key + ": " + file.oldFields[key]);
            var k = key;
            var v = file.oldFields[key];
            return (
              <tbody key={i}>
                <tr>
                  <td className="text-center">{k}</td>
                  <td className="text-center">{v.toString()}</td>
                </tr>
              </tbody>
            );
          });
          console.log(old);

          let j = 0;
          let New = Object.keys(file.newFields).map((key) => {
            j++;
            console.log(key + ": " + file.newFields[key]);
            var k = key;
            var v = file.newFields[key];
            return (
              <tbody key={j}>
                <tr>
                  <td className="text-center">{k}</td>
                  <td className="text-center">{v.toString()}</td>
                </tr>
              </tbody>
            );
          });
          console.log(New);

          //var newFields = JSON.stringify(file.newFields).toString();
          return (
            <tbody key={file._id}>
              <tr>
                <td className="text-center">{agent}</td>
                <td className="text-center">{fileId}</td>
                <td className="text-center">
                  {modif == "file"
                    ? "Informations générales"
                    : modif == "condition"
                    ? "Conditions"
                    : "Pièces"}
                </td>
                <td className="text-center">{time}</td>
                <td className="text-center">{date}</td>
              </tr>
            </tbody>
          );
        });


        console.log(m);
        setMarker(m);
      }
    },
    [updated],
    [updateDate],
    [updateDateEnd],
    [agent],
  ); //when those [params] changes the useEffect is called too

  useEffect(() => {
    if (fileId) {
      console.log("fileId is here");
      console.log(fileId);
      console.log("fileId is here");
      getFileLog_ByUpdateDate(updateDate, fileId, type, null, updateDateEnd);
    } else if (fileIdfile) {
      console.log("fileIdFile is here");
      console.log(fileIdfile);
      console.log("fileIdFile is here");
      getFileLog_ByUpdateDate(null, null, null, fileIdfile, null);
    } else
      getFileLog_ByUpdateDate(updateDate, agent, type, null, updateDateEnd);
    getAgents();
  }, [getAgents]);

  const handleType = (type) => {
    console.log(type.target.value);
    setType(type.target.value);
    //if (updateDate != null)
    getFileLog_ByUpdateDate(
      updateDate,
      agent,
      type.target.value,
      null,
      updateDateEnd
    );
    setTypes(type.target.value);
  };

  const handleChange = (date) => {
    //onChange date
    if (moment(date, "YYYY-MM-DD").isValid()) {
      var d = moment(date).utcOffset("+00.00"); //.tz(date, "Europe/Berlin").format().substring(0, 10);
      date = new Date(d);
      console.log(d);
      console.log(date);
      set(date);
      console.log(date);
      getFileLog_ByUpdateDate(date, agent, type, null, updateDateEnd);
    } else {
      console.log("null");
      set(null);
      getFileLog_ByUpdateDate(null, agent, type, null, null);
      console.log("null");
    }
  };

  const handleChangeEnd = (date) => {
    //onChange date
    if (moment(date, "YYYY-MM-DD").isValid()) {
      var d = moment(date).utcOffset("+00.00"); //.tz(date, "Europe/Berlin").format().substring(0, 10);
      date = new Date(d);
      console.log(d);
      console.log(date);
      setEnd(date);
      getFileLog_ByUpdateDate(updateDate, agent, type, null, date);
    } else {
      console.log("null");
      setEnd(null);
      getFileLog_ByUpdateDate(updateDate, agent, type, null, null);
      console.log("null");
    }
  };
  const handleAgent = (val) => {
    //onChange Agent
    optionsState = val.target.value;
    //if (updateDate != null)
    getFileLog_ByUpdateDate(
      updateDate,
      val.target.value,
      type,
      null,
      updateDateEnd
    );
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
              <a href="/getByUpdateDate">accueil</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/getByUpdateDate">Historique des modification</a>
            </li>
          </ul>
          <div className="content-i">
            <div className="content-box">
              <div className="element-wrapper">
                <div className="controls-above-table">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="d-flex justify-content-start">
                        <DatePicker
                          selected={updateDate}
                          onChange={handleChange}
                          placeholderText="Date de modification"
                        />
                        <DatePicker
                          selected={updateDateEnd}
                          onChange={handleChangeEnd}
                          placeholderText="date fin"
                        />
                        <select onChange={handleAgent} value={optionsState}>
                          <option key="0" value="">
                            All agents
                          </option>
                          {agentListe}
                        </select>
                        <select onChange={handleType} value={typesState}>
                          <option key="0" value="">
                            All
                          </option>
                          <option key={"file"} value={"file"}>
                            File
                          </option>
                          <option key={"condition"} value={"condition"}>
                            Condition
                          </option>
                          <option key={"piece"} value={"piece"}>
                            Piece
                          </option>
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
                        <th>Dossier</th>
                        <th>Modification des</th>
                        <th>Temps de modification</th>
                        <th>Jour de modification</th>
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

GetFileLog_ByUpdateDate.propTypes = {
  getAgents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  agent: PropTypes.object.isRequired,
  updated: PropTypes.object.isRequired,
  fileId: PropTypes.object.isRequired,
  fileIdfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  updated: state.updated,
  agent: state.GestionnaireAdmin,
  fileId: state.getOneFile,
  fileIdfile: state.getOneFile,
});

export default connect(mapStateToProps, {
  getFileLog_ByUpdateDate,
  getAgents,
})(GetFileLog_ByUpdateDate);
