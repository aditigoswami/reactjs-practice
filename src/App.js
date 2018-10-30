import React, { Component } from 'react';

import './css/App.css';
import './css/bootstrap.min.css';

import Theatre from './components/Theatre';

// alreadyselected is array with seats previously selected. In read world this should be intialized by calling a theatre api. 
// Here i have hardcoded it.
// Theatre assumes that the theatre seating is rectangular in shape. 
// rows,cols are the number of rows and columns in the theatre
// numbertoselect is the number of seats which we want to select from the widget.

class App extends Component {
  render() {
	  var alreadyselected = [2, 3, 9];
    return (
		<div>
		<Theatre rows="10" cols="7"  numbertoselect="2" alreadyselected = {alreadyselected} />
		</div>
    );
  }
}

export default App;
