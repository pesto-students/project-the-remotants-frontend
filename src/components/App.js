import React, { Component } from 'react';
import axios from 'axios';
import { backend_url } from '../config/constants.js'

class App extends Component {
  state = {
    status: ''
  }

componentDidMount() {
  axios.get(backend_url).then(data => {
      this.setState(
        {
          status: data.data.status
        }
      );
    })
  }

  render() {
    return(
      <div>
        Status: {this.state.status}
      </div>
    );
  }
}

export default App;