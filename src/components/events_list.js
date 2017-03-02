import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class EventsList extends Component {

  renderEvents(){
    return Object.keys(this.props.events).map((event)=>{
      return(
        <li
          onClick={()=>this.props.onClickEvent(this.props.events[event])}
          key={event}
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
