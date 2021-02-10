import React, { useEffect } from "react";
import NavBar from "../layout/navbar";
import SideBar from "../layout/sidebar";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getCurrentPosts, deletePost } from "../../actions/posts";
import { CSVLink } from "react-csv";

const Historique = ({
  getCurrentPosts,
  deletePost,
  post: { posts },
  auth: { user },
}) => {
  useEffect(() => {
    getCurrentPosts(user.municipalityId);
  }, [getCurrentPosts, user]);

  let tmpArray = [];
  let marker = null;
  if (posts.length > 0) {
    marker = posts.map((post) => {
      tmpArray.push(post);

      //console.log(csvRow);
      if (post.rating === "Bad") {
        return (
          <tbody>
            <tr>
              <td className="text-center">{post.rating}</td>
              <td className="text-center">{post.longitude}</td>
              <td className="text-center">{post.altitude}</td>
              <td className="text-center">{post.date}</td>
              <td className="text-center">
                <div className="status-pill yellow" />
              </td>
              {/*  <td>
            <img  src={"https://digital-city-app.herokuapp.com/"+ post.post_image} width='40%' height='5.5%' alt=''/>
            </td>*/}
              <td className="row-actions">
                <a href="/historique">
                  <i className="os-icon os-icon-ui-49" />
                </a>
                <a href="/historique">
                  <i className="os-icon os-icon-grid-10" />
                </a>
                <a className="danger" href="#myModal" data-toggle="modal">
                  <i className="os-icon os-icon-ui-15" />
                </a>
              </td>
            </tr>
          </tbody>
        );
      } else if (post.rating === "Good") {
        return (
          <tbody>
            <tr>
              <td className="text-center">{post.rating}</td>
              <td className="text-center">{post.longitude}</td>
              <td className="text-center">{post.altitude}</td>
              <td className="text-center">{post.date}</td>
              <td className="text-center">
                <div className="status-pill green" />
              </td>
              {/*
            <td>
            <img  src={"https://digital-city-app.herokuapp.com/"+ post.post_image} width='40%' height='5.5%' alt=''/>
            </td>*/}
              <td className="row-actions">
                <a href="/historique">
                  <i className="os-icon os-icon-ui-49" />
                </a>
                <a href="/historique">
                  <i className="os-icon os-icon-grid-10" />
                </a>
                <a className="danger" href="#myModal" data-toggle="modal">
                  <i className="os-icon os-icon-ui-15" />
                </a>
              </td>
            </tr>
          </tbody>
        );
      } else {
        return (
          <tbody>
            <tr>
              <td className="text-center">{post.rating}</td>
              <td className="text-center">{post.longitude}</td>
              <td className="text-center">{post.altitude}</td>
              <td className="text-center">{post.date}</td>
              <td className="text-center">
                <div className="status-pill red" />
              </td>
              {/*             <td>
            <img  src={"https://digital-city-app.herokuapp.com/"+ post.post_image} width='40%' height='5.5%' alt=''/>
            </td>*/}
              <td className="row-actions">
                <a href="historique">
                  <i className="os-icon os-icon-ui-49" />
                </a>
                <a href="historique">
                  <i className="os-icon os-icon-grid-10" />
                </a>
                <a className="danger" href="#myModal" data-toggle="modal">
                  <i className="os-icon os-icon-ui-15" />
                </a>
              </td>
            </tr>
          </tbody>
        );
      }
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
              <a href="/historique">accueil</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/historique">Historique</a>
            </li>
          </ul>

          <div className="content-i">
            <div className="content-box">
              <CSVLink
                className="mr-2 mb-2 btn btn-outline-success"
                type="button"
                data={tmpArray}
              >
                Télècharger fichier CSV
              </CSVLink>
              <div className="element-wrapper"></div>

              <a href="#myModal" className="trigger-btn" data-toggle="modal">
                Click to Open Confirm Modal
              </a>
              <div className="table-responsive">
                <table className="table table-bordered table-lg table-v2 table-striped">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>altitude</th>
                      <th>longitude</th>
                      <th>Referral</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  {marker}
                </table>
                <div id="myModal" className="modal fade">
                  <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="icon-box">
                          <i className="ti-close" />
                        </div>
                        <h4 className="modal-title">Are you sure?</h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-hidden="true"
                        >
                          ×
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>
                          Do you really want to delete these records? This
                          process cannot be undone.
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-info"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button type="button" className="btn btn-danger">
                          Delete
                        </button>
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
  );
};

Historique.propTypes = {
  getCurrentPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getCurrentPosts, deletePost })(
  Historique
);
