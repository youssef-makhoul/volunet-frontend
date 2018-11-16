//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//CSS
import "./UpdateProfile.css";

//Components
import UpdateProfileFrom from "./../../../components/UpdateProfileForm/UpdateProfileFrom";

export class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  componentDidMount = () => {
    document.title = "Volunet | Update Profile";
  };

  render() {
    return (
      <div className="profileContainer">
        <UpdateProfileFrom user={this.props.me} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { me: state.userprofile };
};

let ConnectedUpdateProfile = connect(mapStateToProps)(UpdateProfile);

export default withRouter(ConnectedUpdateProfile);
