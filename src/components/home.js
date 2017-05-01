import React, { Component } from 'react';
import SignUp from './auth/signup';
import SignIn from './auth/signin';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { browserHistory } from 'react-router';

class Home extends Component{
  constructor(props){
    super(props);
    this.state = { account: false };
  }

  componentWillMount(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.props.fetchLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      },(error) => {
        alert("Unable to get your current location!");
      })
    }else {
      alert('No Geolocation Support!');
    }
    if(localStorage.getItem('user')){
      browserHistory.push('/events')
    }
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
      <div className="home">
        <div className="container-fluid">
          <span>
            <img className="frontLogo" src="../../images/HomeLogo.png"/>
            <h2>Locals</h2>
          </span>
          <div className="col-md-offset-2 col-sm-offset-1 row">
            <div className="col-xs-6 col-md-4" id="frontImg">
              <img src="../../images/FrontPage.png"/>
            </div>
            <div className="col-xs-6 col-md-4">
              {newUser}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Home);
