//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { IoIosPhonePortrait } from "react-icons/io";
//CSS
import "./UserProfile.css";
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
  Popover,
  PopoverHeader,
  PopoverBody,
  Badge,
  Container,
  ListGroup,
  ListGroupItem
} from "reactstrap";

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false
    };
    this.toggleContact = this.toggleContact.bind(this);
    this.renderContactInfo = this.renderContactInfo.bind(this);
    this.renderPhoneNumbers = this.renderPhoneNumbers.bind(this);
    this.renderCauses = this.renderCauses.bind(this);
    this.renderExperiences = this.renderExperiences.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }
  toggleContact() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  renderPhoneNumbers(phoneNumbers) {
    return (
      <Container className="profileCauses">
        {phoneNumbers.map((phoneNumber, index) => (
          <li key={index}> {phoneNumber} </li>
        ))}
      </Container>
    );
  }

  renderContactInfo(phonenumbers, email) {
    return (
      <div>
        <Button id="contactPopover" onClick={this.toggleContact}>
          <IoIosPhonePortrait />
        </Button>
        <Popover
          placement="right"
          isOpen={this.state.popoverOpen}
          target="contactPopover"
          toggle={this.toggle}
        >
          <PopoverHeader>Contact Info</PopoverHeader>
          {email}
          <PopoverBody>{this.renderPhoneNumbers(phonenumbers)}</PopoverBody>
        </Popover>
      </div>
    );
  }
  renderCauses(causes) {
    return (
      <Container className="profileCauses">
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
  getFormatedDate(datestring) {
    let date = new Date(Date.parse(datestring));
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}`;
  }
  renderExperiences(experiences) {
    return (
      <ListGroup>
        Experience
        {experiences.map((experience, index) => {
          return (
            <Container key={index}>
              <ListGroupItem >
                <Card>
                  <CardHeader>
                    <strong>{experience.title}</strong>
                    {experience.causes.map((cause, index) => {
                      return <Badge key={index}>#{cause.title}</Badge>;
                    })}
                  </CardHeader>
                  <CardBody>
                    {this.getFormatedDate(experience.startdate)} - {" "}
                    {this.getFormatedDate(experience.enddate)}
                  </CardBody>
                  <CardBody>Summary:<br/>{experience.description}</CardBody>
                </Card>
              </ListGroupItem>
            </Container>
          );
        })}
      </ListGroup>
    );
  }
  handleUpdateProfile(event){
    event.preventDefault();
    this.props.history.push("/myprofile/update");
  }
  render() {
    if (!this.props.user) return <h1>error</h1>;
    let user = this.props.user;
    return (
      <div className="profile">
        <Card className="profileCard">
          <CardHeader className="profileHeader" color="primary">
            <CardImg
              top
              className="profileImage"
              src={user.image}
              alt="Card image cap"
            />
            <Button color="primary" onClick={this.handleUpdateProfile}>Edit Profile</Button>
          </CardHeader>
          <CardBody>
            <CardTitle className="profileName">{user.fullname} </CardTitle>
            <CardSubtitle>{this.renderCauses(user.causes)}</CardSubtitle>
            <br />
            {this.renderContactInfo(user.phonenumbers, user.username)}
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
