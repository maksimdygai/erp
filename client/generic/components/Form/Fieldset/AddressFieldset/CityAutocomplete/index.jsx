import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectPlugin from 'react-select';
import fetchCity from 'modules/property/address/city/actions/fetch';
import dictionaries from 'generic/dictionaries';

class CityAutocomplete extends React.Component{
	constructor() {
		super();

		this.state = {
			options : [],
			value   : null,
			received: false
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
	}

	onChange = value => {
		this.setState({value: value.value});
		this.props.passValueToParent(this.props.name, Object.assign({}, value, {zoom: 12}));
	}

	getOptions = input => {
		this.props.fetchCity(input);

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
				label  : O.data.city,
				value  : O.data.city_fias_id
			})
		);

		return newOptions;
	}

	render() {
		const
			{clearable = false, defaultErrorMessage, name, placeholder, required, title} = this.props,
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
					loadOptions={this.getOptions}
					name={name}
					onChange={this.onChange}
					onValueClick={this.onNewOptionClick}
					placeholder={placeholder || ''}
					searchable={true}
					options={options}
					value={value}
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
		city = state.property.address.city;

    return {
        data: city ? city.data : {}
    };
}

function mapDispatchToProps(dispatch) {
	return {
		fetchCity: bindActionCreators(fetchCity, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CityAutocomplete);
