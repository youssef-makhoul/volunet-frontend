import React, { Component } from "react";
import { connect } from "react-redux";
import { IoIosContact, IoIosLock } from "react-icons/io";
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
        emailState: ""
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
          emailState: ""
        }
      });
    }
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    //TODO:here goes the fetch and dispatch
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
  render() {
    return (
      <Container>
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
              <FormFeedback invalid>
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
          >
            Sign In
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(SignInForm);
