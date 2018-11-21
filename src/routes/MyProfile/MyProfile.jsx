//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//CSS
import "./MyProfile.css";

//Components
import UserProfile from "./../../components/UserProfile/UserProfile";

export class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  componentDidMount = () => {
    document.title = "Volunet | My Profile";
  };

  render() {
    return (
      <div className="profileContainer">
        <UserProfile canEdit={true} user={this.props.me} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { me: state.userprofile };
};

let ConnectedMyProfile = connect(mapStateToProps)(MyProfile);

export default withRouter(ConnectedMyProfile);
