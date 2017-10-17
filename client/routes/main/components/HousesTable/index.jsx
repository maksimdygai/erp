import React from 'react';
import {Link, browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Form from 'generic/components/Form';
import Modal from 'generic/components/Modal';
import showModal from 'modules/main_page/actions/show_modal.js';
import Input from 'generic/components/Form/Input';
import ContactField from 'generic/components/Form/ContactField';
import fetchAddressById from 'modules/property/address/address_by_id/actions/fetch.js';
import fetchClients from 'modules/clients/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import attachPropList from 'modules/active_deal/actions/prop_list.js';
import postContract from 'modules/contracts/contracts_view/actions/post.js';
import formatMoney from 'generic/helpers/format-money';
import findOrNone from 'generic/helpers/find-or-none';
import orNone from 'generic/helpers/or-none';
import dictionaries from 'generic/dictionaries';

class HousesTable extends React.Component {
	constructor() {
		super();
		this.state = {addresses: []};
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	}

	componentWillMount() {
		this.props.fetchClients();
		this.props.fetchUsers();
	}

	componentWillReceiveProps(nextProps) {
		let
			nextAddress = nextProps.address.data != null ?
						  _.findIndex(this.state.addresses, x => {
							  return x.val == nextProps.address.data.suggestions[0].data.street_fias_id;
						  }) :
						  -1;

		if (nextProps.data != this.props.data) {
			for (let i = 0; i < nextProps.data.length; ++i) {
				let
					newAddresses = this.state.addresses;

				newAddresses.push({id: nextProps.data[i].id, val: nextProps.data[i].street_fias_id});
				this.setState({addresses: newAddresses});
				this.props.fetchAddressById(nextProps.data[i].street_fias_id);
			}
		} else if (nextAddress != -1) {
			let
				newAddresses = this.state.addresses;

			newAddresses[nextAddress].val = nextProps.address.data.suggestions[0].value;
			this.setState({addresses: newAddresses});
		}
	}

	onAttachList = e => {
		const
			{activeDeal, attachPropList, filteredList} = this.props;

		e.preventDefault();
		attachPropList(filteredList);
		browserHistory.push(`/deals/${activeDeal}`)
	}

	onAddContract = e => {
		e.preventDefault();
		this.props.showModal('houses-contract-execution-modal', true);
	}

	onCancelContractForm = e => {
		e.preventDefault();
		this.props.showModal('houses-contract-execution-modal', false);
	}

	onPostContract = data => {
		this.props.postContract(data);
	}

	render() {
		const
			{activeDeal, clients, data, entity, filteredList, remove, users} = this.props,

			rows = (data != null) && _.map(data, I => {
				const
					address = this.state.addresses.length > 0 ?
							  _.concat(_.find(this.state.addresses, x => x.id == I.id).val, ` д.${I.house_number}`) :
							  null;

				return (
					<tr key={I.id}>
						<td className="text-center"><input type="checkbox" id="checkbox1-1" name="checkbox1-1"></input></td>

						<td>
							<Link to={`/${entity}/${I.id}`} title="Подробности">{I.id}</Link>
						</td>

						<td>{findOrNone(dictionaries.exclusive, I.exclusive)}</td>
						<td>{moment(I.created_at).format('DD.MM.YYYY, HH:MM')}</td>
						<td>{findOrNone(dictionaries.districts, I.district)}</td>
						<td title={address}>{address}</td>
						<td>{_.map([I.total_sq, I.living_sq, I.kitchen_sq], orNone).join('/')}</td>
						<td>{orNone(I.floors)}</td>
						<td>{findOrNone(dictionaries.apt_condition_types, I.condition)}</td>
						<td>
							{I.price ?
							formatMoney(I.price) :
							orNone(I.price)}
						</td>

						<td className="text-center">
							<div className="btn-group btn-group-xs">
								<Link to={`/${entity}/${I.id}/edit`} className="btn btn-default" title="Редактировать">
									<i className="fa fa-pencil"></i>
								</Link>

								<button className="btn btn-danger" onClick={e => remove(e, I.id)} title="Удалить">
									<i className="fa fa-times"></i>
								</button>
							</div>
						</td>
					</tr>
				)}
			),

			attachBtns = filteredList && activeDeal && (
				<div className="btn-toolbar">
					<button
						className='btn btn-xs btn-success pull-right'
						onClick={e => this.onAddContract(e)}
						type="submit"
					>
						Оформить договор
					</button>

					<button
						className='btn btn-xs btn-default pull-right'
						onClick={e => this.onAttachList(e)}
						type="submit"
					>
						Добавить в буфер
					</button>
				</div>
			);

		return (
			<div className="block">
				{attachBtns}

				<div className="table-responsive">
					<table id="general-table" className="table table-striped table-vcenter">
						{rows && (<thead>
							<tr>
								<th style={{width: '50px'}} className="text-center"><input type="checkbox"></input></th>
								<th>№</th>
								<th title="Эксклюзивность">Э/Ф</th>
								<th>Дата</th>
								<th>Район</th>
								<th>Адрес</th>
								<th title="общая/жилая/кухня">Площадь, м<sup>2</sup></th>
								<th>Этажей</th>
								<th>Состояние</th>
								<th>Цена</th>
								<th style={{width: '110px'}} className="text-center">Действия</th>
							</tr>
						</thead>)}

						<tbody>
							{rows || (
								<tr>
									<td className="text-center" colSpan="50">Список пуст</td>
								</tr>
							)}
						</tbody>

						<tfoot>
							<tr>
								<td colSpan="50">
									{attachBtns}
								</td>
							</tr>
						</tfoot>
					</table>
				</div>

				<Modal
					header='Оформление договора просмотра'
					noActions={true}
					submitText='Оформить'
					uniqueId='houses-contract-execution-modal'
				>
					<Form
						data={{
							deal  : {id: activeDeal},
							houses: filteredList,
						}}

						cancel={this.onCancelContractForm}
						new={true}
						post={this.onPostContract}

						schema={{
							number: 'isRequired',
							agent : 'isRequired',
							client: 'isRequired'
						}}
					>
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-4">
									<Input
										name='number'
										required={true}
										title="Номер"
									/>
								</div>

								<div className="col-md-4">
									<ContactField
										name='agent'
										required={true}
										title="Агент"
										value=''
										items={users}
									/>
								</div>

								<div className="col-md-4">
									<ContactField
										name='client'
										required={true}
										title="Клиент"
										value=''
										items={clients}
									/>
								</div>
							</div>
						</div>
					</Form>
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		activeDeal  : state.active_deal.id,
		address     : state.property.address.addressById,
		clients     : state.clients.data,
		filteredList: state.filter.data.house,
		users       : state.users.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		attachPropList  : bindActionCreators(attachPropList, dispatch),
		fetchAddressById: bindActionCreators(fetchAddressById, dispatch),
		fetchClients    : bindActionCreators(fetchClients, dispatch),
		fetchUsers      : bindActionCreators(fetchUsers, dispatch),
		postContract    : bindActionCreators(postContract, dispatch),
		showModal       : bindActionCreators(showModal, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HousesTable);
