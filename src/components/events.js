import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GoogleMaps from './google_map';
import Event from '../components/event';
import EventsList from './events_list';
import _ from 'lodash';
import { eventRef } from '../database';

class Events extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.fetchEvents();
  }

  componentWillUnmount(){
    eventRef.off();
  }

  onClickEvent(event){
    this.props.selectEvent(event);
  }

  _fetchLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.props.fetchLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      },(error) => {
        alert("Unable to get your current location!");
      })
    }else {
      alert('No Geolocation Support!');
    }
  }

  renderGoogleMaps(){
    return(
      <GoogleMaps
        onClickEvent={this.onClickEvent.bind(this)}
        lat={this.props.lat}
        lng={this.props.lng}
        markers={this.props.events}
        onSearch={this.props.search}
      />
    );
  }

  renderCurrentEvent(){
    return(
      <Event
        activeEvent={this.props.activeEvent}
        onSearch={this.props.search}
      />
    );
  }

  renderEventList(){
    return(
      <EventsList
        onClickEvent={this.onClickEvent.bind(this)}
        events= {this.props.events}
        onSearch={this.props.search}
      />
    );
  }

  render(){
    if(!this.props.events){
      return <div> Loading Events Near You...<img src="../../images/loading.gif"/> </div>;
    }
    if(!this.props.lat || !this.props.lng){
      this._fetchLocation();
      return <div> Loading Current Location....<img src="../../images/loading.gif"/></div>;
    }
    return(
      <div className="events">
        <div className="container-fluid">
          { this.renderGoogleMaps() }
        </div>
        <div clasName="container-fluid" id="events">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              { this.renderCurrentEvent() }
            </div>
            <div className="col-lg-6 col-md-6">
              { this.renderEventList() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    events: state.events,
    search: state.search,
    lat: state.location.lat,
    lng: state.location.lng,
    activeEvent: state.activeEvent
  };
}


export default connect(mapStateToProps, actions)(Events);
