import React, {PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';
import getName from '../../../helpers/get-name';
import dictionaries from 'generic/dictionaries';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';
import isEmpty from 'generic/helpers/isempty';

const
	getSuggestions = (data, value) => {
		const
			inputValue = value ? value.trim().toLowerCase() : '',
			inputLength = inputValue.length;

		return inputLength === 0 ? data : data.filter(item =>
			item.first_name.toLowerCase().slice(0, inputLength) === inputValue
		);
	};

class FilterMulticontact extends React.Component {
	constructor() {
		super();

		this.state = {
			operator   : '',
			data       : [],
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
		onChange         : PropTypes.func.isRequired,
		passValueToParent: PropTypes.func.isRequired,
		reset            : PropTypes.func.isRequired
	}

	componentWillMount() {
		const
			hash = location.hash.substr(1),
			data = JSON.parse(hash ? hash : '{}')[this.props.name];

		if(data)
			this.setState({operator: data.operator});
	}

	componentWillUpdate(nextProps) {
		const
			hash    = location.hash.substr(1),
			data    = JSON.parse(hash ? hash : '{}')[this.props.name] || {},
			newData = nextProps.data;

		if(newData && this.props.data !== newData)
			this.setState({data: matchArrEqualObjProps(data.value, newData)});		
	}

	onSelectChange = e => {
		const
			operator = e.target.value;

		this.setState({operator: operator});
		this.context.onChange(this.props.name, this.state.value, operator);
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
		const
			suggestions = getSuggestions(this.props.data, value);

		this.setState({suggestions: _.filter(suggestions, x => {
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

	getSuggestionValue = suggestion => getName(suggestion)

	renderSuggestion = suggestion => (
		<span role="option">{getName(suggestion)}</span>
	)

	render() {
		const
			{
				defaultErrorMessage = 'Это обязательное поле',
				items,
				name,
				placeholder,
				required = false,
				title
			} = this.props,

			{operator, operators, data, suggestions, value} = this.state,

			inputProps = {
				name,
				onChange: this.onChange,
				value
			},

			tags = data.map(item => {
				const
					{id} = item,
					fullName = getName(item);

				return (<span className="tag input-tag" key={id}>
					<span title={fullName}>{fullName}</span>

					<a
						href="#"
						id={id}
						name={this.props.name}
						title="Remove tag"
						onClick={e => this.onDeleteItem(e)}
					>x</a>
				</span>)
			});

		return (
			<div className="form-group filter-multicomplete">
				<label htmlFor={name}>
					{title}
				</label>

				<div className="input-group">
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
							alwaysRenderSuggestions={true}
							getSuggestionValue={this.getSuggestionValue}
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

export default FilterMulticontact;
