//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//Components
import {
  ListGroupItem,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
//Actions
import Actions from "../../redux/actions";

class CreatePostForm extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
    this.handlePostContentChange = this.handlePostContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handlePostContentChange(event) {
    this.setState({ content: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch("/projects/posts/add", {
      method: "PUT",
      credentials: "same-origin",
      body: JSON.stringify({
        content: this.state.content,
        projectid: this.props.projectid
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.dispatch(Actions.AlertGlobal(res.message, "success"));
          this.setState({ content: "" });
          this.props.history.push(`/project/${this.props.projectid}`);
          this.props.refreshCB();
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
      <ListGroupItem>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="post" className="formLabel">
              Wrie A Post
            </Label>
            <InputGroup>
              <Input
                type="text"
                id="post"
                placeholder="Type a post ..."
                onChange={event => {
                  this.setState({
                    content: event.target.value
                  });
                }}
                value={this.state.content}
              />
              <InputGroupAddon addonType="prepend">
                <Button outline type="submit" color="primary">Post</Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Form>
      </ListGroupItem>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

let ConnectedCreatePostForm = connect(mapStateToProps)(CreatePostForm);

export default withRouter(ConnectedCreatePostForm);
