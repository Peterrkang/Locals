import React, { Component } from 'react';
import SignUp from './auth/signup';
import SignIn from './auth/signin';
import NavBarSignIn from './auth/navbarsignin'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { browserHistory } from 'react-router';
import Events from './events'
import { Grid, Row, Col } from 'react-bootstrap';


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


  render(){
    return(
      <div id="home">
        <NavBarSignIn />
        <div>
          <h3 className="homeText">Bored? Want to mix it up today? Join Locals!</h3>
        </div>
        <video
          src="https://res.cloudinary.com/dlpclqzwk/video/upload/v1492461740/video_mn8b5p.mp4"
          loop autoPlay 
        />
        <Grid>
          <Row>
            <h3 className="homeText">Sign up here!</h3> 
          </Row>
          <Row>
            <Col md={6} mdOffset={3}>
              <SignUp />
            </Col>
          </Row> 
        </Grid>
        <footer className="homeText">
          <a href="http://www.linkedin.com/in/peterrkang"><img src="../../images/linkedin.png"/></a>
          <a href="http://www.github.com/peterrkang/Locals"><img src="../../images/github.png" /></a>
        </footer> 
      </div>
    );
  }
}

export default connect(null, actions)(Home);
