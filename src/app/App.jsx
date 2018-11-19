//Modules
import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//CSS
import "./App.css";
//Routes
import SignIn from "../routes/SignIn/SignIn";
import SignUp from "../routes/SignUp/SignUp";
import Main from "../routes/Main/Main";
import MyProfile from "../routes/MyProfile/MyProfile";
import UpdateProfile from "../routes/MyProfile/UpdateProfile/UpdateProfile";
//Components
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { Alert } from "reactstrap";
//Actions
import actions from "../redux/actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderRoute = this.renderRoute.bind(this);
    this.checkAuthenticated = this.checkAuthenticated.bind(this);
    this.alertOnDismiss = this.alertOnDismiss.bind(this);
    this.renderGlobalAlert = this.renderGlobalAlert.bind(this);
  }
  alertOnDismiss() {
    if (!this.props.alert.visible) return;
    this.props.dispatch(actions.DisableAlertGlobal());
  }
  checkAuthenticated() {
    if (this.props.authenticated && this.props.userprofile !== undefined)
      return;
    else {
      fetch("/user", {
        credentials: "same-origin"
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            this.props.dispatch(actions.SignIn(res.user));
          }
        })
        .catch(err => {
          this.props.dispatch(
            actions.AlertGlobal(
              "Could not Connect to server " + err.message,
              "danger"
            )
          );
        });
    }
  }

  renderGlobalAlert() {
    if (this.props.alert.visible)
      setTimeout(() => {
        this.alertOnDismiss();
      }, 2000);
    return (
      <Alert
        color={this.props.alert.color}
        isOpen={this.props.alert.visible}
        toggle={this.alertOnDismiss}
        className="globalAlert"
      >
        {this.props.alert.message}
      </Alert>
    );
  }

  renderRoute(route) {
    switch (route) {
      case "signin":
        return this.props.authenticated ? <Redirect to="/" /> : <SignIn />;
      case "signup":
        return this.props.authenticated ? <Redirect to="/" /> : <SignUp />;
      case "main":
        return this.props.authenticated ? <Main /> : <Redirect to="/signin" />;
      case "myprofile":
        return this.props.authenticated ? (
          <MyProfile />
        ) : (
          <Redirect to="/signin" />
        );
      case "myprofile/update":
        return this.props.authenticated ? (
          <UpdateProfile />
        ) : (
          <Redirect to="/signin" />
        );
      default:
        break;
    }
  }
  render() {
    this.checkAuthenticated();
    return (
      <BrowserRouter>
        <div className="App">
          <NavigationBar />
          <div style={{ position: "relative" }}>
            {this.renderGlobalAlert()}
            <Route
              exact={true}
              path="/"
              render={() => this.renderRoute("main")}
            />
            <Route
              exact={true}
              path="/signin"
              render={() => this.renderRoute("signin")}
            />
            <Route
              exact={true}
              path="/signup"
              render={() => this.renderRoute("signup")}
            />
            <Route
              exact={true}
              path="/myprofile"
              render={() => this.renderRoute("myprofile")}
            />
            <Route
              exact={true}
              path="/myprofile/update"
              render={() => this.renderRoute("myprofile/update")}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    alert: state.alert,
    userprofile: state.userprofile
  };
};

let ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
