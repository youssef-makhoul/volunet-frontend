//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//CSS
import "./ProjectCard.css";
//Components
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Badge,
  Container,
  UncontrolledTooltip
} from "reactstrap";

const CausesList = props => {
  if (props.causes.length < 1) return "";
  return props.causes.map((cause, index) => {
    return (
      <Badge
        key={index}
        id={"cause-" + index}
        color="primary"
        className="causeBadge"
      >
        #{cause.title}
        <UncontrolledTooltip placement="bottom" target={"cause-" + index}>
          {cause.description}
        </UncontrolledTooltip>
      </Badge>
    );
  });
};

const DateText = props => {
  let one_day = 1000 * 60 * 60 * 24;
  let now = new Date();
  let startdate = new Date(props.StartDate);
  let enddate = new Date(props.EndDate);
  let deadline = new Date(props.DeadLine);
  let daysToStart = Math.ceil(new Date(startdate - now) / one_day);
  let daysToApply = Math.ceil(new Date(deadline - now) / one_day);
  let duration = Math.ceil(new Date(enddate - startdate) / one_day);

  let startStatus = "";
  if (daysToStart <= 0) {
    startStatus = <span className="text-muted">Happening Now</span>;
  } else {
    switch (daysToStart) {
      case 1:
        startStatus = <span className="text-muted">Starts Tomorrow</span>;
        break;
      default:
        startStatus = (
          <span className="text-muted">
            starts in {daysToStart} day{daysToStart > 1 ? "s" : ""}
          </span>
        );
        break;
    }
  }
  let deadlineStatus = "";
  if (daysToApply < 0) {
    deadlineStatus = <span className="text-muted">Participation Closed</span>;
  } else {
    switch (daysToApply) {
      case 0:
        deadlineStatus = <span className="text-muted">Paritcipate Today</span>;
        break;
      case 1:
        deadlineStatus = <span className="text-muted">Deadline Tomorrow</span>;
        break;
      default:
        deadlineStatus = (
          <span className="text-muted">{daysToApply} days to deadline</span>
        );
        break;
    }
  }
  let durationStatus = (
    <span className="text-muted">
      duration ({duration} day{duration > 1 ? "s" : ""})
    </span>
  );

  let statusMessage = (
    <span>
      {startStatus}
      {" / "}
      {durationStatus}
      {" / "}
      {deadlineStatus}
    </span>
  );
  return (
    <span>
      {/* From:
      {` ${startdate.getFullYear()}/${startdate.getMonth() +
        1}/${startdate.getDate()} `}
      To:
      {` ${enddate.getFullYear()}/${enddate.getMonth() +
        1}/${enddate.getDate()} `}
      Deadline to Participate:
      {` ${deadline.getFullYear()}/${deadline.getMonth() +
        1}/${deadline.getDate()} `}
      <br /> */}
      {statusMessage}
      <br />
    </span>
  );
};

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let project = this.props.project;
    return (
      <Card className="projectCard" onClick={this.props.linkFunction}  color="background">
        <CardHeader>
          <CardTitle>
            {project.title}
            <br />
            <CardText>
              <CausesList causes={project.causes} />
            </CardText>
          </CardTitle>
          <CardSubtitle>
            <small className="text-muted" style={{marginTop:"10px",marginBottom:"100px"}}>by: {project.owner.fullname}</small>
          </CardSubtitle>
          <CardImg
            style={{ width: "100%",padding:"10px" }}
            src={project.image}
            alt={project.title}
            className="rounded"
          />
        </CardHeader>

        <CardBody className="projectCardDesc">
          <CardText>
            {" "}
            <strong>Participants:</strong>{" "}
            <Badge
              color={
                project.peopleneeded === project.followers.length
                  ? "danger"
                  : "success"
              }
            >
              {project.followers.length} / {project.peopleneeded}
            </Badge>
            <br />
            <DateText
              EndDate={project.enddate}
              StartDate={project.startdate}
              DeadLine={project.deadline}
            />
          </CardText>
            <CardText>
              {project.description.length > 25
                ? `${project.description.slice(0, 50)} ...`
                : project.description}
            </CardText>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

let ConnectedProjectCard = connect(mapStateToProps)(ProjectCard);

export default withRouter(ConnectedProjectCard);
