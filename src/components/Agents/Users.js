import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import NavBar from "../layout/navbar";
import SideBar from "../layout/sidebar";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAgents } from "../../actions/GestionnaireAdmin";
import { sendId } from "../../actions/getOneFile";

const ListeAgent = ({
  sendId,
  getAgents,
  agent: { agents },
  auth: { user },
  fileId: { fileId },
}) => {
  
  var [currentId, idSetter] = useState("");

  const send = (currentId) => {
    console.log("clicked");
    console.log("last Id from store");
    console.log(fileId);
    console.log(currentId);
    idSetter(currentId);
    sendId(currentId);
    console.log("clickedend end");
  };
  useEffect(() => {
    getAgents();
  }, [getAgents]);


  let marker = null;

  console.log(agents);

  console.log(agents.count);
  if (agents.response === true) {
    marker = agents.agents.map((agent) => {
      console.log(agents);
      console.log(typeof agent._id);
      return (
        <tbody key={agent._id}>
          <tr>
            <td className="text-center">{agent.login}</td>
            <td className="text-center">{agent.municipality.city}</td>
            <td className="text-center">{agent.firstName}</td>
            <td className="text-center">{agent.lastName}</td>
            <td className="row-actions">
              <Link
                onClick={send.bind(this, agent._id)}
                to={{
                  pathname: "/UsersDetails",
                }}
              >
                <Button>
                  <i className="os-icon os-icon-grid-10" />
                </Button>
              </Link>
              
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
              <div className="element-wrapper"></div>
              <div className="table-responsive">
                <table className="table table-bordered table-lg table-v2 table-striped">
                  <thead>
                    <tr>
                      <th>login</th>
                      <th>muncipalite</th>
                      <th>firstName</th>
                      <th>lastName</th>
                      <th>Profile</th>
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
  );
};

ListeAgent.propTypes = {
  getAgents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  agent: PropTypes.object.isRequired,
  fileId: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  agent: state.GestionnaireAdmin,
  fileId: state.getOneFile,
});

export default connect(mapStateToProps, { getAgents, sendId })(ListeAgent);
