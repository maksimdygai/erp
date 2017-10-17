import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchAddressById from 'modules/property/address/address_by_id/actions/fetch.js';
import attachPropList from 'modules/active_deal/actions/prop_list.js';
import formatMoney from 'generic/helpers/format-money';
import findOrNone from 'generic/helpers/find-or-none';
import orNone from 'generic/helpers/or-none';
import dictionaries from 'generic/dictionaries';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

class CommercialPropTable extends React.Component {
	constructor() {
		super();
		this.state = {addresses: []};
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
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

	render() {
		const
			{activeDeal, data, entity, filteredList, remove} = this.props,

			rows = (data != null) && _.map(data, I => {
				const
					address = this.state.addresses.length > 0 ?
							  _.concat(_.find(this.state.addresses, x => x.id == I.id).val, ` д.${I.house_number}`) :
							  null,

					communications = [
						{id: 1, val: I.has_water_supply},
						{id: 2, val: I.has_gas_supply},
						{id: 3, val: I.has220v || I.has380v},
						{id: 4, val: I.has_phone},
						{id: 5, val: I.has_canalisation}
					],

					communicationsStr = orNone(matchArrEqualObjProps(
						communications.filter(x => x.val == 1),
						dictionaries.utilities,
						true
					));

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
						<td>{orNone(I.total_sq)}</td>
						<td title={communicationsStr}>{communicationsStr}</td>
						<td>
						   {I.rent_price ?
						   formatMoney(I.rent_price) :
						   orNone(I.rent_price)}
						</td>
						<td>
						   {I.selling_price ?
						   formatMoney(I.selling_price) :
						   orNone(I.selling_price)}
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
				<div className="table-options clearfix">
					<button
						className='btn btn-xs btn-primary pull-right'
						onClick={(e) => this.onAttachList(e)}
						type="submit"
					>
						Оформить договор
					</button>

					<button
						className='btn btn-xs btn-primary pull-right'
						onClick={(e) => this.onAttachList(e)}
						type="submit"
					>
						Добавить в буфер
					</button>
				</div>);

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
								<th>Площадь, м<sup>2</sup></th>
								<th>Коммуницации</th>
								<th>Цена аренды</th>
								<th>Цена продажи</th>
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
					</table>
				</div>

				{attachBtns}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		activeDeal  : state.active_deal.id,
		address     : state.property.address.addressById,
		filteredList: state.filter.data.commercial_property
	};
}

function mapDispatchToProps(dispatch) {
	return {
		attachPropList  : bindActionCreators(attachPropList, dispatch),
		fetchAddressById: bindActionCreators(fetchAddressById, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CommercialPropTable);
