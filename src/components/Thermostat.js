import React, { Component } from 'react';
import './Thermostat.css';
import Roundy from 'roundy';

class Thermostat extends Component {
  constructor() {
    super();
    this.state={readout: 75, value: 75}

    this.handleChange = this.handleChange.bind(this);
  };

  componentDidMount() {
  }

  handleChange(event) {
    this.setState({readout: event.target.value});
  }

  render() {

  	//<input onChange={this.handleChange} id="slider" name="slider" type="range" min="1" max="100" className="TemperatureSlider"/>

  	/*onChange={value => this.setState({value})}
		   onAfterChange={(value, props) => ... } */

    return (
      <div className="Thermostat">
	    <Roundy
		   value={this.state.readout}
		   min={0}
		   max={100}
		   step={1}
		   radius={155}
		   sliced={false}
		   strokeWidth={25}
		   onChange={value => this.setState({readout: value})}
		   color='#8c8c8c'
		   bgColor='#cdcdcd'
		   overrideStyle={ 'position:absolute; top: 1.6%;'}
		/>
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
