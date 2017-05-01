import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from './modal';
import * as actions from '../actions';
import SearchBar from './search_bar';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';



class Header extends Component {

  constructor(props){
    super(props);
    this.state = { showModal: false };
  }

  open(event){
    this.props.openModal(event);
    this.setState({ showModal: true });
  }

  close(event){
    this.setState({ showModal: false });
  }

  eventSearch(term) {
    this.props.searchEvents(term);
  }

  renderLinks(){
    return(
        <Navbar fluid>
          <Navbar.Header>
            <LinkContainer to="/events">
              <Navbar.Brand>
                <span><img src="../../images/Logo.jpg" /></span> | LocaLs
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <Navbar.Form>
                <div className="input-group">
                  <span className="input-group-addon"><span className="glyphicon glyphicon-search"/> </span>
                  <SearchBar onSearchTermChange={this.eventSearch.bind(this)} />
                  <span className="input-group-addon"><a href="#" className="glyphicon glyphicon-plus" onClick={this.open.bind(this)} onClose={this.close.bind(this)} /></span>
                </div>
              </Navbar.Form>
            </Nav>
            <Nav pullRight>
              <NavItem>
                <LinkContainer to="/signout">
                  <img src="../../images/exitDoor.jpg" />
                </LinkContainer>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

  render(){
    return(
      <div>
        {this.renderLinks()}
        {this.state.showModal == true ? (
          <Modal onClose={this.close.bind(this)} />
        ):(
          <noscript />
        )}
      </div>
      );
    }
}

export default connect(null, actions)(Header);
