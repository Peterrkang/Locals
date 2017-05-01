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


  render(){
    if(!this.props.events){
      return <div> Loading Events Near You... </div>;
    }
    if(!this.props.lat || !this.props.lng){
      return <div> Loading Current Location....</div>;
    }
    return(
      <div className="events">
        <div className="container-fluid">
          <GoogleMaps
            onClickEvent={this.onClickEvent.bind(this)}
            lat={this.props.lat}
            lng={this.props.lng}
            markers={this.props.events}
            onSearch={this.props.search}
          />
        </div>
        <div clasName="container-fluid" id="events">
          <div className="row">
            <Event
              onSearch={this.props.search}
            />
            <EventsList
              onClickEvent={this.onClickEvent.bind(this)}
              events= {this.props.events}
              onSearch={this.props.search}
            />  
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
    lng: state.location.lng
  };
}


export default connect(mapStateToProps, actions)(Events);
