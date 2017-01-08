import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChatRoom, addMessage } from '../actions'

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

  renderChat(){
    return Object.keys(this.props.messages).map((message)=>{
      const date = new Date(this.props.messages[message].created_at)
      return(
        <div key={message}>
          {this.props.messages[message].user_email}: {this.props.messages[message].content}
        </div>
      );
    });
  }


  render(){
    if(!this.props.messages){
      return <div>Loading Chat...</div>
    }
    return(
      <div>
        {this.renderChat()}

        <form onSubmit={this.onFormSubmit.bind(this)} className="input-group">
          <input className="form-control"
            value={this.state.message}
            onChange={this.onInputChange.bind(this)}
           />
          <button type="submit" className="btn btn-secondary">Send</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    messages: state.chat.messages,
    currentUser: state.chat.user
  };
}



export default connect(mapStateToProps, { fetchChatRoom, addMessage })(ChatRoom);
