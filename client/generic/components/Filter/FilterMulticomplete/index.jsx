import React, {PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';
import dictionaries from 'generic/dictionaries';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

class FilterMulticomplete extends React.Component {
	constructor() {
		super();

		this.state = {
			operator   : '',
			data       : [],
			suggestions: [],
			value      : '',

			operators: [
				{id: 1, name: '',  value: ''},
				{id: 2, name: '=', value: '='},
				{id: 3, name: '≠', value: '!='}
			]
		};
	}

	static contextTypes = {
		onChange         : PropTypes.func.isRequired,
		passValueToParent: PropTypes.func.isRequired,
		reset            : PropTypes.func.isRequired
	}

	componentWillMount() {
		const
			hash = location.hash.substr(1),
			name = this.props.name,
			data = JSON.parse(hash ? hash : '{}')[name];

		if(hash && data)
			this.setState({
				data    : matchArrEqualObjProps(data.value, this.props.data),
				operator: data.operator
			});
	}

	onSelectChange = (e) => {
		const
			operator = e.target.value;

		this.setState({operator: operator});
		this.context.onChange(this.props.name, this.state.value, operator);

		this.context.passValueToParent(this.props.name, {
			value   : _.map(this.state.data, x => x.id),
			operator: operator
		});
	}

	reset = e => {
		this.context.reset(this.props.name);

		this.setState({
			operator: '',
			value   : '',
			data    : []
		});
	}

	onChange = (e, {newValue}) => {
		this.setState({value: newValue});
	}

	onDeleteItem = e => {
		e.preventDefault(e);

		const
			newData = _.filter(this.state.data, O => O.id !== parseInt(e.target.id));

		this.setState({data: newData});

		this.context.passValueToParent(e.target.name, {
			value   : _.map(newData, x => x.id),
			operator: this.state.operator
		});
	};

	onSuggestionsFetchRequested = ({value, reason}) => {
		this.setState({suggestions: _.filter(this.props.data, x => {
			return !_.includes(this.state.data, x);
		})});
	}

	onSuggestionsClearRequested = () => {
		this.setState({suggestions: []});
	};

	onSuggestionSelected = (e, {suggestion}) => {
		const
			newData = this.state.data;

		if(!_.some(this.state.data, {id: suggestion.id}))
			newData.push(suggestion);

		this.setState({
			data : newData,
			value: ''
		});

		this.context.passValueToParent(this.props.name, {
			value   : _.map(newData, x => x.id),
			operator: this.state.operator
		});
	}

	getSuggestionValue = suggestion => suggestion.name

	renderSuggestion = suggestion => (
		<span role="option">{suggestion.name}</span>
	)

	render() {
		const
			{operator, operators, data, suggestions, value} = this.state,

			{
				defaultErrorMessage = 'Это обязательное поле',
				disabled = false,
				items,
				name,
				placeholder,
				required = false,
				title,
				note
			} = this.props,

			inputProps = {
				name,
				onChange: this.onChange,
				value
			},

			tags = data ? data.map(item => {
				const
					{id, name, role} = item || {};

				return (<span className="tag input-tag" key={id}>
					<span>{name || role}</span>
						<a
							href="#"
							id={id}
							name={this.props.name}
							title="Remove tag"
							onClick={e => this.onDeleteItem(e)}
						>
							x
						</a>
				</span>)
			}) : null;

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

					<div className="tagsinput" >
						{tags}

						<Autosuggest
							getSuggestionValue={this.getSuggestionValue}
							inputProps={inputProps}
							onSuggestionsClearRequested={this.onSuggestionsClearRequested}
							onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
							onSuggestionSelected={this.onSuggestionSelected}
							renderSuggestion={this.renderSuggestion}
							alwaysRenderSuggestions={true}
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

export default FilterMulticomplete;
