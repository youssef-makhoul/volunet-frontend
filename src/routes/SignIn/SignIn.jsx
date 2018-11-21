//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import SignInForm from "../../components/SignInForm/SignInForm";
import { withRouter, Link } from "react-router-dom";
//CSS
import "./SignIn.css";

export class SignIn extends Component {
  componentDidMount = () => {
    document.title = "Volunet | SignIn";
  };

  render() {
    return (
      <div className="SignInContainer rounded bg-background">
        <img src={"/img/logo.png"} className="logo" alt="logo" />
        <span className="textHeader text-primary">Sign in to your account</span>
        <SignInForm />
        <span className="signupSpan text-right">
          Don't Have a profile <Link to="/signup">SignUp</Link>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedSignIn = connect(mapStateToProps)(SignIn);

export default withRouter(ConnectedSignIn);
