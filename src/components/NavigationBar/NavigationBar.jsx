//Modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { IoIosContact, IoIosSearch } from "react-icons/io";
//import { IoIosContact, IoIosLock } from "react-icons/io";
//Actions
import actions from "../../redux/actions";
//Components
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
//CSS
import "./NavigationBar.css";

export class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
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
          this.props.dispatch(actions.SignOut());
        }
      })
      .catch(err => {
        this.props.dispatch(
          actions.AlertGlobal(
            "Could not Connect to server " + err.message,
            "danger"
          )
        );
      });
  }
  render() {
    if (!this.props.authenticated) return null;
    return (
      <header>
        <Navbar color="light" light expand="md">
          <Link to="/">
            <img src={"./img/logo.png"} className="App-logo" alt="logo" />
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/projects/search">
                  <IoIosSearch />
                  search
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <IoIosContact className="profileIcon" />
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/myprofile">
                    <DropdownItem>Your profile</DropdownItem>
                  </Link>
                  <Link to="/myprojects">
                    <DropdownItem>Your projects</DropdownItem>
                  </Link>
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
  return { authenticated: state.authenticated };
};

let ConnectedNavigationBar = connect(mapStateToProps)(NavigationBar);

export default withRouter(ConnectedNavigationBar);
