import React, { Component } from 'react';
import { Link } from 'react-router';


class Event extends Component {

  render() {
    const values = Object.values(this.props.activeEvent)[0];
    const id = Object.keys(this.props.activeEvent)[0];
    if(!id) {
      return <div className="event"> Select an event to get started. </div>;
    }else{
      return (
        <div className="event">
          <h3>{values.title}</h3>
          {values.description}
          <br />
          {values.address}
          <br />
          <Link to={`/events/${id}`} params={{id: id}}>
            Chat With Locals
          </Link>
        </div>
      );
    }
  }

}



export default Event;
