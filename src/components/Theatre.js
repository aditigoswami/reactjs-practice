import React, { Component } from 'react';
import Layout from './Layout'; // sets the welcome message on screen 
import '../css/theatre.css';

		
class Legend extends Component 
{
	render() {
		return <table><tbody>
		<tr>
			<td><span className="smallBox legendSelected">Selected Seat</span></td>
			<td><span className="smallBox legendEmpty">Empty Seat</span></td>
		</tr>
		</tbody></table>;
	}
}

class TheatreSeat extends Component 
{
	constructor(props) {
		super(props);
		this.index = this.props.id;
		
	}
	
	render() {	
	
		var disabled = null;
		
		if(this.props.val === this.props.markReservedSeats) {
			disabled = true;
		}
		
		if( (this.props.dcount === true && this.props.val === null) ){
			disabled = true;
		}		
		
		if(this.props.val === true) {
			disabled = false;
		} 
		
		if(this.props.val === false ) {
			disabled = this.props.dcount;
		} 
		
		if(this.props.bookedseat === true) {
			
			return <td><label className="seatContainer">
			<input type="checkbox" className="reserved" value={this.index} id={this.index} checked={this.props.val} disabled={true} onChange={() => this.props.onChange(this.index)}/>
			<span className={this.props.stl}></span>
			</label></td>;
	
		}  else {	
			return <td><label className="seatContainer">
			<input type="checkbox" className="seats" value={this.index} id={this.index} checked={this.props.val} disabled={disabled} onChange={() => this.props.onChange(this.index)}/>
			<span className="checkmark"></span>
			</label>
			</td>;
	
		}
		}
}

class TheatreRow extends Component 
{
	constructor(props) {
		super(props);
		
		this.label = this.props.label;
		this.rowindex = this.props.rowid;
		this.numCols = this.props.cols;
		this.numRows = this.props.rows;
		this.checked = this.props.val;
	}
	
	render() {
		
		var cols = Array.from(Array(Number.parseInt(this.props.cols) ).keys());
		
		var tdStyle = {
			marginTop: "35px"
		};
			
		return  <tr>
		<td style={tdStyle}>{this.label}</td>
		
		{
			cols.map ((i) => {
				if(this.checked[i + this.rowindex * this.numCols ] === this.props.markReservedSeats)
				{

					return <TheatreSeat key={i}  label={this.label + i} id={this.label + i} 
					dcount={this.props.dcount} val={this.checked[i + this.rowindex * this.numCols ]}
					bookedseat={true} onChange={() => this.props.onChange(i + this.rowindex * this.numCols)} stl="nocheckmark" markReservedSeats={this.props.markReservedSeats}/>; 
				}
				else 
				{
					return <TheatreSeat key={i}  label={this.label + i} id={this.label + i} 
					dcount={this.props.dcount} val={this.checked[i + this.rowindex * this.numCols ]}
				bookedseat={false} onChange={() => this.props.onChange(i + this.rowindex * this.numCols)} stl={this.props.stl} markReservedSeats={this.props.markReservedSeats} />; }
				}
			)
		}
		</tr>;
	}
}

class Theatre extends Component 
{
	constructor(props) {
		super(props);

		this.state = {
			checked: Array(this.props.rows * this.props.cols ).fill(null),
			displaySeats: false,
		};
		
		this.numberToSelect = this.props.numbertoselect;
		this.alreadySelected = this.props.alreadyselected;	
		this.selectedSeats = [];
		this.letters = (() => {
			const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
			return caps;
		})();
		this.markReservedSeats = "2"; //To diffrentiate between empty seats state. 
	}
	

	
	componentDidMount() {
		var checked = this.state.checked;
		var index;
		
		for (index in this.alreadySelected)
			checked[this.alreadySelected[index ] - 1] = this.markReservedSeats;
		
		this.setState({checked: checked});
	}
	
	getSeatName(index) {
		//floor is required as javascript does not support integer division
		var row = this.letters[ Math.floor(index / this.props.cols) ];
		// adding 1 to change from zero based index of array to seat number
		var col = index - Math.floor(index / this.props.cols) * this.props.cols + 1;
		return row+col;
	}
	
	isSuccessfullySelected() {
		this.selectedSeats =  this.state.checked.reduce( (out, bool, index) => (bool === true) ? out.concat(index) : out, [])	
		if(this.selectedSeats.length === Number.parseInt(this.numberToSelect)) return true;
		
		return false;
	}
	
	getSeatsSelected(){
		if(this.state.displaySeats === true) {
			var seatsName = this.selectedSeats.map((ele, index) => {return this.getSeatName(ele);});
			alert("Seats are " + seatsName);
		}
	}
	
	handleChange(index)
	{
		const checked = this.state.checked;
		if(checked[index] === this.markReservedSeats) return;
		checked[index] = !checked[index];
		
		if(this.isSuccessfullySelected() === true) {
			this.setState({displaySeats: true, checked: checked});
		} else {
			this.setState({checked: checked,displaySeats: false });
		}
	}
	
	render() {
		const { checked } = this.state;
		const checkedCount = Object.keys(checked).filter(key => (checked[key] === true)).length;	
		const disabled = checkedCount === Number.parseInt(this.numberToSelect);

		let colspan = Number.parseInt(this.props.cols) + 2;
		
		var row = Array.from(Array(Number.parseInt(this.props.cols) + 1 ).keys());
		var rowarray = Array.from(Array(Number.parseInt(this.props.rows)).keys());
		
		var btStyle = (this.isSuccessfullySelected() === false)?"btn disabled": "btn active";
		var btText = (this.isSuccessfullySelected() === false)?"Select " + this.numberToSelect + " seats!": "Check your seats";
		
		
		return <div align="center">
		<Layout name="Aditi Goswami" message="Hurry up and select the best possible seats for the movie of your choice." />
		
		<table id="seatsBlock" cellPadding="5">
		<tbody>
		<tr>
			<td colSpan={colspan}><div className="screen">SCREEN</div></td>
		</tr>
		<tr>
		{
			row.map((index) => 
				<td key={index}> {( index === 0 )? ' ': index} </td>
			)
		}
		</tr>
		{
			rowarray.map ((i) =>
				<TheatreRow key={i} label={this.letters[i]} dcount={disabled}
				rowid={i} rows={this.props.rows} cols={this.props.cols}
				val={this.state.checked} onChange={this.handleChange.bind(this)} stl="seats" markReservedSeats={this.markReservedSeats}/>
			)
		}
		</tbody></table>
		<br />
		<Legend />
		<br />
		<button onClick={() => this.getSeatsSelected()} className={btStyle} >{btText}</button><br/>
		</div>;
	}
}
export default Theatre