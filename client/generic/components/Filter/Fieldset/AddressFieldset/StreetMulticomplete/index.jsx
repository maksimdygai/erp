import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import fetchStreet from 'modules/property/address/street/actions/fetch';

class StreetMulticomplete extends React.Component {
	constructor() {
		super();

		this.state = {
			data       : [],
			fias_id    : '',
			operator   : '',
			suggestions: [],
			value      : '',

			operators  : [
				{id: 1, name: '',  value: ''},
				{id: 2, name: '=', value: '='},
				{id: 3, name: '≠', value: '!='}
			]
		};
	}

	static contextTypes = {
		onChange: PropTypes.func.isRequired,
		reset   : PropTypes.func.isRequired
	}

	onChange = (e, {newValue}) => {
		this.setState({value: newValue});
	}

	onSelectChange = e => {
		const
			operator = e.target.value;

		this.setState({operator: operator});
		this.context.onChange(this.props.name, this.state.fias_id, operator);
	}

	reset = e => {
		this.context.reset(this.props.name);

		this.setState({
			operator: '',
			value   : '',
			data    : []
		});
	}

	componentWillUpdate(nextProps) {
		const
			newItems = nextProps.items;

		if(newItems && this.props.items !== newItems) {
			this.setState({data: newItems});
		}
	}

	onSuggestionsFetchRequested = ({value, reason}) => {
    	this.props.fetchStreet({city: this.props.cityId, street: value});

		new Promise((res, rej) => res(this.transformOptions(this.props.data.suggestions)))
			.then(
				suggestions => {
					let
						values = [];

					_.map(this.state.data, street => values.push(street.value));

					_.map(
						suggestions,
						streets => streets.streets = _.filter(
							streets.streets, street => !_.includes(values, street.value)
						)
					);

					this.setState({suggestions: suggestions});
				},
				
				reject => this.setState({suggestions: []})
		);
	}

	transformOptions = (options) => {
		let
			newOptions = [],
    		counter    = 1;

		options && options.map(O =>
			newOptions.push({
				id   : counter++,
				name : O.data.street,
				value: O.data.street_fias_id
			})
		);

		return newOptions;
	}

	onSuggestionsClearRequested = () => {
		this.setState({suggestions: []});
	};

	onSuggestionSelected = (e, {suggestion}) => {
		const
			value = suggestion.value;

		this.setState({fias_id: value})
		this.context.onChange(this.props.name, value, this.state.operator);
		this.props.passToParent(this.props.name, value);
	}

	getSuggestionValue = suggestion => suggestion.name
	renderSuggestion = suggestion => (<span role="option">{suggestion.name}</span>)

	render() {
		const
			{operator, operators, data, suggestions, value} = this.state,

			{
				disabled = false,
				name,
				title,
				note
			} = this.props,

			inputProps = {
				name,
				onChange: this.onChange,
				value
			}

		return (
			<div className="form-group filter-multicomplete">
				<label htmlFor={name} title={note || title}>{title}</label>

				<div className="input-group" disabled={disabled}>
					<div className="input-group-btn">
						<select
							className="btn-default filter-select input-sm"
							onChange={e => this.onSelectChange(e)}
							value={operator}
						>
							{operators.map(O => (
								<option value={O.value} key={O.id}>{O.name}</option>
							))}
						</select>
					</div>

					<div className="filter-autocomplete">
						<Autosuggest
							getSuggestionValue={this.getSuggestionValue}
							getSectionSuggestions={this.getSectionSuggestions}
							inputProps={inputProps}
							onSuggestionsClearRequested={this.onSuggestionsClearRequested}
							onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
							onSuggestionSelected={this.onSuggestionSelected}
							renderSuggestion={this.renderSuggestion}
							suggestions={suggestions}
							items={data}
						/>
					</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(StreetMulticomplete);
