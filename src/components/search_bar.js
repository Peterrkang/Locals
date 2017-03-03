import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
      <form className="form-group">
        <input className="form-control"
          value = {this.state.term}
          onChange = {event => this.onInputChange(event.target.value)}
          placeholder="Search Events"
        />
      </form>
    );
  };

  onInputChange(term){
    this.setState({term});
    this.props.onSearchTermChange(term);
    browserHistory.push('/events');
  }

};
