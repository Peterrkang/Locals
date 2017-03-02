import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GoogleMaps from './google_map';
import Event from '../components/event';
import EventsList from './events_list';
import _ from 'lodash';

class Events extends Component {

  constructor(props){
    super(props)
    this.state = {
      lat: '',
      lng: ''
    }
  }

  componentWillMount(){
    this.props.fetchEvents();
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.onPositionReceived.bind(this));
    }else{
      alert('No Geolocation Support')
    }
  }

  onPositionReceived(position){
    this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
  }

  onClickEvent(event){
    this.props.selectEvent(event);
  }


  render(){
    if(!this.state.lat || !this.state.lng){
      return <div> Loading Current Location....</div>;
    }
    if(!this.props.events){
      return <div> Loading Events Near You... </div>;
    }

    return(
      <div className="container">
        <div className="container-fluid" id="map">
          <GoogleMaps
            containerElement={<div style={{height: `100%`}}/>}
            onClickEvent={this.onClickEvent.bind(this)}
            lat={this.state.lat}
            lng={this.state.lng}
            markers={this.props.events}
            onSearch={this.props.search}
          />
        </div>
        <div clasName="container-fluid" id="events">
          <EventsList
            id="list"
            onClickEvent={this.onClickEvent.bind(this)}
            events= {this.props.events}
            onSearch={this.props.search}
          />
          <Event
            id="event"
            onSearch={this.props.search}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    events: state.events,
    search: state.search
  };
}


export default connect(mapStateToProps, actions)(Events);
