//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//Components
import {
    Form,
    FormGroup,
    Input,
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

class AddExperienceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      startdate: "",
      enddate: "",
      causes: [],
      causesCollapse: false,
      allcauses: []
    };
    this.renderUserCausesList = this.renderUserCausesList.bind(this);
    this.renderCausesSubForm = this.renderCausesSubForm.bind(this);
    this.handleShowCausesCollapse = this.handleShowCausesCollapse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = this.updateUser.bind(this);
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
    fetch("/user/experiences/add", {
      credentials: "same-origin",
      method: "PUT",
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        startdate: this.state.startdate,
        enddate: this.state.enddate,
        causes: causes
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.dispatch(Actions.AlertGlobal(res.message, "success"));
          this.updateUser();
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
                placeholder="Title"
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
              <InputGroupAddon
                addonType="prepend"
                className="glyphicon glyphicon-star glyphicon glyphicon-star"
              >
                <InputGroupText>Description:</InputGroupText>
              </InputGroupAddon>
              <Input
                type="textarea"
                id="description"
                placeholder="Description"
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
          {this.renderCausesSubForm(this.state.causes)}
          <Button type="submit">Add</Button>
        </Form>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedAddExperienceForm = connect(mapStateToProps)(AddExperienceForm);

export default withRouter(ConnectedAddExperienceForm);
