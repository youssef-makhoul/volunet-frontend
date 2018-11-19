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
  Container,
  Button,
  Collapse,
  Card,
  CardBody
} from "reactstrap";
//Actions
import Actions from "../../redux/actions";

export class UpdateProfileFrom extends Component {
  constructor(props) {
    super(props);
    let user = props.user;
    this.state = {
      allcauses: [],
      fullname: user.fullname,
      image: user.image,
      phonenumber: user.phonenumbers[0],
      address: user.address,
      causes: user.causes,
      experiences: user.experiences,
      causesCollapse: false
    };

    this.renderUserCausesList = this.renderUserCausesList.bind(this);
    this.renderCausesSubForm = this.renderCausesSubForm.bind(this);

    this.handleShowCausesCollapse = this.handleShowCausesCollapse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    //fetch();
  }

  renderUserCausesList(causes) {
    return causes.map((cause, index) => {
      return (
        <Button
          key={index}
          color="primary"
          size="sm"
          onClick={event => {
            event.preventDefault();
            fetch("/user/causes/remove", {
              credentials: "same-origin",
              method: "DELETE",
              body: JSON.stringify({ id: cause._id })
            })
              .then(res => res.json())
              .then(res => {
                if (res.success) {
                  causes.splice(index, 1);
                  this.setState({
                    causes: causes
                  });
                  this.props.dispatch(
                    Actions.AlertGlobal(res.message, "success")
                  );
                } else {
                  this.props.dispatch(
                    Actions.AlertGlobal(res.message, "danger")
                  );
                }
              })
              .catch(err => {
                this.props.dispatch(Actions.AlertGlobal(err.message, "danger"));
              });
          }}
        >
          #{cause.title}
        </Button>
      );
    });
  }
  handleShowCausesCollapse(event) {
    event.preventDefault();
    if (this.state.causesCollapse) {
      this.setState({ causesCollapse: false });
      return;
    }
    fetch("/causes", {
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({
            causesCollapse: true,
            allcauses: res.cuases
          });
        } else {
          this.props.dispatch(Actions.AlertGlobal(res.message, "danger"));
        }
      })
      .catch(err => {
        this.props.dispatch(Actions.AlertGlobal(err, "danger"));
      });
  }
  renderCausesSubForm(causes) {
    return (
      <Container>
        {" "}
        <FormGroup>
          Causes:{" "}
          {this.renderUserCausesList(causes)}
          <Button size="sm" onClick={this.handleShowCausesCollapse}>
            Add Cause
          </Button>
          <Collapse isOpen={this.state.causesCollapse}>
            <Card>
              <CardBody>
                {this.state.allcauses.map((cause, index) => (
                  <Button
                    key={index}
                    color="secondary"
                    size="sm"
                    onClick={event => {
                      event.preventDefault();
                      fetch("/user/causes/add", {
                        credentials: "same-origin",
                        method: "PUT",
                        body: JSON.stringify({ id: cause._id })
                      })
                        .then(res => res.json())
                        .then(res => {
                          causes = causes.concat(cause);
                          if (res.success) {
                            this.setState({
                              causes: causes,
                              causesCollapse: false
                            });
                            this.props.dispatch(
                              Actions.AlertGlobal(res.message, "success")
                            );
                          } else {
                            this.props.dispatch(
                              Actions.AlertGlobal(res.message, "danger")
                            );
                          }
                        })
                        .catch(err => {
                          this.props.dispatch(
                            Actions.AlertGlobal(err.message, "danger")
                          );
                        });
                    }}
                  >
                    #{cause.title}
                  </Button>
                ))}
              </CardBody>
            </Card>
          </Collapse>
        </FormGroup>
      </Container>
    );
  }
  renderExperiencesSubForm() {}
  renderUserExperiencesList() {}
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
              onChange={event => {
                this.setState({
                  fullname: event.target.value
                });
              }}
              value={this.state.fullname}
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
          {this.renderCausesSubForm(this.state.causes)}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedUpdateProfileFrom = connect(mapStateToProps)(UpdateProfileFrom);

export default withRouter(ConnectedUpdateProfileFrom);
