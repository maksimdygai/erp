import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import ContactField from 'generic/components/Form/ContactField';
import fetchClients from 'modules/clients/actions/fetch.js';
import postClient from 'modules/clients/actions/post.js';
import getName from 'generic/helpers/get-name';
import dictionaries from 'generic/dictionaries';

const
		getSuggestions = (data, value) => {
				const
						inputValue = value ? value.trim().toLowerCase() : '',
						inputLength = inputValue.length;

				return inputLength === 0 ? data : data.filter(item =>
						item.first_name.toLowerCase().slice(0, inputLength) === inputValue
				);
		};

class ClientPicker extends React.Component {
	constructor() {
		super();

		this.state = {
			data       : [],
			suggestions: [],
			value      : '',
			lastAdded  : ''
		};
	}

	static contextTypes = {
		onChange         : PropTypes.func.isRequired,
		passValueToParent: PropTypes.func.isRequired
	}

	componentWillMount() {
		this.props.fetchClients();
	}

	componentWillReceiveProps(nextProps) {
		const
			newItems = nextProps.items,
			newData = nextProps.data,
			{items, name} = this.props;

		if (newItems && !items && newData) {
			this.setState({data: _.map(newData, C => _.find(newItems, I => I.id == C.id))});

			this.context.passValueToParent(
				name,
				_.map(newData, C => {return {id: C.id}})
			);
		}

		if (newItems && items && items.length < newItems.length) {
			let
				data = this.state.data;
				
			const
				lastAdded = _.find(_.slice(newItems, newItems.length - 5), C =>
					(_.lowerCase(C.first_name)+_.lowerCase(C.last_name)) == this.state.lastAdded);

			if (lastAdded) {
				data.push(lastAdded);
		
				this.setState({
					data     : data,
					lastAdded: ''
				})
			}
		}
	}

	onChange = (e, {newValue}) => {
		this.setState({value: newValue});
	}

	onSuggestionsFetchRequested = ({value, reason}) => {
		const
			suggestions = getSuggestions(this.props.items, value);

		this.setState({suggestions: _.filter(suggestions, S => {
			return !_.find(this.state.data, I => S.id == I.id);
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

		this.context.passValueToParent(
			this.props.name,
			_.map(newData, C => {return {id: C.id}})
		);
	}

	onDeleteItem = (e, id) => {
		e.preventDefault(e);

		const
			newData = _.filter(this.state.data, O => O.id != id);

		this.setState({data: newData});

		this.context.passValueToParent(
			this.props.name,
			_.map(newData, C => {return {id: C.id}})
		);
	};

	getSuggestionValue = suggestion => getName(suggestion)

	renderSuggestion = suggestion => (
		<span role="option">{getName(suggestion)}</span>
	)

	post = data => {
		this.props.postClient(data, true);
		this.props.fetchClients();
		this.setState({
			addContact: false,
			lastAdded : _.lowerCase(data.first_name) + _.lowerCase(data.last_name)
		});
	}

	add = e => {
		e.preventDefault(e);
		this.setState({addContact: true});
	}

	cancel = e => {
		e.preventDefault(e);
		this.setState({addContact: false});
	}

		render() {
			const
				{
					items,
					name,
					placeholder = "Укажите клиента",
					postClient
				} = this.props,

				{data, suggestions, value, addContact} = this.state,

				inputProps = {
					name,
					onChange: this.onChange,
					value,
					placeholder
				};

			return (
				<div className="container-fluid">
					<table className="table table-borderless table-striped">
						{data.length > 0 &&
							<thead>
									<tr>
										<th>ФИО</th>
										<th>email</th>
										<th>Телефон</th>
										<th style={{width: '110px'}} className="text-center">Удалить</th>
									</tr>
							</thead>
						}

						<tbody>
							{_.map(data, item => (
								<tr>
									<td>{getName(item)}</td>
									<td>{item.email}</td>
									<td>{item.mobile_phone}</td>
									<td className="text-center">
										<button className="btn btn-xs btn-danger" onClick={e => this.onDeleteItem(e, item.id)} title="Удалить">
											<i className="fa fa-times"></i>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

						{addContact ?
						(<div className="container-fluid"><Form
							data={{}}
							isQuick={false}
							cancel={this.cancel}
							new={true}
							post={this.post}
							schema={{
									email: 'isEmail',
									first_name: 'isLength:1',
									last_name: 'isLength:1',
									mobile_phone: 'isLength:1'
							}}
						>
							<div className="container-fluid">
								<div className="row">
										<div className="col-md-2">
												<Input
														name='first_name'
														required={true}
														title="Имя"
														validations='isLength:1'
												/>
										</div>

										<div className="col-md-2">
												<Input
														name='last_name'
														required={true}
														title="Фамилия"
														validations='isLength:1'
												/>
										</div>

										<div className="col-md-3">
												<Input
														name='email'
														required={true}
														title="Email"
														validations='isEmail'
												/>
										</div>

										<div className="col-md-2">
												<Input
														name='mobile_phone'
														pattern='\+\d{1}\s\d{3}\s\d{3}\-\d{2}\-\d{2}'
														required={true}
														placeholder='Телефон в формате +7 xxx xxx-xx-xx'
														title="Телефон (мобильный)"
														validations='isLength:1,matches'
												/>
										</div>

										<div className="col-md-3">
												<ContactField
														entity='clients'
														name='manager'
														required={true}
														title="Менеджер"
														value=''
												/>
										</div>
								</div>
							</div>
						</Form></div>) :

						(<div className="row">
							<div className="col-md-3">
								<div className="form-group">
									<Autosuggest
											alwaysRenderSuggestions={true}
											placeholder={placeholder}
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
							</div>

							<div className="block-options">
								<div className="form-group">
									<button
										className='btn btn-sm btn-success'

										onClick={e => this.add(e)}
										type="submit"
									>
										<i className="fa fa-plus"></i>
										{' Добавить'}
									</button>
								</div>
							</div>
						</div>)}
				</div>
			);
		}
}

function mapStateToProps(state) {
	return {
		items: state.clients.data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchClients: bindActionCreators(fetchClients, dispatch),
		postClient  : bindActionCreators(postClient, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPicker);
