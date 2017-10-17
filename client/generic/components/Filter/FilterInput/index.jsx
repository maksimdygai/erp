import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dictionaries from 'generic/dictionaries';

class FilterInput extends React.Component{
	constructor() {
		super();
		this.state = {operator: '', value: ''};
	}

	static contextTypes = {
		onChange: PropTypes.func.isRequired,
		reset   : PropTypes.func.isRequired
	}

	componentWillMount() {
		const
			hash = location.hash.substr(1),
			name = this.props.name,
			data = JSON.parse(hash ? hash : '{}')[name];

		if(hash && data)
			this.setState({
				operator: data.operator,
				value   : data.value
			});
	}

	onInputChange = e => {
		const
			value = e.target.value;

		this.setState({value: value});
		this.context.onChange(e.target.name, value, this.state.operator);
	}

	onSelectChange = e => {
		const
			operator = e.target.value;

		this.setState({operator: operator});
		this.context.onChange(this.props.name, this.state.value, operator);
	}

	reset = e => {
		this.context.reset(this.props.name);
		this.setState({operator: '', value: ''});
	}

	render() {
		const
			{defaultValue, name, note, operators, title} = this.props,
			{operator, value} = this.state;

		return (
			<div className="form-group">
				<label htmlFor={name} title={note || title}>{title}</label>

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

					<input
						className="form-control input-sm"
						value={this.state.value}
						id={name}
						name={name}
						onChange={e => this.onInputChange(e)}
						type="text"
					></input>

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

export default FilterInput;
