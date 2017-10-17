import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dictionaries from 'generic/dictionaries';

class FilterCheckbox extends React.Component{
	constructor() {
		super();
		this.state = {value: 0};
	}

	static contextTypes = {
		onChange: PropTypes.func.isRequired
	}

	componentWillMount() {
		const
			hash = location.hash.substr(1),
			name = this.props.name,
			data = JSON.parse(hash ? hash : '{}')[name];


		if(hash && data)
			this.setState({value: typeof data.value == 'object' ? 0 : data.value});
	}

	onInputChange = e => {
		const
			value = e.target.checked ? 1 : [0,2];

		this.setState({value: value});
		this.context.onChange(e.target.name, value, '=');
	}

	render() {
		const
			{name, note, title} = this.props,
			{value} = this.state;

		return (
			<div className="form-group">
				<label htmlFor={name} title={note || title}>{title}</label>

				<div className="checkbox">
					<label htmlFor={name}>
						<input
							id={name}
							name={name}
							onChange={e => this.onInputChange(e)}
							type="checkbox"
							defaultChecked={value}
						></input>
					</label>
				</div>
			</div>
		);
	}
}

export default FilterCheckbox;
