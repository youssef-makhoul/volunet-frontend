//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { withRouter } from "react-router-dom";
//CSS
import "./SignUp.css";

export class SignUp extends Component {
  componentDidMount = () => {
    document.title = "Volunet | Sign up";
  };

  render() {
    return (
      <div className="FormContainer">
        <h2 className="header">Sign up and spread the love</h2>
        <SignUpForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedSignUp = connect(mapStateToProps)(SignUp);

export default withRouter(ConnectedSignUp);
