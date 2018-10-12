import React, { Component } from 'react';
import './Thermostat.css';
import arc from './arc.svg';
import Roundy from './roundy/index';

class Thermostat extends Component {
  constructor() {
    super();
    this.state={readout: 60, readoutType: 60}

    this.handleChange = this.handleChange.bind(this);
    this.handleThermoChange = this.handleThermoChange.bind(this);
  };

  handleChange(event) {
  	let changeThreshold = 0;
    
    this.setState({readoutType: event.target.value});
    changeThreshold = event.target.value;
    if (changeThreshold > 59 && changeThreshold < 81) {this.setState({readout: event.target.value});}
  }

  handleThermoChange(value) {
    if (value > 80 || value < 60) {
  		if (value > 80) {
  			return;
  		} else if (value < 60) {
  			this.setState({readout: 60});
  		}
  	}
  	else if (value <= 80 && value >= 60) {
  		this.setState({readout: value});
  		this.setState({readoutType: value});
  	}
  }

  render() {
    return (
      <div className={'ThermostatWrapper'}>
	      <div className="Thermostat">
	      <img src={arc} alt={'arc'} className={'arc'}/>
	      <p className={'arcLimit'}>80 &deg;F</p>
		    <Roundy
			   id={'arc'}
			   value={this.state.readout}
			   min={60}
			   max={140}
			   step={1}
			   radius={155}
			   sliced={false}
			   strokeWidth={25} 
			   onChange={value => this.handleThermoChange(value)}
			   color='transparent'
			   bgColor='transparent'
			   overrideStyle={ 'position:absolute; top: 1.6%;'}/>
	        <div className="Temperature">
	          <div className="TemperatureReading">
	            <input id={"inputReadout"} className={"Readout"} value={this.state.readoutType} onChange={this.handleChange}/>
	            <p className="Scale">&deg;F</p>
	          </div>
	        </div>
	      </div>
      </div>
    );
  }
}

export default Thermostat;
