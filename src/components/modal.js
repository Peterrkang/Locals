import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { store } from '../index';
import { Provider } from 'react-redux';
import SignIn from './auth/signin';
import SignUp from './auth/signup';
import EventForm from './event_form';
import { connect } from 'react-redux';


class Modal extends Component {

  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'modal';
    document.addEventListener('click', this.handleClick, false);
    document.body.appendChild(this.modalTarget);
    this._render();
  }


  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  handleClick = (e) =>{
    if(!ReactDOM.findDOMNode(this.modalTarget).contains(e.target)){
      this.props.onClose()
    }
  }

  _render() {
    let specificModal;
    if(this.props.modal == 1){
      specificModal = (
        <EventForm onClose={this.props.onClose}/>
      )
    }else if(this.props.modal == 2){
      specificModal = (
        <SignIn onClose={this.props.onClose} />
      )
    }else if(this.props.modal == 3){
      specificModal = (
        <SignUp onClose={this.props.onClose}/>
      )
    }
    ReactDOM.render(
      <Provider store={store}>
        <div>{specificModal}</div>
      </Provider>,
      this.modalTarget
    );
  }

  render() {
    return <noscript />;
  }
}

function mapStateToProps(state){
  return{
    modal: state.modal
  }
}

export default connect(mapStateToProps)(Modal);
