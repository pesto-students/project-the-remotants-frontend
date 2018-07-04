import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        Hey Remotant, welcome!
        <Link to="/auth">
          Get Started
        </Link>
      </div>
    );
  }
}

export default Home;
