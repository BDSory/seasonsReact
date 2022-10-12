//https://stackoverflow.com/questions/54086244/semantic-ui-react-style-not-loaded
//if semantic still not loading, do link above
import './style/App.css';
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

  renderContent () {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }
    if(!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat = {this.state.lat} />
    }
    return <Spinner message= "Awaiting your location..."/>;
  }

  render() {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    )
  }
}

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App />);