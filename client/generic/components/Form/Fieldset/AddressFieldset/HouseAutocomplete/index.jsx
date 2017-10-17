import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectPlugin from 'react-select';
import fetchHouse from 'modules/property/address/house/actions/fetch';
import dictionaries from 'generic/dictionaries';

class HouseAutocomplete extends React.Component{
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
		this.setState({value: value.value});
		this.props.passValueToParent(this.props.name, Object.assign({}, value, {zoom: 14}));
		this.props.passValueToParent('house_number', {value: value.label});
	}

	getOptions = input => {
		this.props.fetchHouse({street: this.props.streetId, house: input});

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
				geo_lat: O.data.geo_lat,
				geo_lon: O.data.geo_lon,
				label  : O.data.house,
				value  : O.data.house_fias_id
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
		house = state.property.address.house;

    return {
        data: house ? house.data : {}
    };
}

function mapDispatchToProps(dispatch) {
	return {
		fetchHouse: bindActionCreators(fetchHouse, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseAutocomplete);
