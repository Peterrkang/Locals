import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import  GoogleMaps from './google_map';
import Event from './event';

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
    }
  }

  onPositionReceived(position){
    this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
  }

  renderEvents() {
    return Object.keys(this.props.events).map((event)=>{
      return(
        <li
          onClick={() => this.props.selectEvent(this.props.events[event])}
          key={this.props.events[event].id}
          className="list-group-item"
        >
          {this.props.events[event].title}
        </li>
      );
    })
  }

  render(){
    if(!this.state.lat || !this.state.lng){
      return <div> Loading Current Location....</div>;
    }
    if(!this.props.events){
      return <div> Loading Events Near You... </div>;
    }

    return(
      <div>
        <div id="map">
          <GoogleMaps
            lat={this.state.lat}
            lng={this.state.lng}
            markers={this.props.events}
          />
        </div>
        <ul className="list-group col-sm-4">
          {this.renderEvents()}
        </ul>
        <Event />
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    events: state.events
  };
}


export default connect(mapStateToProps, actions)(Events);
