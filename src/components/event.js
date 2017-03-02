import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class Event extends Component {
  render() {

    if(!this.props.activeEvent.title) {
      return <div>Select an event to get started.</div>;
    }else{
      return (
        <div className="col-lg-6">
          <h3>{this.props.activeEvent.title}</h3>
          {this.props.activeEvent.description}
          <br />
          {this.props.activeEvent.address}
          <br />
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
