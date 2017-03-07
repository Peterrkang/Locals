import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChatRoom, addMessage } from '../actions'
import Messages from './messages'

class ChatRoom extends Component{

  constructor(props){
    super(props)
    this.state = { message: '' }
  }

  componentWillMount(){
    this.props.fetchChatRoom(this.props.params.id);
  }

  onFormSubmit(event){
    const chat = { message: this.state.message, id: this.props.params.id, user: this.props.currentUser }
    this.props.addMessage(chat);
    this.setState({ message: '' });
  };

  onInputChange(event){
    this.setState({message: event.target.value })
  }

  render(){
    return(
      <div className="container-fluid">
        <h3>{this.props.title}</h3>
        <Messages messages={this.props.messages} currentUser={this.props.currentUser}/>
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

      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    messages: state.chat.messages,
    currentUser: state.chat.user,
    title: state.chat.title
  };
}



export default connect(mapStateToProps, { fetchChatRoom, addMessage })(ChatRoom);
