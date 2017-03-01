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
    this.props.openModal(event);
    this.setState({ showModal: true });
  }

  close(event){
    this.setState({ showModal: false });
  }

  renderLinks(){
    if(this.props.authenticated){
      return[
        <li className="nav-item" key={1}>
          <Link to="/events" className="navbar-brand">LocaLs</Link>
        </li>,
        <li className="nav-item" key={2}>
          <a href="#" className="glyphicon glyphicon-plus" onClick={this.open.bind(this)} />
        </li>,
        <li className="nav-item" key={3}>
          <Link to="/signout" className="glyphicon glyphicon-off" />
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
