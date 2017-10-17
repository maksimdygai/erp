import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Select from 'generic/components/Form/Select';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import ClientBlock from 'routes/main/components/ClientBlock';
import viewCommercialProp from 'modules/property/commercial/actions/view';
import fetchAddress from 'modules/property/address/address_by_id/actions/fetch.js';
import fetchClients from 'modules/clients/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import findOrNone from 'generic/helpers/find-or-none';
import getName from 'generic/helpers/get-name';
import orNone from 'generic/helpers/or-none';
import formatMoney from 'generic/helpers/format-money';
import yesOrNoOrNone from 'generic/helpers/yes-or-no';
import dictionaries from 'generic/dictionaries';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

class CommercialPropDetails extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	}

	componentWillMount() {
		this.props.viewCommercialProp(this.props.params.id);
		this.props.fetchUsers();
		this.props.setMainPageData({activePage: "commercial_property"});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.item &&
			(this.props.street == null ||
			 this.props.street.suggestions[0].data.street_fias_id != nextProps.item.street_fias_id)) {
				this.props.fetchAddress(nextProps.item.street_fias_id);
		}
	}

	render() {
		const
			{users, item} = this.props,

			{
				agent,
				basement_sq,
				block,
				building_year,
				ceiling_height,
				city_fias_id,
				comment,
				completed_at,
				condition,
				contacts,
				contracts_cooperation,
				contracts_exclusive,
				contracts_view,
				created_at,
				dedicated_line,
				distance_to_stations,
				district,
				exclusive,
				first_floor_sq,
				floor_type,
				free_pairs,
				from_firm,
				gates_num,
				hall_sq,
				has220v,
				has380v,
				has_autotransfer,
				has_cafes,
				has_canalisation,
				has_cinemas,
				has_crane_beam,
				has_dedic_parking,
				has_educational,
				has_elevator,
				has_escalator,
				has_gantry_crane,
				has_gas_supply,
				has_hospitals,
				has_lift_truck,
				has_lyada,
				has_optical_fiber,
				has_overhead_crane,
				has_phone,
				has_railway,
				has_ramp,
				has_refrigeration,
				has_telpher,
				has_tower_crane,
				has_water_supply,
				heating,
				house_fias_id,
				house_number,
				id,
				land_sq,
				lastСalled,
				latitude,
				level,
				lift_tonnage,
				location,
				longitude,
				metal_plast_windows,
				moderation_at,
				moderation_status,
				monthly_income,
				mortgage,
				net_sale,
				open_sale,
				ownership_type,
				passenger_lift,
				payback_period,
				phone_numbers,
				phone_station,
				price_include_communal,
				price_include_electricity,
				price_include_n_d_s,
				price_include_phone,
				price_include_repairs,
				price_sq_meter,
				profile_auto_service,
				profile_barbershop,
				profile_cafe,
				profile_canteen,
				profile_catering,
				profile_garage,
				profile_hotel,
				profile_industrial_base,
				profile_office,
				profile_production,
				profile_recreation_center,
				profile_sauna,
				profile_site,
				profile_stock,
				profile_store,
				profile_workshop,
				ready_business,
				remaining_sq,
				rent_price,
				rent_price_sq_meter,
				rent_sq,
				right_type_object,
				security,
				selling_price,
				service_lift,
				socle_sq,
				source,
				street_fias_id,
				text_on_the_site,
				total_sq,
				unfinished,
				updated_at,
				urgent_sell,
				wooden_windows,
				wooden_windows_eur
			} = item || {},

			windows_material = [
				{id: 1, val: wooden_windows},
				{id: 2, val: metal_plast_windows},
				{id: 3, val: wooden_windows_eur}
			],

			elevation = [
			   {id: 1, val: has_lift_truck},
			   {id: 2, val: has_tower_crane},
			   {id: 3, val: has_gantry_crane},
			   {id: 4, val: has_crane_beam},
			   {id: 5, val: has_lyada},
			   {id: 6, val: has_overhead_crane},
			   {id: 7, val: has_elevator},
			   {id: 8, val: has_telpher}
			],

			lifts = [
				{id: 1, val: passenger_lift},
				{id: 2, val: service_lift}
			],

			infrastructure = [
				{id: 1, val: has_cafes},
				{id: 2, val: has_cinemas},
				{id: 3, val: has_hospitals},
				{id: 4, val: has_educational}
			],

			profiles = [
				{id: 1,  val: profile_auto_service},
				{id: 2,  val: profile_recreation_center},
				{id: 3,  val: profile_garage},
				{id: 4,  val: profile_hotel},
				{id: 5,  val: profile_cafe},
				{id: 6,  val: profile_store},
				{id: 7,  val: profile_office},
				{id: 8,  val: profile_barbershop},
				{id: 9,  val: profile_industrial_base},
				{id: 10, val: profile_production},
				{id: 11, val: profile_sauna},
				{id: 12, val: profile_stock},
				{id: 13, val: profile_canteen},
				{id: 14, val: profile_site},
				{id: 15, val: profile_workshop},
				{id: 16, val: profile_catering}
			],

			price_inclusions = [
				{id: 1, val: price_include_communal},
				{id: 2, val: price_include_n_d_s},
				{id: 3, val: price_include_repairs},
				{id: 4, val: price_include_phone},
				{id: 5, val: price_include_electricity}
			];

		return (
			<div>
				<div className="content-header content-header-media">
					<div className="header-section">
						<h1>
							{id}
							<br></br>
							<small>Коммерческий объект</small>
						</h1>
					</div>

					<img
						alt="header image"
						className="animation-pulseSlow"
						src="../../../../../../assets/images/headers/header_apt.jpg"
					></img>
				</div>

				<div className="row">
					<div className="col-md-6 col-lg-6">
						<div className="block">
							<div className="block-title">
								<h2>Основная информация</h2>

								<div className="block-options pull-right">
									<Link to={`/commercial_property/${id}/edit`} className="btn btn-default btn-alt btn-sm" title="Редактировать">
										<i className="fa fa-pencil"></i>
									</Link>
								</div>
							</div>

							<table className="table table-borderless table-striped">
								<tbody>
									<tr>
										<td style={{width: '40%'}}><strong>Номер</strong></td>
										<td>{id}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Эксклюзив</strong></td>
										<td>{findOrNone(dictionaries.exclusive, exclusive)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Дата создания</strong></td>
										<td>{moment(created_at).format('DD.MM.YYYY, HH:MM')}</td>
									</tr>

									{updated_at && (<tr>
										<td style={{width: '40%'}}><strong>Дата редактирования</strong></td>
										<td>{moment(updated_at).format('DD.MM.YYYY, HH:MM')}</td>
									</tr>)}

									<tr>
										<td style={{width: '40%'}}><strong>Улица</strong></td>
										<td>{orNone(this.props.street ? this.props.street.suggestions[0].value : '')}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Дом</strong></td>
										<td>{`д. ${house_number}, ${block ? `корп. ${block},` : ''}`}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="block">
							<div className="block-title">
								<h2>Контакты</h2>
							</div>

							<div className="row">
								{
									contacts && contacts.length ?
									_.map(contacts, C => (
										<ClientBlock key={C.id} clientId={C.id} />
									))

									: (<p>Контакты еще не добавлены</p>)
								}
							</div>
						</div>
					</div>

					<div className="col-md-6 col-lg-6">
						<div className="block">
							<div className="block-title">
								<h2>Подробности</h2>
							</div>

							<h4 className="sub-header">Здание</h4>

							<table className="table table-borderless table-striped">
								<tbody>
									<tr>
										<td style={{width: '40%'}}><strong>Состояние</strong></td>
										<td>{findOrNone(dictionaries.apt_condition_types, condition)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Описание</strong></td>
										<td>{orNone(comment)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Район</strong></td>
										<td>{findOrNone(dictionaries.districts, district)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Отопление</strong></td>
										<td>{findOrNone(dictionaries.heating_types, heating)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Материал окон</strong></td>
										<td>
											{orNone(
												matchArrEqualObjProps(
													_.filter(windows_material, x => x.val == 1),
													dictionaries.windows_materials,
													true
												)
											)}
										</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Подъемные ср-­ва</strong></td>
										<td>
											{orNone(
												matchArrEqualObjProps(
													_.filter(elevation, x => x.val == 1),
													dictionaries.elevation_types,
													true
												)
											)}
										</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Лифт</strong></td>
										<td>
											{orNone(
												matchArrEqualObjProps(
													_.filter(lifts, x => x.val == 1),
													dictionaries.lift_types,
													true
												)
											)}
										</td>
									</tr>

									{<tr>
										<td style={{width: '40%'}}><strong>Тоннаж лифта</strong></td>
										<td>{orNone(lift_tonnage)}</td>
									</tr>}

									<tr>
										<td style={{width: '40%'}}><strong>Выделенная линия</strong></td>
										<td>{yesOrNoOrNone(dedicated_line)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Расстояние до остановки</strong></td>
										<td>{orNone(distance_to_stations)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Инфраструктура</strong></td>

										<td>
											{orNone(
												matchArrEqualObjProps(
													_.filter(infrastructure, x => x.id == 1),
													dictionaries.infrastructure,
													true
												)
											)}
										</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Этажность</strong></td>
										<td>{findOrNone(dictionaries.level_types, level)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Профиль</strong></td>
										<td>
											{orNone(
												matchArrEqualObjProps(
													_.filter(profiles, x => x.val == 1),
													dictionaries.lot_profiles,
													true
												)
											)}
										</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Телефонная станция</strong></td>
										<td>{findOrNone(dictionaries.phone_stations, phone_station)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Вид собственности</strong></td>
										<td>{findOrNone(dictionaries.property_types, ownership_type)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Охрана</strong></td>
										<td>{findOrNone(dictionaries.security_types, security)}</td>
									</tr>
								</tbody>
							</table>

							<h4 className="sub-header">Площадь, м<sup>2</sup></h4>

							<table className="table table-borderless table-striped">
								<tbody>
									<tr>
										<td style={{width: '40%'}}><strong>Общая</strong></td>
										<td>{orNone(total_sq)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Зал</strong></td>
										<td>{orNone(hall_sq)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Участок</strong></td>
										<td>{orNone(land_sq)}</td>
									</tr>
								</tbody>
							</table>

							<h4 className="sub-header">Цена</h4>

							<table className="table table-borderless table-striped">
								<tbody>
									<tr>
										<td style={{width: '40%'}}><strong>Цена</strong></td>
										<td>{selling_price ? formatMoney(selling_price) : orNone(selling_price)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Цена за кв. метр</strong></td>
										<td>{price_sq_meter ? formatMoney(price_sq_meter) : orNone(price_sq_meter)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Цена аренды</strong></td>
										<td>{rent_price ? formatMoney(rent_price) : orNone(rent_price)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Цена аренды за кв. метр</strong></td>
										<td>{rent_price_sq_meter ? formatMoney(rent_price_sq_meter) : orNone(rent_price_sq_meter)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Срочная продажа</strong></td>
										<td>{yesOrNoOrNone(urgent_sell)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Ипотека</strong></td>
										<td>{yesOrNoOrNone(mortgage)}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Цена включает</strong></td>
										<td>
											{orNone(
												matchArrEqualObjProps(
													_.filter(price_inclusions, x => x.val == 1),
													dictionaries.price_inclusions,
													true
												)
											)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		users  : state.users.data,
		street : state.property.address.addressById.data,
		item   : state.property.commercial.view
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUsers        : bindActionCreators(fetchUsers, dispatch),
		fetchAddress      : bindActionCreators(fetchAddress, dispatch),
		setMainPageData   : bindActionCreators(setMainPageData, dispatch),
		viewCommercialProp: bindActionCreators(viewCommercialProp, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CommercialPropDetails);
