//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { IoIosPhonePortrait } from "react-icons/io";
//Actions
import Actions from "../../redux/actions";
//CSS
import "./ProjectsContainer.css";
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
  CardImgOverlay,
  Badge,
  Container,
  CardGroup
} from "reactstrap";

const CausesList = props => {
  if (props.causes.length < 1) return "";
  return props.causes.map((cause, index) => {
    return (
      <Badge key={index} color="secondary" className="causeBadge">
        #{cause.title}
      </Badge>
    );
  });
};

const DateText = props => {
  let one_day = 1000 * 60 * 60 * 24;
  let now = new Date();
  let startdate = new Date(props.StartDate);
  let enddate = new Date(props.EndDate);
  if (now.getTime() < startdate.getTime())
    return (
      <span>
        From:
        {` ${startdate.getFullYear()}/${startdate.getMonth() +
          1}/${startdate.getDate()} `}
        To:
        {` ${enddate.getFullYear()}/${enddate.getMonth() +
          1}/${enddate.getDate()} `}
        <br />
        <span className="text-muted">{`[${Math.ceil(
          new Date(startdate - now) / one_day
        )}   day${
          Math.ceil(new Date(startdate - now) / one_day) > 1 ? "s" : ""
        } to start]`}</span>
      </span>
    );
  let x = new Date(startdate - enddate);
  return <span>{x.getDay()}</span>;
};

const ProjectCard = props => {
  let project = props.project;
  return (
    <Card className="projectCard" onClick={props.linkFunction}>
      <CardHeader>
        <CardTitle>
          {project.title}
          <br />
          <CardText>
            <CausesList causes={project.causes} />
          </CardText>
          <CardSubtitle>
            <small className="text-muted">created by: {project.owner}</small>
          </CardSubtitle>
        </CardTitle>
        <CardImg
          style={{ width: "100%" }}
          src={project.image}
          alt={project.title}
        />
      </CardHeader>

      <CardBody className="projectCardDesc">
        <CardText>
          {" "}
          Participation:{" "}
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
          <DateText EndDate={project.enddate} StartDate={project.startdate} />
        </CardText>
        <Container>
          <CardText>
            <strong>Desc: </strong>
            {project.description.length > 25
              ? `${project.description.slice(0, 50)} ...`
              : project.description}
          </CardText>
        </Container>
      </CardBody>
    </Card>
  );
};

export class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  componentWillMount() {
    fetch("/projects", {
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.dispatch(Actions.SetGlobalProjects(res.Projects));
          this.setState({ loaded: true });
        } else {
          this.props.dispatch(Actions.AlertGlobal(res.message, "danger"));
        }
      })
      .catch(err => {
        this.props.dispatch(Actions.AlertGlobal(err, "danger"));
      });
  }
  render() {
    if (!this.state.loaded)
      return (
        <img
          src="./img/loading.gif"
          alt="loading"
          style={{ width: "200px", alignSelf: "center" }}
        />
      );
    return (
      <Container className="projectsContainer">
        {this.props.projects.map((project, index) => {
          return (
            <ProjectCard
              key={index}
              linkFunction={event => {
                event.preventDefault();
                this.props.history.push(`/project/${project._id}`);
              }}
              project={project}
            />
          );
        })}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { projects: state.projects };
};

let ConnectedProjectsContainer = connect(mapStateToProps)(ProjectsContainer);

export default withRouter(ConnectedProjectsContainer);
