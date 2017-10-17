import React, {PropTypes} from 'react';
import RangePlugin from 'react-input-range';

class Range extends React.Component{
	constructor() {
		super();
		this.state = {value: 0};
	}

	static contextTypes = {
		errors           : PropTypes.object,
		onChange         : PropTypes.func.isRequired,
		passValueToParent: PropTypes.func.isRequired,
		router           : PropTypes.object.isRequired
	}

	componentWillMount() {
		this.setState({value: this.props.value});
	}

	componentWillUpdate(nextProps) {
		const
			newVal = nextProps.value;

		if(this.props.value !== newVal) {
			this.setState({value: newVal});
		}
	}

	onChange = value => {
		const
			newValue = value.value;

		this.setState({value: newValue});
		this.context.passValueToParent(this.props.name, newValue);
	}

	render() {
		const
			{maxValue, minValue, name, required, title = 'Диапазон'} = this.props,
			{value} = this.state;

		return (
			<div className="form-group">
				<label htmlFor={name} title={title}>
					{title}
					{required && <span className="text-danger">*</span>}
				</label>

				<RangePlugin
					maxValue={maxValue}
					minValue={minValue}
					value={value}
					onChange={value => this.onChange({value})}
				/>
			</div>
		);
	}
}

export default Range;
