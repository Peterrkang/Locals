import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class Event extends Component {
  render() {

    if(!this.props.activeEvent.title) {
      return <div>Select an event to get started.</div>;
    }else{
      return (
        <div>
          <div><h3>{this.props.activeEvent.title}</h3></div>
          <div>{this.props.activeEvent.description}</div>
          <div>{this.props.activeEvent.address}</div>
          <Link to={`/events/${this.props.activeEvent.id}/chatroom`} params={{id:this.props.activeEvent.id}}>
            Chat With Locals
          </Link>
        </div>
      );
    }
  }
}


function mapStateToProps(state) {
  return { activeEvent: state.activeEvent };
}

export default connect(mapStateToProps)(Event);
