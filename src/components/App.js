import React, { Component } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config/constants';

class App extends Component {
  state = {
    status: '',
  }

  componentDidMount() {
    axios.get(BACKEND_URL).then((data) => {
      this.setState({
        status: data.data.status,
      });
    });
  }

  render() {
    return (
      <div>
        Status: {this.state.status}
      </div>
    );
  }
}

export default App;
