import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { timestamp } from '../database';


class ChatForm extends Component{

  constructor(props){
    super(props)
    this.state = { message: '' }
  }

  onFormSubmit(event){
    const message = {
      message: this.state.message,
      eventId: this.props.eventId,
      user: this.props.user,
      created_at: timestamp
    }
    this.props.createMessage(message)
    this.setState({ message: '' });
  };

  onInputChange(event){
    this.setState({message: event.target.value })
  }

  render(){
    return(
      <div className="row">
        <form className="form-group" onSubmit={this.onFormSubmit.bind(this)}>
          <input className="form-control"
            placeholder="..."
            value={this.state.message}
            onChange={this.onInputChange.bind(this)}
            autoFocus
          />
        </form>
      </div>
    );
  }
}

export default connect(null, actions)(ChatForm);
