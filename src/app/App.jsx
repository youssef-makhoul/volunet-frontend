//Modules
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
//actions
import actions from "../redux/actions";
//CSS
import "./App.css";

//Routes
import SignIn from "../routes/SignIn/SignIn";

class App extends Component {
  SignIn(){
    return (<SignIn></SignIn>);
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={"./img/logo.png"} className="App-logo" alt="logo" />
          </header>
          <Route path="/signin" render={this.SignIn} />
        </div>
      </BrowserRouter>
    );
  }
}

let ConnectedApp = connect(function(state) {
  return { counter: state.counter };
})(App);

export default ConnectedApp;
