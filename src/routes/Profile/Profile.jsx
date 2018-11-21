//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//CSS
import "./Profile.css";
//Components
import UserProfile from "./../../components/UserProfile/UserProfile";
//Actions
import Action from "../../redux/actions";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      userid: this.props.match.params.id,
      user: {}
    };
  }
  componentWillMount() {
    fetch(`/user/${this.state.userid}`, {
      credentials: "same-origin",
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({ loaded: true, user: res.user });
        } else {
          this.props.dispatch(Action.AlertGlobal(res.message, "danger"));
        }
      })
      .catch(err => {
        this.props.dispatch(Action.AlertGlobal(err.message, "danger"));
      });
  }
  componentDidMount = () => {
    document.title = "Volunet | Profile";
  };

  render() {
    if (!this.state.loaded)
      return (
        <img src="/img/loading.gif" alt="loading" className="loadingGif" />
      );
    return (
      <div className="profileContainer">
        <UserProfile canEdit={false} user={this.state.user} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

let ConnectedProfile = connect(mapStateToProps)(Profile);

export default withRouter(ConnectedProfile);
