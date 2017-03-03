import React, { Component } from 'react';


export default class Messages extends Component {


  convertTime(date){
    let convertedTime, minutes;
    if(date.getMinutes() < 10){
      minutes = ":0" + date.getMinutes()
    }else{
      minutes = ":" + date.getMinutes()
    }
    if(date.getHours() > 12){
      convertedTime = Math.abs(12 - date.getHours()) + minutes + "PM"
    }else{
      convertedTime = date.getHours() + minutes + "AM"
    }
    return convertedTime
  }

  renderChat(){
    if(!this.props.messages){
      return <div>Start Chatting...</div>;
    }
    return Object.keys(this.props.messages).map((message)=>{
      let date = new Date(this.props.messages[message].created_at)
      if(this.props.messages[message].user_email == this.props.currentUser){
        return (
          <li className="list-group-item self" id="chat" key={message}>
            <div className="msg">
              <p>
                <strong>{this.props.messages[message].user_email}</strong>: {this.props.messages[message].content}
                <br />
                <time>{this.convertTime(date)}</time>
              </p>
            </div>
          </li>
        );
      }else{
        return (
          <li className="list-group-item other" id="chat" key={message}>
            <div className="msg">
              <p>
                <strong>{this.props.messages[message].user_email}</strong>: {this.props.messages[message].content}
                <br />
                <time>{this.convertTime(date)}</time>
              </p>
            </div>
          </li>
        );
      }
    });
  }


  render(){
    return(
      <ol
        className="list-group"
        id="chatList"
      >
        {this.renderChat()}
      </ol>
    );
  }


}
