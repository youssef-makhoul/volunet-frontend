//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//CSS
import "./CreateProjectForm.css";
import "react-phone-number-input/style.css";
//Components
import {
  Form,
  FormGroup,
  Input,
  CustomInput,
  Row,
  Col,
  Button,
  Collapse,
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledTooltip
} from "reactstrap";
//Actions
import Actions from "../../redux/actions";

export class CreateProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      startdate: "",
      enddate: "",
      deadline: "",
      peopleneeded: 0,
      address: {
        details: "",
        city: "",
        state: "",
        zip: ""
      },
      image: "",
      causes: [],
      causesCollapse: false,
      allcauses: []
    };

    this.renderUserCausesList = this.renderUserCausesList.bind(this);
    this.renderCausesSubForm = this.renderCausesSubForm.bind(this);

    this.handleShowCausesCollapse = this.handleShowCausesCollapse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
            let updatedCauses = [...this.state.causes];
            let index = updatedCauses.indexOf(cause);
            updatedCauses.splice(index, 1);
            this.setState({
              causes: updatedCauses
            });
          }}
          style={{ marginLeft: "2.5px", marginRight: "2.5px" }}
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
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend" className="inputAddon">
            <InputGroupText>
              Causes: {this.renderUserCausesList(causes)}
            </InputGroupText>
          </InputGroupAddon>
          <Button
            size="sm"
            onClick={this.handleShowCausesCollapse}
            color="primary"
            outline
          >
            Add Cause
          </Button>
          <Collapse isOpen={this.state.causesCollapse}>
            <Card>
              <CardBody>
                {this.state.allcauses.map((cause, index) => (
                  <Button
                    key={index}
                    id={"cause-" + index}
                    color="primary"
                    size="sm"
                    outline
                    onClick={event => {
                      event.preventDefault();
                      this.setState({
                        causes: this.state.causes.concat(cause),
                        causesCollapse: false
                      });
                    }}
                    style={{ marginLeft: "2.5px", marginRight: "2.5px" }}
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
        </InputGroup>
      </FormGroup>
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    let causes = this.state.causes.map(cause => cause._id);
    fetch("/projects/add", {
      credentials: "same-origin",
      method: "PUT",
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        startdate: this.state.startdate,
        enddate: this.state.enddate,
        deadline: this.state.deadline,
        peopleneeded: this.state.peopleneeded,
        address: this.state.address,
        image: this.state.image,
        causes: causes
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.dispatch(Actions.AlertGlobal(res.message, "success"));
        } else {
          this.props.dispatch(Actions.AlertGlobal(res.message, "danger"));
        }
      })
      .catch(err => {
        this.props.dispatch(Actions.AlertGlobal(err.message, "danger"));
      });
  }
  render() {
    return (
      <div className="updateForm">
        <Form onSubmit={this.handleSubmit}>
          {/* ---------- title ---------- */}
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend" className="inputAddon">
                <InputGroupText>Title:</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                id="title"
                placeholder="Project Title"
                onChange={event => {
                  this.setState({
                    title: event.target.value
                  });
                }}
                value={this.state.title}
              />
            </InputGroup>
          </FormGroup>
          {/* ---------- description ---------- */}
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend" className="glyphicon glyphicon-star glyphicon glyphicon-star">
                <InputGroupText>Description:</InputGroupText>
              </InputGroupAddon>
              <Input
                type="textarea"
                id="description"
                placeholder="Project Description"
                onChange={event => {
                  this.setState({
                    description: event.target.value
                  });
                }}
                value={this.state.description}
              />
            </InputGroup>
          </FormGroup>
          {/* ---------- startdate ---------- */}
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend" className="inputAddon">
                <InputGroupText>Start Date:</InputGroupText>
              </InputGroupAddon>
              <Input
                type="date"
                id="startdate"
                placeholder="date placeholder"
                onChange={event => {
                  this.setState({
                    startdate: event.target.value
                  });
                }}
                value={this.state.startdate}
              />
            </InputGroup>
          </FormGroup>
          {/* ---------- enddate ---------- */}
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend" className="inputAddon">
                <InputGroupText>End Date:</InputGroupText>
              </InputGroupAddon>
              <Input
                type="date"
                id="enddate"
                placeholder="date placeholder"
                onChange={event => {
                  this.setState({
                    enddate: event.target.value
                  });
                }}
                value={this.state.enddate}
              />
            </InputGroup>
          </FormGroup>
          {/* ---------- deadline ---------- */}
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend" className="inputAddon">
                <InputGroupText>Apply Deadline:</InputGroupText>
              </InputGroupAddon>
              <Input
                type="date"
                id="deadline"
                placeholder="date placeholder"
                onChange={event => {
                  this.setState({
                    deadline: event.target.value
                  });
                }}
                value={this.state.deadline}
              />
            </InputGroup>
          </FormGroup>
          {/* ---------- peopleneeded ---------- */}
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend" className="inputAddon">
                <InputGroupText>People Needed:</InputGroupText>
              </InputGroupAddon>
              <Input
                type="number"
                id="peopleneeded"
                placeholder="People Needed"
                onChange={event => {
                  this.setState({
                    peopleneeded: event.target.value
                  });
                }}
                value={this.state.peopleneeded}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            {/* ---------- address ---------- */}
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
                      "/img/projects/"
                    )
                  });
                }}
                label={this.state.image}
              />
            </InputGroup>
          </FormGroup>
          {this.renderCausesSubForm(this.state.causes)}
          <Button type="submit">Create Project</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedCreateProjectForm = connect(mapStateToProps)(CreateProjectForm);

export default withRouter(ConnectedCreateProjectForm);
