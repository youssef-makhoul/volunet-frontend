//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//Actions
import Actions from "../../redux/actions";
//CSS
import "./Main.css";
//Components
import ProjectsContainer from "../../components/ProjectsContainer/ProjectsContainer";
export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  componentWillMount() {
    fetch("/projects", {
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.dispatch(Actions.SetGlobalProjects(res.Projects));
          this.setState({ loaded: true });
        } else {
          this.props.dispatch(Actions.AlertGlobal(res.message, "danger"));
        }
      })
      .catch(err => {
        this.props.dispatch(Actions.AlertGlobal(err, "danger"));
      });
  }

  componentDidMount = () => {
    document.title = "Volunet | Projects";
  };

  render() {
    if (!this.state.loaded)
      return (
        <img src="/img/loading.gif" alt="loading" className="loadingGif" />
      );
    return (
      <div className="FormContainer">
        <h2 className="blink header text-primary">Upcomming Projects</h2>
        <ProjectsContainer Projects={this.props.projects} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { projects: state.projects };
};

let ConnectedMain = connect(mapStateToProps)(Main);

export default withRouter(ConnectedMain);
