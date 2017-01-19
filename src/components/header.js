import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from './modal';
import { openModal } from '../actions';




class Header extends Component {

  constructor(props){
    super(props);
    this.state = {showModal: false};
  }

  open(event){
    const target = event.target.text
    if(target == 'Create Event'){
      this.props.openModal(1);
    }else if(target == 'Sign In'){
      this.props.openModal(2);
    }else if(target == 'Sign Up'){
      this.props.openModal(3);
    }
    this.setState({ showModal: true });
  }

  close(event){
    this.setState({ showModal: false });
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
          <a href="#" className="nav-link" onClick={this.open.bind(this)}>Create Event</a>
        </li>
      ];
    }else{
      return [
        <li className="nav-item" key={1}>
          <a href="#" className="nav-link" onClick={this.open.bind(this)}>Sign In</a>
        </li>,
        <li className="nav-item" key={2}>
          <a href="#" className="nav-link" onClick={this.open.bind(this)}>Sign Up</a>
        </li>
      ];
    }
  }



  render(){
      let modal;
      if(this.state.showModal == true){
        modal = (
          <Modal onClose={this.close.bind(this)} />
        )
      }else{
        modal = (
          <noscript />
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
          {modal}
        </div>
      );
    }

}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  };
}


export default connect(mapStateToProps, { openModal })(Header);
