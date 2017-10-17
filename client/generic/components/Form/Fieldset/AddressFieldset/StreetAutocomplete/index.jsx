import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectPlugin from 'react-select';
import fetchStreet from 'modules/property/address/street/actions/fetch';
import isEmpty from 'generic/helpers/isempty';
import dictionaries from 'generic/dictionaries';

class StreetAutocomplete extends React.Component{
	constructor() {
		super();

		this.state = {
			options: [],
			value  : null
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.received &&
				 nextProps.defaultValue) {
				this.setState({
						options : [nextProps.defaultValue],
						value   : nextProps.defaultValue.value,
						received: true,
				});
		}
		if (nextProps.disabled) {
				this.setState({
					options: [],
					value  : null
				})
		}
	}

	onChange = value => {
		if (isEmpty(value))
			value = null;
		this.setState({value: value && value.value});
		this.props.passValueToParent(this.props.name, value);
	}

	getOptions = input => {
		this.props.fetchStreet({city: this.props.cityId, street: input});

		return new Promise(
			(res, rej) => res(this.transformOptions(this.props.data.suggestions))
		)
		.then(data => {return {options: data}});

	}

	transformOptions(options) {
		let
			newOptions = [];

		options && options.map(O =>
			newOptions.push({
				label: O.data.street,
				value: O.data.street_fias_id
			})
		);

		return newOptions;
	}

	render() {
		const
			{clearable = false, disabled, defaultErrorMessage, name, placeholder, required, title} = this.props,
			{value, options} = this.state,
			error = this.props.errors[name];

		return (
			<div className="form-group">
				<label htmlFor={name}>
					{title}
					{required && <span className="text-danger">*</span>}
				</label>

				<SelectPlugin.Async
					cache={false}
					clearable={clearable}
					disabled={disabled}
					loadOptions={this.getOptions}
					name={name}
					onChange={this.onChange}
					onValueClick={this.onNewOptionClick}
					placeholder={placeholder || ''}
					searchable={true}
					options={disabled ? null : options}
					value={disabled ? null : value}
				/>

				<span
                    className="help-block has-error"
                    {...(error || '').length ? {} : {hidden: {}}}
                >
                    {dictionaries.form_errors[error] || defaultErrorMessage}
                </span>
			</div>
		);
	}
}

function mapStateToProps(state) {
	let
		street = state.property.address.street;

    return {
        data: street ? street.data : {}
    };
}

function mapDispatchToProps(dispatch) {
	return {
		fetchStreet: bindActionCreators(fetchStreet, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StreetAutocomplete);
