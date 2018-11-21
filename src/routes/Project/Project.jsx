//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//CSS
import "./Project.css";
//Components
import ProjectDetailsCard from "./../../components/ProjectDetailsCard/ProjectDetailsCard";

export class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: this.props.match.params.id
    };
  }
  render() {
    return (
      <div className="FormContainer">
        <ProjectDetailsCard Project={this.state.project} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

let ConnectedProject = connect(mapStateToProps)(Project);

export default withRouter(ConnectedProject);
