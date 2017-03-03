import React, { Component } from 'react';
import SignUp from './auth/signup';
import SignIn from './auth/signin';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { browserHistory } from 'react-router';

class Home extends Component{

  componentWillMount(){
    if(this.props.authenticated){
      browserHistory.push('/events');
    }
  }

  constructor(props){
    super(props);
    this.state = { account: false };
  }

  accountState(event){
    if(this.state.account == true){
      this.setState({ account: false });
    }else{
      this.setState({ account: true });
    }
  }

  render(){
    let newUser;
    if(this.state.account == true){
      newUser = (
        <div className="col-lg-6" id="account">
          <SignIn />
          <h5 className="centered">Don't have an Account?
            <a href="#" onClick={this.accountState.bind(this)}> Sign Up</a>
          </h5>
        </div>
      )
    }else{
      newUser = (
          <div className="col-lg-6" id="account">
            <SignUp />
            <h5 className="centered">Have an Account?
              <a href="#" onClick={this.accountState.bind(this)}> Sign In</a>
            </h5>
          </div>
      )
    }

    return(
      <div>
          <h2>Locals</h2>
          <div className="container-fluid" id="home">
            <div className="row">
              <div className="col-lg-6" id="info" />
              {newUser}
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  };
}


export default connect(mapStateToProps, actions)(Home);
