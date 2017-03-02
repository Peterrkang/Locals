import React, { Component } from 'react'

export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
      <form className="navbar-form">
        <input className="search-bar"
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
  }

};
