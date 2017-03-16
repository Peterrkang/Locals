
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class SignOut extends Component {

  componentWillMount() {
    this.props.signOutUser();
  }

  render() {
    return (
      <div className="alert alert-success"> Successfully Logged Out! </div>
    )
  }

}




export default connect(null, actions)(SignOut);
