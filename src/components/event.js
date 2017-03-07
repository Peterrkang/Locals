import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class Event extends Component {

  render() {
    const values = Object.values(this.props.activeEvent)[0];
    const id = Object.keys(this.props.activeEvent)[0];
    if(!id) {
      return <div>Select an event to get started.</div>;
    }else{
      const values = Object.values(this.props.activeEvent)[0];
      const id = parseInt(Object.keys(this.props.activeEvent)[0]);
      return (
        <div className="col-lg-6">
          <h3>{values.title}</h3>
          {values.description}
          <br />
          {values.address}
          <br />
          <Link to={`/events/${id}/chatroom`} params={{id: id}}>
            Chat With Locals
          </Link>
        </div>
      );
    }
  }
}


function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent
  };
}

export default connect(mapStateToProps)(Event);
