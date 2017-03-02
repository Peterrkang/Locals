import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from './modal';
import * as actions from '../actions';
import SearchBar from './search_bar';



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

  eventSearch(term) {
    this.props.searchEvents(term);
  }

  renderLinks(){
      if(this.props.authenticated){
        return(
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li className="nav-item" key={1}>
                  <Link to="/events" className="navbar-brand">LocaLs</Link>
                </li>
                <li className="nav-item" key={2}>
                  <a href="#" className="glyphicon glyphicon-plus" onClick={this.open.bind(this)} />
                </li>
                <li className="navbar-form" key={3}>
                  <SearchBar onSearchTermChange={this.eventSearch.bind(this)} />
                </li>
                <li className="nav-item" key={4}>
                  <Link to="/signout" className="glyphicon glyphicon-off" />
                </li>
              </ul>
            </div>
          </nav>
        );
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
            {this.renderLinks()}
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


export default connect(mapStateToProps, actions)(Header);
