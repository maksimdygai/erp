import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePickerPlugin from 'react-datepicker';
import dictionaries from 'generic/dictionaries';

/*
	Usage

		* Only moment() date must be passed to Datepicker
*/

class Datepicker extends React.Component{
	constructor() {
		super();
		this.state = {operator: '', date: ''};
	}

	static contextTypes = {
		onChange: PropTypes.func.isRequired,
		reset   : PropTypes.func.isRequired
	}

	onChange = value => {
		this.setState({date: value});
		this.context.onChange(this.props.name, value.format(), this.state.operator);
	}

	onSelectChange = e => {
		const
			operator = e.target.value;

		this.setState({operator: operator});
		this.context.onChange(this.props.name, this.state.date.format(), operator);
	}

	reset = e => {
		this.context.reset(this.props.name);
		this.setState({operator: '', date: ''});
	}

	render() {
		const
			{name, operators, title} = this.props,
			{operator, date} = this.state;

		return (
			<div className="form-group filter-datepicker">
				<label htmlFor={name}>{title}</label>

				<div className="input-group">
					<div className="input-group-btn">
						{operators && (
							<select
								className="btn-default filter-select input-sm"
								onChange={e => this.onSelectChange(e)}
								value={operator}
							>
								{operators.map(O => (
									<option value={O.value} key={O.id}>{O.name}</option>
								))}
							</select>)
						}
					</div>

					<DatePickerPlugin selected={date} onChange={this.onChange}/>

					<div className="input-group-btn">
						<button
							className="btn btn-default input-sm"
							onClick={e => this.reset(e)}
							type="button"
						>
							<i className="fa fa-times"></i>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Datepicker;
