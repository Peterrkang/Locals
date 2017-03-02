import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class EventsList extends Component {

  renderEvents(){
    let events = {};
    if(this.props.onSearch.length > 0){
      Object.keys(this.props.events).map((event) => {
        if(this.props.events[event].title.toLowerCase().includes(this.props.onSearch)){
          events[event] = this.props.events[event]
        }
      });
    }else{
      events = this.props.events
    }

    return Object.keys(events).map((event)=>{
      return(
        <li
          onClick={()=>this.props.onClickEvent(events[event])}
          key={event}
          className="list-group-item"
        >
          {events[event].title}
        </li>
      );
    })
  }

  render(){
    return(
      <div className="col-lg-6">
        <ul className="list-group">
          {this.renderEvents()}
        </ul>
      </div>
    );
  }
}
