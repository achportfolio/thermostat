import React, { Component } from 'react';
import './Thermostat.css';

class Thermostat extends Component {
  constructor() {
    super();
    this.state={readout: 75,}

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event) {
    this.setState({readout: event.target.value});
  }

  render() {
    return (
      <div className="Thermostat">
        <input name="slider" type="range" min="1" max="100" value="50" className="TemperatureSlider"/>
        <div className="Temperature">
          <div className="TemperatureReading">
            <input type="text" className="Readout" value={this.state.readout} onChange={this.handleChange}/>
            <p className="Scale">&deg;F</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Thermostat;
