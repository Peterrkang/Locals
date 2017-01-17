import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SignIn from './auth/signin';
import SignUp from './auth/signup';
import Modal from './modal';
import EventForm from './event_form';



class Header extends Component {

  constructor(props){
    super(props);
    this.state = {modal: false, type: ''}
  }

  onClick(event){
    this.setState({modal: true, type: event.target.text})
  }

  renderLinks(){
    if(this.props.authenticated){
      return[
        <li className="nav-item" key={1}>
          <Link to="/signout" className="nav-link">Sign Out</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/events" className="nav-link">Events</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link to="/events/new" className="nav-link">Set Event</Link>
        </li>
      ];
    }else{
      return [
        <li className="nav-item" key={1}>
          <a href="#" className="nav-link" onClick={this.onClick.bind(this)}>Sign In</a>
        </li>,
        <li className="nav-item" key={2}>
          <a href="#" className="nav-link" onClick={this.onClick.bind(this)}>Sign Up</a>
        </li>
      ];
    }
  }



  render(){
    if(this.state.modal == true){
      let currModal;
      if(this.state.type == 'Sign In'){
        currModal = (
          <SignIn />
        )
      }else if(this.state.type == 'Sign Up'){
        currModal = (
          <SignUp />
        )
      }else if(this.state.type == 'Set Event'){
        currModal = (
          <EventForm />
        )
      }
      return(
        <div>
          <nav className="navbar navbar-light">
            <Link to="/" className="navbar-brand">LocaLs</Link>
            <ul className="nav navbar-nav">
              {this.renderLinks()}
            </ul>
          </nav>
          <Modal>
            { currModal }
          </Modal>
        </div>
      );
    }else{
      return(
        <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand">LocaLs</Link>
          <ul className="nav navbar-nav">
            {this.renderLinks()}
          </ul>
        </nav>
      );
    }
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  };
}




export default connect(mapStateToProps)(Header);
