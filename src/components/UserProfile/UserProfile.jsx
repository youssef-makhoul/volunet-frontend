//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { IoIosMail, IoIosPhonePortrait, IoIosHome } from "react-icons/io";
//CSS
import "./UserProfile.css";
//Actions
import Actions from "../../redux/actions";
//Components
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardHeader,
  Badge,
  Container,
  ListGroup,
  ListGroupItem,
  UncontrolledCollapse,
  Collapse
} from "reactstrap";
import AddExperienceFrom from "../AddExperienceForm/AddExperienceForm";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {collapse:false};
    this.renderContactInfo = this.renderContactInfo.bind(this);
    this.renderCauses = this.renderCauses.bind(this);
    this.renderExperiences = this.renderExperiences.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.toggleExpCollapse = this.toggleExpCollapse.bind(this);
  }
  toggleExpCollapse() {
    this.setState({ collapse: !this.state.collapse });
  }
  updateUser() {
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
  renderContactInfo(phonenumber, email, address) {
    return (
      <div className="contactInfo">
        <Button
          color="primary"
          outline
          id="toggler"
          style={{ marginBottom: "1rem" }}
        >
          Contact Info
        </Button>
        <UncontrolledCollapse toggler="#toggler">
          <ListGroup>
            <ListGroupItem>
              <IoIosMail /> {email}
            </ListGroupItem>
            <ListGroupItem>
              <IoIosPhonePortrait /> {phonenumber}
            </ListGroupItem>
            {address === undefined ? (
              ""
            ) : (
              <ListGroupItem>
                <IoIosHome />{" "}
                {`${address.details}, ${address.city}, ${address.state}, ${
                  address.zip
                }`}
              </ListGroupItem>
            )}
          </ListGroup>
        </UncontrolledCollapse>
      </div>
    );
  }
  renderCauses(causes) {
    return (
      <Container className="profileCauses">
        {causes.map((cause, index) => {
          return (
            <Badge
              key={index}
              color="primary"
              className="causeBadge"
              style={{ marginLeft: "2.5px", marginRight: "2.5px" }}
            >
              #{cause.title}
            </Badge>
          );
        })}
        {"  "}
      </Container>
    );
  }
  getFormatedDate(datestring) {
    let date = new Date(Date.parse(datestring));
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}`;
  }
  renderExperiences(experiences) {
    return (
      <Container className="experiencesContainer">
        <ListGroup>
          Experience
          {experiences.map((experience, index) => {
            return (
              <ListGroupItem key={index} className="experiencesCard">
                <Card>
                  <CardHeader>
                    {this.props.canEdit ? (
                      <Button
                        close
                        onClick={() => {
                          fetch("/user/experiences/remove", {
                            credentials: "same-origin",
                            method: "DELETE",
                            body: JSON.stringify({
                              id: experience._id
                            })
                          })
                            .then(res => res.json())
                            .then(res => {
                              if (res.success) {
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
                      />
                    ) : (
                      ""
                    )}
                    <strong>{experience.title}</strong>
                    {experience.causes.map((cause, index) => {
                      return (
                        <Badge
                          key={index}
                          style={{ marginLeft: "2.5px", marginRight: "2.5px" }}
                          color="secondary"
                        >
                          #{cause.title}
                        </Badge>
                      );
                    })}
                  </CardHeader>
                  <CardBody>
                    {this.getFormatedDate(experience.startdate)} -{" "}
                    {this.getFormatedDate(experience.enddate)}
                  </CardBody>
                  <CardBody>
                    Summary:
                    <br />
                    {experience.description}
                  </CardBody>
                </Card>
              </ListGroupItem>
            );
          })}
          {this.props.canEdit ? (
            <ListGroupItem>
              <Button
                color="primary"
                id="toggler"
                onClick={this.toggleExpCollapse}
                style={{ marginBottom: "1rem" }}
              >
                Add Experience
              </Button>
              <Collapse isOpen={this.state.collapse}>
                <AddExperienceFrom toggle={this.toggleExpCollapse} experiences={experiences} />
              </Collapse>
            </ListGroupItem>
          ) : (
            ""
          )}
        </ListGroup>
      </Container>
    );
  }
  handleUpdateProfile(event) {
    event.preventDefault();
    this.props.history.push("/myprofile/update");
  }
  render() {
    if (!this.props.user) return <h1>Could Not Find User</h1>;
    let user = this.props.user;
    return (
      <div className="profile">
        <Card className="profileCard">
          <CardHeader className="profileHeader" color="primary">
            <CardImg
              top
              className="profileImage rounded-circle"
              src={user.image}
              alt="Card image cap"
            />
            {this.props.canEdit ? (
              <Button
                color="primary"
                outline
                onClick={this.handleUpdateProfile}
              >
                Edit Profile
              </Button>
            ) : (
              ""
            )}
          </CardHeader>
          <CardBody>
            <CardTitle className="profileName">{user.fullname} </CardTitle>
            <CardSubtitle>{this.renderCauses(user.causes)}</CardSubtitle>
            <br />
            {this.renderContactInfo(
              user.phonenumbers,
              user.username,
              user.address
            )}
            <br />
            <CardText>{user.summary}</CardText>
            {this.renderExperiences(user.experiences)}
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

let ConnectedUserProfile = connect(mapStateToProps)(UserProfile);

export default withRouter(ConnectedUserProfile);
