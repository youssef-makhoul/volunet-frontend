//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//import { IoIosContact, IoIosLock } from "react-icons/io";
//Actions
import actions from "../../redux/actions";
//Components
import {
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  FormFeedback,
  Label
} from "reactstrap";
//CSS
import "./SignUpForm.css";

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullname: "",
      password: "",
      confirmpassword: "",
      validate: {
        emailState: "",
        passwordState: "",
        confirmpasswordState: ""
      }
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeFullName = this.handleChangeFullName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeEmail(event) {
    if (event.target.value !== "") {
      this.validateEmail(event);
      this.setState({ email: event.target.value });
    } else {
      this.setState({
        email: event.target.value,
        validate: {
          emailState: ""
        }
      });
    }
  }
  handleChangeFullName(event) {
    this.setState({ fullname: event.target.value });
  }
  handleChangePassword(event) {
    if (event.target.value !== "") {
      this.validatePassword(event);
      this.setState({ password: event.target.value });
    } else {
      this.setState({
        password: event.target.value,
        validate: {
          passwordState: ""
        }
      });
    }
  }
  handleChangeConfirmPassword(event) {
    if (event.target.value !== "") {
      this.validateConfirmPassword(event);
      this.setState({ confirmpassword: event.target.value });
    } else {
      this.setState({
        confirmpassword: event.target.value,
        validate: {
          confirmpasswordState: ""
        }
      });
    }
  }
  validateEmail(event) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(event.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }
  validatePassword(event) {
    const passwordRex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;
    const { validate } = this.state;
    if (passwordRex.test(event.target.value)) {
      validate.passwordState = "has-success";
    } else {
      validate.passwordState = "has-danger";
    }
    this.setState({ validate });
  }
  validateConfirmPassword(event) {
    const { validate } = this.state;
    if (this.state.password === event.target.value) {
      validate.confirmpasswordState = "has-success";
    } else {
      validate.confirmpasswordState = "has-danger";
    }
    this.setState({ validate });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
        fullname: this.state.fullname
      })
    })
      .then(res => res.json())
      .catch(err => {
        this.props.dispatch(
          actions.AlertGlobal(
            "Could not Connect to server " + err.message,
            "danger"
          )
        );
      });
    if (response.success) {
      this.props.dispatch(actions.SignIn());
    } else {
      this.props.dispatch(actions.AlertGlobal(response.message, "danger"));
    }
  }
  render() {
    return (
      <Container className="SignupFormContainer">
        <Form onSubmit={this.handleSubmit}>
          {/* email */}
          <FormGroup>
            <Label for="email" className="formLabel">
              <span>Email </span>
              <span style={{ color: "red" }}>*</span>
            </Label>
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
              there is an issue with your email. Please input a correct email.
            </FormFeedback>
          </FormGroup>
          {/* fullname */}
          <FormGroup>
            <Label for="fullname" className="formLabel">
              <span>Full Name </span>
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="text"
              id="fullname"
              placeholder="Full Name"
              onChange={this.handleChangeFullName}
              value={this.state.fullname}
            />
          </FormGroup>
          {/* password */}
          <FormGroup>
            <Label for="password" className="formLabel">
              <span>Password </span>
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              onChange={this.handleChangePassword}
              valid={this.state.validate.passwordState === "has-success"}
              invalid={this.state.validate.passwordState === "has-danger"}
              value={this.state.password}
            />
            <FormFeedback valid>looks good</FormFeedback>
            <FormFeedback invalid="true">
              password should be 8 characters at least and contains a number
            </FormFeedback>
          </FormGroup>

          {/* confirmpassword */}
          <FormGroup>
            <Label for="confirmpassword" className="formLabel">
              <span>Confirm Password </span>
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="password"
              id="confirmpassword"
              placeholder="Confirm Password"
              onChange={this.handleChangeConfirmPassword}
              valid={this.state.validate.confirmpasswordState === "has-success"}
              invalid={
                this.state.validate.confirmpasswordState === "has-danger"
              }
              value={this.state.confirmpassword}
            />
            <FormFeedback valid>looks good</FormFeedback>
            <FormFeedback invalid="true">not a match</FormFeedback>
          </FormGroup>
          {/* submit */}
          <Button type="submit" className="btn-block" color="primary" size="sm">
            Sign up
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedSignUpForm = connect(mapStateToProps)(SignUpForm);

export default withRouter(ConnectedSignUpForm);
