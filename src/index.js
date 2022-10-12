//https://stackoverflow.com/questions/54086244/semantic-ui-react-style-not-loaded
//if semantic still not loading, do link above

import React from 'react';
//import  ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  state = {lat : null, errorMessage : ''};

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({lat: position.coords.latitude}),
      err => this.setState({errorMessage: err.message})
    );
  }

//below is 'conditional rendering'; simplest version
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }
    if(!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat = {this.state.lat} />
    }
    return <Spinner />;
  }
}

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App />);