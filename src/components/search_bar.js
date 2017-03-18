import React, { Component } from 'react';
import { browserHistory } from 'react-router';


export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  handleKeyPress(target) {
    if(target.charCode==13){
        target.preventDefault();
    }

  }

  render() {
    return (
        <input
          className="form-control"
          value = {this.state.term}
          onFocus = { () => {browserHistory.push('/events');} }
          onChange = {event => this.onInputChange(event.target.value)}
          placeholder="Search Events"
          onKeyPress = {target => this.handleKeyPress(target)}
        />

      );
  };

  onInputChange(term){
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

};
