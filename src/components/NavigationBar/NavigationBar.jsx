//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { IoIosContact, IoIosSearch } from "react-icons/io";
//import { IoIosContact, IoIosLock } from "react-icons/io";
//Actions
import Actions from "../../redux/actions";
//Components
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Button
} from "reactstrap";
//CSS
import "./NavigationBar.css";

export class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      search: ""
    };

    this.toggle = this.toggle.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.updateProjects = this.updateProjects.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleSignOut() {
    fetch("/signout")
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.dispatch(Actions.SignOut());
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
  updateProjects(search) {
    fetch("/projects/search", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({ searchinput: search })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.dispatch(Actions.SetGlobalProjects(res.projects));
          this.setState({ search: "" });
        } else {
          this.props.dispatch(Actions.AlertGlobal(res.message, "danger"));
        }
      })
      .catch(err => {
        this.props.dispatch(Actions.AlertGlobal(err.message, "danger"));
      });
  }
  handleSearchSubmit(event) {
    event.preventDefault();
    this.updateProjects(this.state.search);
  }
  renderSearchBar() {
    return (
      <Form onSubmit={this.handleSearchSubmit} className="searchForm">
        <FormGroup>
          <InputGroup>
            <Input
              type="text"
              id="search"
              placeholder="Search Projects"
              onChange={event => {
                this.setState({
                  search: event.target.value
                });
              }}
              value={this.state.search}
            />
            <InputGroupAddon addonType="append" className="inputAddon">
              <Button type="submit" outline color="primary">
                {" "}
                <IoIosSearch />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
  render() {
    if (!this.props.authenticated) return null;
    return (
      <header>
        <Navbar color="light" light expand="md">
          <Button
            outline
            color="light"
            onClick={() => {
              this.props.history.push("/");
              this.updateProjects("");
            }}
          >
            <img src={"/img/logo.png"} className="App-logo" alt="logo" />
          </Button>
          {this.renderSearchBar()}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar className="navIcon">
                <DropdownToggle nav caret>
                  <IoIosContact className="profileIcon" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    onClick={() => {
                      this.props.history.push("/myprofile");
                    }}
                  >
                    My Profile
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.props.history.push("/");
                      this.updateProjects(this.props.me.fullname);
                    }}
                  >
                    My Projects
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.props.history.push("/project/create");
                    }}
                  >
                    Create Project
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.handleSignOut}>
                    Sign out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return { me: state.userprofile, authenticated: state.authenticated };
};

let ConnectedNavigationBar = connect(mapStateToProps)(NavigationBar);

export default withRouter(ConnectedNavigationBar);
