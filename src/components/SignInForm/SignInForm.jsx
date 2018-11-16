//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { IoIosContact, IoIosLock } from "react-icons/io";
import { withRouter } from "react-router-dom";
//Actions
import actions from "../../redux/actions";
//Components
import {
  Button,
  Form,
  FormGroup,
  InputGroupAddon,
  Input,
  Container,
  FormFeedback,
  InputGroup,
  InputGroupText
} from "reactstrap";
//CSS
import "./SignInForm.css";

export class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validate: {
        emailState: "",
        buttonState: true
      }
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }
  handleChangeEmail(event) {
    if (event.target.value !== "") {
      this.validateEmail(event);
      this.setState({ email: event.target.value });
    } else {
      this.setState({
        email: event.target.value,
        validate: {
          emailState: "",
          buttonState: true
        }
      });
    }
  }
  handleChangePassword(event) {
    const { validate } = this.state;
    if (
      event.target.value !== "" &&
      this.state.validate.emailState === "has-success"
    )
      validate.buttonState = false;
    else validate.buttonState = true;
    this.setState({ password: event.target.value, validate });
  }
  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("/signin", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .catch(err => {
        this.props.dispatch(
          actions.AlertGlobal("Could not Connect to server: " + err.message,"danger")
        );
      });
    if (response.success) {
      this.props.dispatch(actions.SignIn());
    } else this.props.dispatch(actions.AlertGlobal(response.message));
  }
  render() {
    return (
      <div className="SignInFormContainer">
        <Form>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="inputGroupText">
                  <IoIosContact />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                id="email"
                placeholder="Email Address"
                onChange={this.handleChangeEmail}
                valid={this.state.validate.emailState === "has-success"}
                invalid={this.state.validate.emailState === "has-danger"}
                value={this.state.email}
              />
              <FormFeedback valid>valid email</FormFeedback>
              <FormFeedback invalid="true">
                Uh oh! Looks like there is an issue with your email. Please
                input a correct email.
              </FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="inputGroupText">
                  <IoIosLock />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                onChange={this.handleChangePassword}
                value={this.state.password}
              />
            </InputGroup>
          </FormGroup>
          <Button
            className="btn-block"
            color="primary"
            size="sm"
            onClick={this.handleSubmit}
            disabled={this.state.validate.buttonState}
          >
            Sign In
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedSignInForm = connect(mapStateToProps)(SignInForm);

export default withRouter(ConnectedSignInForm);
