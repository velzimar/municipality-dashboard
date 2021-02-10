import React, { useEffect, useState } from "react";
import NavBar from "./layout/navbar";
import SideBar from "./layout/sidebar";
import { connect } from "react-redux";
import { getCurrentPosts } from "../actions/posts";
import { getCount } from "../actions/statistic";
import { PropTypes } from "prop-types";
import PostItem from "./map/PostItem";
import PieChart from "./charts/PieChart";
import LineChart from "./charts/LineChart";

const Dashboard = ({
  getCount,
  getCurrentPosts,
  post: { posts },
  auth: { user },
  statistic: { counts, loading },
}) => {
  const [formDataStat, setFormDataStat] = useState({
    startDate: "",
    endDate: "",
  });

  const { startDate, endDate } = formDataStat;

  useEffect(() => {
    if (user.super_admin === true) {
      getCurrentPosts(user.municipalityId);
      getCount(user.municipalityId);
    } else {
      const start = new Date(Date.now()).toISOString();
      const end = new Date(Date.now()).toISOString();
      getCurrentPosts(user.municipalityId);
      getCount(user.municipalityId, start, end);
    }
  }, [getCurrentPosts, getCount, user]);

  const onChangeStat = (e) => {
    setFormDataStat({ ...formDataStat, [e.target.name]: e.target.value });
  };

  const onSubmitStat = (e) => {
    e.preventDefault();
    getCount(user.municipalityId, startDate, endDate);
  };

  const getDailyCounts = () => {
    const start = new Date(Date.now()).toISOString();
    const end = new Date(Date.now()).toISOString();
    getCount(user.municipalityId, start, end);
  };

  return (
    <div className="all-wrapper with-side-panel solid-bg-all">
      <div className="layout-w">
        <SideBar user={user} />
        <div className="content-w">
          <NavBar />

          <ul className="breadcrumb">
            <li className="breadcrumb-item">accueil</li>
            <li className="breadcrumb-item">Carte et statistiques</li>
          </ul>
          <div className="content-i">
            <div className="content-box">
              <div className="element-wrapper">
                <div className="element-actions">
                  <button className="btn btn-primary" onClick={getDailyCounts}>
                    Statistique d'aujourd'hui
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => getCount(user.municipalityId)}
                  >
                    Statistique total
                  </button>
                </div>
                <h6 className="element-header">Statistiques</h6>
                <div className="element-content">
                  <div className="element-box">
                    <form
                      className="form-inline justify-content-sm-center"
                      onSubmit={onSubmitStat}
                    >
                      <label>
                        Choisir une période pour afficher ces statistiques :
                      </label>{" "}
                      &nbsp;
                      <div>
                        <input
                          className="form-control form-control-sm rounded bright"
                          placeholder="Date début souhaitée"
                          type="date"
                          name="startDate"
                          value={startDate}
                          onChange={onChangeStat}
                        />
                        &nbsp;
                        <input
                          className="form-control form-control-sm rounded bright"
                          placeholder="Date fin souhaitée"
                          type="date"
                          name="endDate"
                          value={endDate}
                          onChange={onChangeStat}
                        />
                        &nbsp;
                        <button className="btn btn-primary">Chercher</button>
                      </div>
                    </form>
                  </div>
                  <div className="row">
                    <div className="col-6 col-sm-3 col-xxl-2">
                      <div className="element-box el-tablo centered trend-in-corner smaller">
                        <div className="label">
                          Nombre des points de collecte{" "}
                          <div className="text-danger"> ROUGES </div>
                        </div>
                        <div className="value text-danger">
                          {loading ? 0 : counts.redMarker}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-sm-3 col-xxl-2">
                      <div className="element-box el-tablo centered trend-in-corner smaller">
                        <div className="label">
                          Nombre des points de collecte{" "}
                          <div className="text-yellow"> JAUNES </div>
                        </div>
                        <div className="value text-yellow">
                          {loading ? 0 : counts.yallowMarker}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-sm-3 col-xxl-2">
                      <div className="element-box el-tablo centered trend-in-corner smaller">
                        <div className="label">
                          Nombre des points de collecte{" "}
                          <div className="text-success"> VERTES </div>
                        </div>
                        <div className="value text-success">
                          {loading ? 0 : counts.greenMarker}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-sm-3 col-xxl-2">
                      <div className="element-box el-tablo centered trend-in-corner smaller">
                        <div className="label">
                          Nombre total des points de collecte <div>&nbsp;</div>
                        </div>
                        <div className="value">
                          {loading ? 0 : counts.Total}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-sm">
                      <div className="element-box">
                        <PieChart values={counts} />
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="element-box">
                        <div className="element-actions justify-content-sm-center">
                          <div className="form-group">
                            <select className="form-control form-control-sm">
                              <option defaultValue="true">Last 30 days</option>
                              <option>This Week</option>
                              <option>This Month</option>
                              <option>Today</option>
                            </select>
                          </div>
                        </div>
                        <LineChart />
                      </div>
                    </div>
                  </div>
                </div>
                <h6 className="element-header">Carte</h6>
                <div className="element-content">
                  <PostItem posts={posts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="display-type"></div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentPosts: PropTypes.func.isRequired,
  getCount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  statistic: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  statistic: state.statistic,
});

export default connect(mapStateToProps, { getCurrentPosts, getCount })(
  Dashboard
);
