//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//CSS
import "./ProjectDetailsCard.css";
//Components
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardHeader,
  Badge,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledCollapse
} from "reactstrap";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
//Actions
import Actions from "../../redux/actions";

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
  let startdate = new Date(props.StartDate);
  let enddate = new Date(props.EndDate);
  let deadline = new Date(props.DeadLine);
  return (
    <span>
      Starts on:
      {` ${startdate.getFullYear()}/${startdate.getMonth() +
        1}/${startdate.getDate()} `}
      Ends at:
      {` ${enddate.getFullYear()}/${enddate.getMonth() +
        1}/${enddate.getDate()} `}
      Deadline to Participate:
      {` ${deadline.getFullYear()}/${deadline.getMonth() +
        1}/${deadline.getDate()} `}
      <br />
    </span>
  );
};

const PostsListGroup = props => {
  let posts = props.posts;
  let projectid = props.projectid;
  return (
    <ListGroup className={props.className}>
      {posts.map((post, index) => {
        let postTime = new Date(post.timestamp);
        return (
          <ListGroupItem key={index}>
            <ListGroupItemHeading>
              <Button
                color="link"
                onClick={() => props.userLinkFunc(post.user._id)}
              >
                {post.user.fullname}
              </Button>{" "}
              <small className="text-muted" style={{ fontSize: "1.5vmin" }}>
                {` ${postTime.getFullYear()}/${postTime.getMonth() +
                  1}/${postTime.getDate()}
              -${postTime.getHours()}:${postTime.getMinutes()} `}
              </small>
            </ListGroupItemHeading>
            <ListGroupItemText>{post.content}</ListGroupItemText>
          </ListGroupItem>
        );
      })}
      <CreatePostForm projectid={projectid} refreshCB={props.refreshCB} />
    </ListGroup>
  );
};

class ProjectDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      project: undefined,
      followed: false,
      followButtonDisabled: false,
      myproject: false,
      showModal: false
    };
    this.refreshProject = this.refreshProject.bind(this);
    this.followProject = this.followProject.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.renderDeleteProject = this.renderDeleteProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  deleteProject() {
    this.toggleModal();
    fetch("/projects/remove", {
      method: "DELETE",
      credentials: "same-origin",
      body: JSON.stringify({
        id: this.state.project._id
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.dispatch(Actions.AlertGlobal(res.message, "success"));
          this.props.history.push("/");
        } else {
          this.props.dispatch(Actions.AlertGlobal(res.message, "danger"));
        }
      })
      .catch(err => {
        this.props.dispatch(Actions.AlertGlobal(err.message, "danger"));
      });
  }
  renderDeleteProject() {
    return (
      <div style={{ display: "inline" }}>
        <Button
          color="danger"
          size="sm"
          style={{ marginLeft: "10px" }}
          onClick={this.toggleModal}
        >
          Delete Project
        </Button>
        <Modal
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
          color="danger"
          outline
        >
          <ModalHeader toggle={this.toggleModal}>Delete Project</ModalHeader>
          <ModalBody>Are you sure you want to delete the project</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.deleteProject}>
              Yes, I am sure
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  refreshProject() {
    fetch(`/projects/${this.props.Project}`, {
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          let myproject = res.project.owner._id === this.props.user._id;
          let found = res.project.followers.find(follower => {
            return follower._id === this.props.user._id;
          });
          let participationClosed =
            res.project.followers.length >= res.project.peopleneeded;
          if (found === undefined) {
            this.setState({
              project: res.project,
              loaded: true,
              followed: false,
              followButtonDisabled: participationClosed,
              myproject: myproject
            });
          } else {
            this.setState({
              project: res.project,
              loaded: true,
              followed: true,
              followButtonDisabled: false,
              myproject: myproject
            });
          }
          document.title = "Volunet | " + this.state.project.title;
        } else {
          this.props.dispatch(Actions.AlertGlobal(res.message, "danger"));
          this.props.history.push("/");
        }
      })
      .catch(err => {
        this.props.dispatch(Actions.AlertGlobal(err, "danger"));
      });
  }
  followProject(event) {
    event.preventDefault();
    if (!this.state.followed)
      fetch(`/projects/follow/${this.state.project._id}`, {
        credentials: "same-origin",
        method: "PUT"
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            this.setState({ followed: true });
            this.props.dispatch(Actions.AlertGlobal(res.message, "success"));
            this.refreshProject();
          } else {
            this.setState({ followed: false });
            this.props.dispatch(Actions.AlertGlobal(res.message, "danger"));
          }
        })
        .catch(err => {
          this.setState({ followed: false });
          this.props.dispatch(Actions.AlertGlobal(err.message, "danger"));
        });
    else
      fetch(`/projects/unfollow/${this.state.project._id}`, {
        credentials: "same-origin",
        method: "DELETE"
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            this.setState({ followed: false });
            this.props.dispatch(Actions.AlertGlobal(res.message, "success"));
            this.refreshProject();
          } else {
            this.setState({ followed: true });
            this.props.dispatch(Actions.AlertGlobal(res.message, "danger"));
          }
        })
        .catch(err => {
          this.setState({ followed: true });
          this.props.dispatch(Actions.AlertGlobal(err.message, "danger"));
        });
  }
  componentWillMount() {
    this.refreshProject();
  }
  render() {
    if (!this.state.loaded)
      return (
        <img src="/img/loading.gif" alt="loading" className="loadingGif" />
      );
    let project = this.state.project;
    return (
      <Container className="projectContainer">
        <Card className="projectCardDetais" onClick={this.props.linkFunction}>
          <CardHeader className="cardHeader">
            <CardTitle className="cardTitle">
              {project.title}{" "}
              <Button
                outline
                size="sm"
                onClick={this.followProject}
                color={this.state.followed ? "danger" : "success"}
                disabled={this.state.followButtonDisabled}
              >
                {this.state.followed ? "Observe" : "Participate"}
              </Button>
              {this.state.myproject ? this.renderDeleteProject() : ""}
              <CardText>
                <CausesList causes={project.causes} />
              </CardText>
              <span className="text-muted small">created by:</span>
              <Button
                size="sm"
                className="text-muted"
                color="link"
                onClick={event => {
                  event.preventDefault();
                  this.props.history.push("/user/" + project.owner._id);
                }}
              >
                {project.owner.fullname}
              </Button>
            </CardTitle>
            <CardImg
              className="projectImage"
              src={project.image}
              alt={project.title}
            />
          </CardHeader>
          <CardBody className="projectCardDesc">
            <CardText>
              {" "}
              Participation:{" "}
              <Badge
                id="participants"
                color={
                  project.peopleneeded === project.followers.length
                    ? "danger"
                    : "success"
                }
              >
                {project.followers.length} / {project.peopleneeded}
              </Badge>
              <UncontrolledCollapse toggler="#participants">
                <Card>
                  <CardBody>
                    {project.followers.map(item => {
                      return (
                        <span>
                          <Button
                            color="link"
                            onClick={() => {
                              this.props.history.push(`/user/${item._id}`);
                            }}
                            style={{ marginRight: "15px" }}
                          >
                            {item.fullname}
                          </Button>
                        </span>
                      );
                    })}
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
              <br />
              <DateText
                EndDate={project.enddate}
                StartDate={project.startdate}
                DeadLine={project.deadline}
              />
            </CardText>
            <Container>
              <CardText>{project.description}</CardText>
            </Container>
          </CardBody>
        </Card>
        <PostsListGroup
          className="postsList"
          posts={project.posts}
          projectid={project._id}
          refreshCB={this.refreshProject}
          userLinkFunc={id => {
            this.props.history.push(`/user/${id}`);
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userprofile };
};

let ConnectedProjectDetailsCard = connect(mapStateToProps)(ProjectDetailsCard);

export default withRouter(ConnectedProjectDetailsCard);
