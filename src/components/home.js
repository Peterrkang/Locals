import React, { Component } from 'react';
import SignUp from './auth/signup';
import SignIn from './auth/signin';

export default class Home extends Component{

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
        <div className="account">
          <SignIn />
          <h5 className="centered">Don't have an Account?
            <a href="#" onClick={this.accountState.bind(this)}> Sign Up</a>
          </h5>
        </div>
      )
    }else{
      newUser = (
          <div className="account">
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
          <div id="info" />
          {newUser}
      </div>
    );
  }
}
