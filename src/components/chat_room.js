import React, { Component } from 'react';
import Messages from './messages';
import ChatForm from './chat_form';
import { database } from '../database';
import { connect } from 'react-redux';
import { fetchChatRoom } from '../actions';



class ChatRoom extends Component{

  componentWillMount(){
    this.props.fetchChatRoom(this.props.params.id);
  }

  componentWillUnmount(){
    database.ref('messages').off();
  }

  render(){
    const user = localStorage.getItem('user');
    return(
      <div className="container-fluid">
        <Messages messages={this.props.chat} currentUser={user}/>
        <ChatForm eventId={this.props.params.id} user={user} />
      </div>
    );
  }
}

function mapStateToProps({ chat }){
  return { chat };
}


export default connect(mapStateToProps, { fetchChatRoom })(ChatRoom);
