import React, { Component } from 'react';
import { browserHistory } from 'react-router';


export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
        <input className="form-control"
          value = {this.state.term}
          onChange = {event => this.onInputChange(event.target.value)}
          placeholder="Search Events"
        />

      );
  };

  onInputChange(term){
    this.setState({term});
    this.props.onSearchTermChange(term);
    browserHistory.push('/events');
  }

};
