import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';


class App extends Component {


  render() {
    let header;
    if(localStorage.getItem('user')){
      header = (<Header />)
    }
    return (
      <div>
        {header}
        {this.props.children}
      </div>
    );
  }
}



export default App
