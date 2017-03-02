import React, { Component } from 'react';
import { connect } from 'react-redux';
import  GoogleMaps from './google_map';

export default class EventsList extends Component {

  renderEvents(){
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

  render(){
    return(
      <ul className="list-group col-sm-4">
        {this.renderEvents()}
      </ul>
    );
  }
}
