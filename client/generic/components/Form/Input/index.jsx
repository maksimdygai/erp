import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dictionaries from 'generic/dictionaries';

class Input extends React.Component{
	constructor() {
		super();

		this.state = {
			error       : false,
			errorMessage: '',
			value       : null
		};
	}

	static contextTypes = {
		errors  : PropTypes.object,
		isSent  : PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		router  : PropTypes.object.isRequired
	}

	componentWillMount() {
		this.setState({value: this.props.defaultValue});
	}

	componentWillUpdate(nextProps) {
		const
			newVal = nextProps.defaultValue;

		if(this.props.defaultValue !== newVal)
			this.setState({value: newVal});

		if(this.context.isSent)
			this.setState({value: ''});
	}

	onChange = e => {
		const
			{pattern, validations} = this.props;

		this.setState({value: e.target.value});
		this.context.onChange(e, validations, pattern);
	}

	render() {
		const
			{
				defaultValue,
				defaultErrorMessage = 'Заполните поле корректно',
				disabled,
				name,
				note,
				placeholder,
				required = false,
				title,
			} = this.props,

			errors = this.context ? this.context.errors : this.props.errors,
			error = errors[name];

		return (
			<div className="form-group">
				<label htmlFor={name} title={note || title}>
					{title}
					{required && <span className="text-danger">*</span>}
				</label>

				<input
					className="form-control"
					disabled={disabled}
					id={name}
					name={name}
					onChange={e => this.onChange(e)}
					placeholder={placeholder ? placeholder : title}
					type="text"
					value={this.state.value}
				></input>

				{error && <span
					className="help-block has-error"
					{...(error || '').length ? {} : {hidden: {}}}
					title={dictionaries.form_errors[error] || defaultErrorMessage}
				>
					{dictionaries.form_errors[error] || defaultErrorMessage}
				</span>}
			</div>
		);
	}
}

export default Input;
