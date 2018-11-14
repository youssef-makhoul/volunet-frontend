import React, { Component } from "react";
import { connect } from "react-redux";
import SignInForm from "../../components/SignInForm/SignInForm";
//CSS
import "./SignIn.css";

export class SignIn extends Component {
  render() {
    return (
        <div className="FormContainer">
          <h2 className="header">Sign in to your account</h2>
          <SignInForm />
        </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(SignIn);
