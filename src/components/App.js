import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    status: ''
  }

  componentDidMount() {
    axios.get('https://the-remotants-backend.herokuapp.com/test').then(data => {
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