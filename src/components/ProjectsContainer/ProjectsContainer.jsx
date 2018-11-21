//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//CSS
import "./ProjectsContainer.css";
//Components
import { Container } from "reactstrap";
import ProjectCard from "../ProjectCard/ProjectCard";

export class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  render() {
    return (
      <Container className="projectsContainer">
        {this.props.Projects.map((project, index) => {
          return (
            <ProjectCard
              key={index}
              linkFunction={event => {
                event.preventDefault();
                this.props.history.push(`/project/${project._id}`);
              }}
              project={project}
            />
          );
        })}
      </Container>
    );
  }
}

const mapStateToProps = state => {return{}};

let ConnectedProjectsContainer = connect(mapStateToProps)(ProjectsContainer);

export default withRouter(ConnectedProjectsContainer);
