import React, { Component } from 'react';
import './Thermostat.css';
import arc from './arc.svg';
import Roundy from 'roundy';

class Thermostat extends Component {
  constructor() {
    super();
    this.state={readout: 60}

    this.handleChange = this.handleChange.bind(this);
    this.handleThermoChange = this.handleThermoChange.bind(this);
    this.handleStop = this.handleStop.bind(this);
  };

  handleChange(event) {
    this.setState({readout: event.target.value});
  }

  handleThermoChange(value) {
    if (value > 80 || value < 60) {
  		if (value > 80) {

  			let target = window.document.getElementById('arc');

  			let childTarget = target.children;

  			let clone = "<Roundy id={'arc'} value={this.state.readout} min={60} max={140} step={1} radius={155} sliced={false} strokeWidth={25} onChange={value => this.handleThermoChange(value)} color='transparent' bgColor='transparent'overrideStyle={ 'position:absolute; top: 1.6%;'}/>"

  			//childTarget[1].style.transform='rotate(-4deg)';

  			console.log(target);

  			setInterval(() => {this.setState({readout: 80});}, 100);
  			//setInterval(() => {target.replaceChild(clone, childTarget[1]);}, 100);

  		} else if (value < 60) {
  			this.setState({readout: 60});
  		}
  	}
  	else if (value <= 80 && value >= 60) {
  		this.setState({readout: value});
  	}
  }

  handleStop(e) {
  	console.log();
  }

  /*shouldComponentDidUpdate() {
  	
  	/* let target = window.document.getElementById('arc');

  	let childTarget = target.children;

  	console.log(childTarget[1]);

  	console.log(); 

  	let value = this.state.readout;

  	if (value > 79) {
  		//childTarget[1].style.transform='rotate(-4deg)';
  		this.setState({readout: 80});
  	}

  	/*let value = this.state.readout;

  	if (value > 80) {
  		this.setState({readout: 79});
  	} 
  } */

  render() {

  	/*onChange={value => this.setState({value})}
		   onAfterChange={(value, props) => ... } */

    return (
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
		   //onDrag={console.log(this.getInitialClientOffset())}
		   onChange={value => this.handleThermoChange(value)}
		   color='transparent'
		   bgColor='transparent'
		   overrideStyle={ 'position:absolute; top: 1.6%;'}
		/>
        <div className="Temperature">
          <div className="TemperatureReading">
            <input min="60" max="80" type="text" className="Readout" value={this.state.readout} onChange={this.handleChange}/>
            <p className="Scale">&deg;F</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Thermostat;
