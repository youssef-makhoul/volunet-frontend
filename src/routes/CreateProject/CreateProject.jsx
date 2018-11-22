//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//CSS
import "./CreateProject.css";
//Components
import CreateProjectForm from "./../../components/CreateProjectForm/CreateProjectForm";

export class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="CreatProjectContainer">
        <CreateProjectForm />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

let ConnectedCreateProject = connect(mapStateToProps)(CreateProject);

export default withRouter(ConnectedCreateProject);
