import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions'


class ChatForm extends Component{

  constructor(props){
    super(props)
    this.state = { message: '' }
  }

  onFormSubmit(event){
    const chat = { message: this.state.message, id: this.props.id, user: this.props.user }
    this.props.addMessage(chat);
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



export default connect(null, { addMessage })(ChatForm);
