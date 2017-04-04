import React, { Component } from 'react';


export default class Messages extends Component {

  convertTime(date){
    const newDate = new Date(date)
    let convertedTime, minutes;
    if(newDate.getMinutes() < 10){
      minutes = ":0" + newDate.getMinutes()
    }else{
      minutes = ":" + newDate.getMinutes()
    }
    if(newDate.getHours() > 12){
      convertedTime = Math.abs(12 - newDate.getHours()) + minutes + "PM"
    }else{
      convertedTime = newDate.getHours() + minutes + "AM"
    }
    return convertedTime
  }

  renderChat(){
    return Object.keys(this.props.messages).map((message)=> {
      if(this.props.messages[message].user == this.props.currentUser){
        return (
          <li className="list-group-item self" id="chat" key={message}>
            <div className="msg">
              <p>
                <strong>{this.props.messages[message].user}</strong>: {this.props.messages[message].message}
                <br />
                <time>{this.convertTime(this.props.messages[message].created_at)}</time>
              </p>
            </div>
          </li>
        );
      }else{
        return (
          <li className="list-group-item other" id="chat" key={message}>
            <div className="msg">
              <p>
                <strong>{this.props.messages[message].user}</strong>: {this.props.messages[message].message}
                <br />
                <time>{this.convertTime(this.props.messages[message].created_at)}</time>
              </p>
            </div>
          </li>
        );
      }
    });
  }


  render(){

    if(!this.props.messages){
      return <div>Start Chatting...</div>;
    }
    return(
      <div className="messages">
        <ol className="list-group" id="chatList">
          {this.renderChat()}
        </ol>
      </div>

    );

  }

}
