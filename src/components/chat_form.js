import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timestamp, database } from '../database';


class ChatForm extends Component{

  constructor(props){
    super(props)
    this.state = { message: '' }
  }

  onFormSubmit(event){
    event.preventDefault();
    const newMessageKey = database.ref('messages').push().key;
    database.ref('messages/' + newMessageKey).set({
      message: this.state.message,
      eventId: this.props.eventId,
      user: this.props.user,
      created_at: timestamp });
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

export default ChatForm;
