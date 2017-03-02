import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';


class App extends Component {
  render() {
    let header;
    if(this.props.authenticated){
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

function mapStateToProps(state){
  return{
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, null)(App)
