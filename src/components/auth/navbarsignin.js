'use strict';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


class NavBarSignIn extends Component {

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  onClick(){
    let signUp = document.getElementsByClassName("login-form")[0]
    signUp.scrollIntoView();
  }

  renderAlert(){
    if (this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      <Navbar>
        <Navbar.Header pullLeft>
          <Navbar.Brand>
            <span><img src="../../images/Logo.jpg" /></span> | LocaLs
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Text pullRight>
          <Navbar.Link onClick={this.onClick.bind(this)}>
            Don't have an Account?
          </Navbar.Link>
        </Navbar.Text>
        <Navbar.Form pullRight>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
              <label>Email:</label>
              <input {...email} className="form-control" />
            </fieldset>
            <fieldset className="form-group">
              <label>Password:</label>
              <input {...password} type="password" className="form-control" />
            </fieldset>
            { this.renderAlert() }
            <button action="submit" className="btn btn-primary">Sign in</button>
          </form>
        </Navbar.Form>
      </Navbar>
    );
  }
}


function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}


export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(NavBarSignIn);
