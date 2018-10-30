import React, { Component } from 'react';
import '../css/movielisting.css';


class Layout extends Component 
{ 
	
	render() {
		return <div>
		<h2>Welcome, {this.props.name}</h2>
		<div className="well"> 
			<p>{this.props.message}</p>
		</div>
		</div>;
	}
}

export default Layout