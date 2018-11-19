//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom"
//CSS
import "./Main.css";
//Components
import ProjectsContainer from "../../components/ProjectsContainer/ProjectsContainer"
export class Main extends Component {
  componentDidMount = () => {
    document.title = "Volunet | SignIn";
  };

  render() {
    return (
      <div className="FormContainer">
        <h2 className="header">Projects</h2>
        <ProjectsContainer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedMain = connect(mapStateToProps)(Main)

export default withRouter(ConnectedMain);
