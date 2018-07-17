import React, { Component } from 'react';
import axios from 'axios';

import apiRoutes from '../../../config/apiRoutes';


class Settings extends Component {
  componentDidMount = async () => {
    const config = {
      method: 'GET',
    };
    const res = await axios(apiRoutes.Wakatime.CurrentUserProjects, config);
    console.log(res.data);
  }

  render() {
    return (
      <div>Hello</div>
    );
  }
}

export default Settings;

