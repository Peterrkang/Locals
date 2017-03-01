import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import  GoogleMaps from './google_map';
import Event from '../components/event';

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

  renderEvents() {
    return Object.keys(this.props.events).map((event)=>{
      return(
        <li
          onClick={()=>this.onClickEvent(this.props.events[event])}
          key={this.props.events[event].id}
          className="list-group-item"
        >
          {this.props.events[event].title}
        </li>
      );
    })
  }

  onClickEvent(event){
    this.props.selectEvent(event)
  }

  render(){
    debugger
    return(
      <div>
        <div id="map">
          <GoogleMaps
            onClickEvent={this.onClickEvent.bind(this)}
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
