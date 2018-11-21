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
  Input,
  CustomInput,
  Row,
  Col,
  Container,
  Button,
  Collapse,
  Card,
  CardBody,
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
//Actions
import Actions from "../../redux/actions";

export class UpdateProfileFrom extends Component {
  constructor(props) {
    super(props);
    let user = props.user;
    if(user.address===undefined)
      user.address={details:"",state:"",city:"",zip:""}
    this.state = {
      allcauses: [],
      image: user.image,
      phonenumber: user.phonenumbers[0],
      address: user.address,
      causes: user.causes,
      experiences: user.experiences,
      summary: user.summary,
      causesCollapse: false
    };

    this.renderUserCausesList = this.renderUserCausesList.bind(this);
    this.renderCausesSubForm = this.renderCausesSubForm.bind(this);
    this.handleShowCausesCollapse = this.handleShowCausesCollapse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  renderUserCausesList(causes) {
    return causes.map((cause, index) => {
      return (
        <Button
          key={index}
          color="primary"
          size="sm"
          style={{ marginLeft: "2.5px", marginRight: "2.5px" }}
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
                  this.updateUser();
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
        Causes: {this.renderUserCausesList(causes)}
        <Button size="sm" onClick={this.handleShowCausesCollapse}>
          Add Cause
        </Button>
        <Collapse isOpen={this.state.causesCollapse}>
          <Card>
            <CardBody>
              {this.state.allcauses.map((cause, index) => (
                <Button
                  key={index}
                  color="primary"
                  size="sm"
                  outline
                  id={"cause-" + index}
                  style={{ marginLeft: "2.5px", marginRight: "2.5px" }}
                  onClick={event => {
                    event.preventDefault();
                    fetch("/user/causes/add", {
                      credentials: "same-origin",
                      method: "PUT",
                      body: JSON.stringify({ id: cause._id })
                    })
                      .then(res => res.json())
                      .then(res => {
                        if (res.success) {
                          causes = causes.concat(cause);
                          this.setState({
                            causes: causes,
                            causesCollapse: false
                          });
                          this.props.dispatch(
                            Actions.AlertGlobal(res.message, "success")
                          );
                          this.updateUser();
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
                  <UncontrolledTooltip
                    placement="bottom"
                    target={"cause-" + index}
                  >
                    {cause.description}
                  </UncontrolledTooltip>
                </Button>
              ))}
            </CardBody>
          </Card>
        </Collapse>
      </Container>
    );
  }
  updateUser(){
    fetch("/user", {
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.dispatch(Actions.SignIn(res.user));
        }
      })
      .catch(err => {
        this.props.dispatch(
          Actions.AlertGlobal(
            "Could not Connect to server " + err.message,
            "danger"
          )
        );
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch("/user/update", {
      credentials: "same-origin",
      method: "PUT",
      body: JSON.stringify({
        address: this.state.address,
        phonenumbers: [this.state.phonenumber],
        image: this.state.image,
        summary: this.state.summary
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.dispatch(Actions.AlertGlobal(res.message, "success"));
          this.updateUser();
          this.props.history.push("/myprofile");
        } else {
          this.props.dispatch(Actions.AlertGlobal(res.message, "danger"));
        }
      })
      .catch(err => {
        this.props.dispatch(Actions.AlertGlobal(err.message, "danger"));
      });
  }
  render() {
    if (!this.props.user) return <h1>error</h1>;
    return (
      <div className="updateForm">
        <Form onSubmit={this.handleSubmit}>
          <h2>{this.props.user.fullname}</h2>
          <h3>{this.props.user.username}</h3>
          {/* ---------- image ---------- */}
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend" className="inputAddon">
                <InputGroupText>Image:</InputGroupText>
              </InputGroupAddon>
              <CustomInput
                type="file"
                name="imageFile"
                id="image"
                onChange={event => {
                  this.setState({
                    image: event.target.value.replace(
                      "C:\\fakepath\\",
                      "/img/profile/"
                    )
                  });
                }}
                label={this.state.image}
              />
            </InputGroup>
          </FormGroup>
          {/* ---------- phonenumber ---------- */}
          <FormGroup>
            <InputGroup>
              <PhoneInput
                id="phonenumber"
                placeholder="Enter phone number"
                value={this.state.phonenumber}
                onChange={value => this.setState({ phonenumber: value })}
              />
            </InputGroup>
          </FormGroup>
          {/* ---------- address ---------- */}
          <FormGroup>
            <Row form>
              {/* ---------- details ---------- */}
              <Col md={5}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend" className="inputAddon">
                    <InputGroupText>Address:</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="addressdetails"
                    placeholder=""
                    onChange={event => {
                      this.setState({
                        address: {
                          ...this.state.address,
                          details: event.target.value
                        }
                      });
                    }}
                    value={this.state.address.details}
                  />
                </InputGroup>
              </Col>
              {/* ---------- city ---------- */}
              <Col md={3}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend" className="inputAddon">
                    <InputGroupText>City:</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="city"
                    placeholder=""
                    onChange={event => {
                      this.setState({
                        address: {
                          ...this.state.address,
                          city: event.target.value
                        }
                      });
                    }}
                    value={this.state.address.city}
                  />
                </InputGroup>
              </Col>
              <Col md={2}>
                {/* ---------- state ---------- */}
                <InputGroup>
                  <InputGroupAddon addonType="prepend" className="inputAddon">
                    <InputGroupText>State:</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="state"
                    placeholder=""
                    onChange={event => {
                      this.setState({
                        address: {
                          ...this.state.address,
                          state: event.target.value
                        }
                      });
                    }}
                    value={this.state.address.state}
                  />
                </InputGroup>
              </Col>
              <Col md={2}>
                {/* ---------- zip ---------- */}
                <InputGroup>
                  <InputGroupAddon addonType="prepend" className="inputAddon">
                    <InputGroupText>Zip:</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    id="zip"
                    placeholder=""
                    onChange={event => {
                      this.setState({
                        address: {
                          ...this.state.address,
                          zip: event.target.value
                        }
                      });
                    }}
                    value={this.state.address.zip}
                  />
                </InputGroup>
              </Col>
            </Row>
          </FormGroup>
          {/* ---------- summary ---------- */}
          <FormGroup>
            <InputGroup>
              <InputGroupAddon
                addonType="prepend"
                className="glyphicon glyphicon-star"
              >
                <InputGroupText>Summary:</InputGroupText>
              </InputGroupAddon>
              <Input
                type="textarea"
                id="summary"
                placeholder="Tell people about your self"
                onChange={event => {
                  this.setState({
                    summary: event.target.value
                  });
                }}
                value={this.state.summary}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Button type="submit" color="primary">
              Update
            </Button>
          </FormGroup>
        </Form>
        {/* ---------- causes ---------- */}
        {this.renderCausesSubForm(this.state.causes)}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedUpdateProfileFrom = connect(mapStateToProps)(UpdateProfileFrom);

export default withRouter(ConnectedUpdateProfileFrom);
