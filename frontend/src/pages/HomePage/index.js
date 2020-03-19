import React, { Component } from 'react';
import { withRouter }       from 'react-router';
import Navigation           from '../../components/Navigation';

class Index extends Component {

  render () {
    return (
      <>
        <h1>Home Page!</h1>
        <Navigation/>
      </>
    );
  }
}

export default withRouter( Index );