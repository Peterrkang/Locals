import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChatRoom, addMessage } from '../actions';
import Messages from './messages';
import ChatForm from './chat_form';


class ChatRoom extends Component{

  componentWillMount(){
    this.props.fetchChatRoom(this.props.params.id);
  }

  onFormSubmit(event){
    const chat = { message: this.state.message, id: this.props.params.id, user: this.props.currentUser }
    this.props.addMessage(chat);
    this.setState({ message: '' });
  };


  render(){
    return(
      <div className="container-fluid">
        <h3>{this.props.title}</h3>
        <Messages messages={this.props.messages} currentUser={this.props.currentUser}/>
        <ChatForm id={this.props.params.id} user={this.props.currentUser} />
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



export default connect(mapStateToProps, { fetchChatRoom })(ChatRoom);
