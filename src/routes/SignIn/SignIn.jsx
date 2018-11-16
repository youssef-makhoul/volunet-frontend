//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import SignInForm from "../../components/SignInForm/SignInForm";
import {withRouter} from "react-router-dom";
//CSS
import "./SignIn.css";

export class SignIn extends Component {
  componentDidMount = () => {
    document.title = "Volunet | SignIn";
  };

  render() {
    return (
      <div className="SignInContainer">
        <h2 className="header">Sign in to your account</h2>
        <SignInForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedSignIn = connect(mapStateToProps)(SignIn)

export default withRouter(ConnectedSignIn);
