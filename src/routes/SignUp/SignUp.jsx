//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { withRouter,Link } from "react-router-dom";
//CSS
import "./SignUp.css";

export class SignUp extends Component {
  componentDidMount = () => {
    document.title = "Volunet | Sign up";
  };

  render() {
    return (
      <div className="SignupContainer rounded bg-background">
        <img src={"/img/logo.png"} className="logo" alt="logo" />
        <h2 className="textHeader text-primary">Sign up and spread the love</h2>
        <SignUpForm />
        <span className="signupSpan text-right">
          already have a profile <Link to="/signin">SignIn</Link>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedSignUp = connect(mapStateToProps)(SignUp);

export default withRouter(ConnectedSignUp);
