//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
//CSS
import "./UpdateProfileFrom.css";
import "react-phone-number-input/style.css";
//Components
import {
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  FormText,
  Row,
  Col,
  Badge,
  Container
} from "reactstrap";

export class UpdateProfileFrom extends Component {
  constructor(props) {
    super(props);
    let user = props.user;
    this.state = {
      fullname: user.fullname,
      image: user.image,
      phonenumber: user.phonenumbers[0],
      address: user.address,
      causes: user.causes,
      experiences: user.experiences,
    };
    this.renderCausesSubForm = this.renderCausesSubForm.bind(this);
    this.renderUserCausesList = this.renderUserCausesList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch()
  }
  renderCausesSubForm(){

  }
  renderUserCausesList(causes){
    return (
      <Container>
        {causes.map((cause, index) => {
          return (
            <Badge key={index} color="primary">
              #{cause.title}
            </Badge>
          );
        })}
        {"  "}
      </Container>
    );
  }
  renderExperiencesSubForm(){}
  renderUserExperiencesList(){}
  render() {
    if (!this.props.user) return <h1>error</h1>;
    return (
      <div className="updateForm">
        <Form>
          {/* ---------- fullname ---------- */}
          <FormGroup>
            <Label for="fullname" className="formLabel">
              Full Name
            </Label>
            <Input
              type="text"
              id="fullname"
              placeholder="Full Name"
              onChange={this.handleChangeFullName}
              value={event => {
                this.setState({
                  fullname: event.target.value
                });
              }}
            />
          </FormGroup>
          {/* ---------- image ---------- */}
          <FormGroup>
            <Label for="image" className="formLabel">
              Profile Picture:
            </Label>
            <CustomInput
              type="file"
              name="imageFile"
              id="image"
              onChange={event => {
                this.setState({
                  image: event.target.value.replace(
                    "C:\\fakepath\\",
                    "./img/profile/"
                  )
                });
              }}
              label={this.state.image}
            />
            <FormText color="muted">
              here if you want to change your image
            </FormText>
          </FormGroup>
          {/* ---------- phonenumber ---------- */}
          <FormGroup>
            <Label for="phonenumber" className="formLabel">
              Phone Number:
            </Label>
            <PhoneInput
              id="phonenumber"
              placeholder="Enter phone number"
              value={this.state.phonenumber}
              onChange={value => this.setState({ phonenumber: value })}
            />
          </FormGroup>

          {/* ---------- address ---------- */}
          <Row form>
            <Col md={5}>
              <FormGroup>
                <Label for="exampleAddress" className="formLabel">
                  Address
                </Label>
                <Input
                  type="text"
                  name="address"
                  id="exampleAddress"
                  value={this.state.address.details}
                  onChange={event => {
                    this.setState({
                      address: {
                        ...this.state.address,
                        details: event.target.value
                      }
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleCity" className="formLabel">
                  City
                </Label>
                <Input
                  type="text"
                  name="city"
                  id="exampleCity"
                  value={this.state.address.city}
                  onChange={event => {
                    this.setState({
                      address: {
                        ...this.state.address,
                        city: event.target.value
                      }
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleState" className="formLabel">
                  State
                </Label>
                <Input
                  type="text"
                  name="state"
                  id="exampleState"
                  value={this.state.address.state}
                  onChange={event => {
                    this.setState({
                      address: {
                        ...this.state.address,
                        state: event.target.value
                      }
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleZip" className="formLabel">
                  Zip
                </Label>
                <Input
                  type="text"
                  name="zip"
                  id="exampleZip"
                  value={this.state.address.zip}
                  onChange={event => {
                    this.setState({
                      address: {
                        ...this.state.address,
                        zip: event.target.value
                      }
                    });
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          {/* ---------- causes ---------- */}
          {this.renderUserCausesList(this.state.causes)}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedUpdateProfileFrom = connect(mapStateToProps)(UpdateProfileFrom);

export default withRouter(ConnectedUpdateProfileFrom);
