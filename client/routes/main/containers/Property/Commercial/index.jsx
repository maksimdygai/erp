import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import fetchCommercialProp from 'modules/property/commercial/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import fetchClients from 'modules/clients/actions/fetch.js';
import fetchSources from 'modules/property/sources/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import Filter from 'generic/components/Filter';
import FilterAddressFieldset from 'generic/components/Filter/Fieldset/AddressFieldset';
import FilterMulticomplete from 'generic/components/Filter/FilterMulticomplete';
import FilterMulticontact from 'generic/components/Filter/FilterMulticontact';
import FilterInput from 'generic/components/Filter/FilterInput';
import FilterCheckbox from 'generic/components/Filter/FilterCheckbox';
import FilterDatepicker from 'generic/components/Filter/FilterDatepicker';
import dictionaries from 'generic/dictionaries';
import CommercialPropTable from '../../../components/CommercialPropTable';

class CommercialProperty extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	componentWillMount(){
		this.props.fetchCommercialProp();
		this.props.fetchUsers();
		this.props.fetchClients();
		this.props.fetchSources();
		this.props.setMainPageData({activePage: "commercial_property"});
	}

	handleRemove = (e, id) => {
		e.preventDefault();
		this.props.remove(id);
	}

	render() {
		const
			{dealId, propDesc} = this.props;

		return (
			<div>
				<div className="content-header">
					<div className="header-section">
						<h1>
							<Link to='/commercial_property/new/edit' className="btn btn-success btn-sm pull-right">
								Добавить
							</Link>

							Коммерческая недвижимость
							<br></br>
							<small>Таблица всей коммерческой недвижимости</small>
						</h1>
					</div>
				</div>

				{propDesc && (
					<div className="alert alert-info">
						<h4>Квалификация</h4>
						{propDesc}

						<Link to={`/deals/${dealId}`} className="btn btn-xs pull-right">
							Вернуться к Сделке
						</Link>
					</div>
				)}

				<CollapsableBlock
					title='Фильтр'
					uniqueId='commercial-prop-filter-collapsable'
				>
					<Filter entity='commercial_property'>
						<div className="container-fluid">
							<FilterAddressFieldset entity='commercial_property'/>

							<div className="row">
								<fieldset>
									<legend>Помещение</legend>
									
									<div className="col-md-4">
										<FilterMulticomplete
											name='condition'
											data={dictionaries.apt_condition_types}
											title='Состояние'
										/>
									</div>
								</fieldset>
							</div>

							<div className="row">
								<fieldset>
									<legend>Площадь</legend>

									<div className="col-md-3">
										<FilterInput
											name='total_sq'

											operators={[
												{id: 1, name: '',  value: ''},
												{id: 2, name: '=', value: '='},
												{id: 4, name: '>', value: '>'},
												{id: 5, name: '<', value: '<'},
												{id: 6, name: '≥', value: '>='},
												{id: 7, name: '≤', value: '<='}
											]}

											title="Общая"
										/>
									</div>

									<div className="col-md-3">
										<FilterInput
											name='first_floor_sq'

											operators={[
												{id: 1, name: '',  value: ''},
												{id: 2, name: '=', value: '='},
												{id: 4, name: '>', value: '>'},
												{id: 5, name: '<', value: '<'},
												{id: 6, name: '≥', value: '>='},
												{id: 7, name: '≤', value: '<='}
											]}

											title="Площадь первого этажа"
										/>
									</div>

									<div className="col-md-3">
										<FilterInput
											name='hall_sq'

											operators={[
												{id: 1, name: '',  value: ''},
												{id: 2, name: '=', value: '='},
												{id: 4, name: '>', value: '>'},
												{id: 5, name: '<', value: '<'},
												{id: 6, name: '≥', value: '>='},
												{id: 7, name: '≤', value: '<='}
											]}

											title="Площадь зала"
										/>
									</div>

									<div className="col-md-3">
										<FilterInput
											name='basement_sq'

											operators={[
												{id: 1, name: '',  value: ''},
												{id: 2, name: '=', value: '='},
												{id: 4, name: '>', value: '>'},
												{id: 5, name: '<', value: '<'},
												{id: 6, name: '≥', value: '>='},
												{id: 7, name: '≤', value: '<='}
											]}

											title="Площадь подвала"
										/>
									</div>

									<div className="col-md-3">
										<FilterInput
											name='remaining_sq'

											operators={[
												{id: 1, name: '',  value: ''},
												{id: 2, name: '=', value: '='},
												{id: 4, name: '>', value: '>'},
												{id: 5, name: '<', value: '<'},
												{id: 6, name: '≥', value: '>='},
												{id: 7, name: '≤', value: '<='}
											]}

											title="Площадь остальных этажей"
										/>
									</div>

									<div className="col-md-3">
										<FilterInput
											name='land_sq'

											operators={[
												{id: 1, name: '',  value: ''},
												{id: 2, name: '=', value: '='},
												{id: 4, name: '>', value: '>'},
												{id: 5, name: '<', value: '<'},
												{id: 6, name: '≥', value: '>='},
												{id: 7, name: '≤', value: '<='}
											]}

											title="Площадь участка"
										/>
									</div>

									<div className="col-md-3">
										<FilterInput
											name='socle_sq'

											operators={[
												{id: 1, name: '',  value: ''},
												{id: 2, name: '=', value: '='},
												{id: 4, name: '>', value: '>'},
												{id: 5, name: '<', value: '<'},
												{id: 6, name: '≥', value: '>='},
												{id: 7, name: '≤', value: '<='}
											]}

											title="Площадь цоколя"
										/>
									</div>

									<div className="col-md-3">
										<FilterInput
											name='rent_sq'

											operators={[
												{id: 1, name: '',  value: ''},
												{id: 2, name: '=', value: '='},
												{id: 4, name: '>', value: '>'},
												{id: 5, name: '<', value: '<'},
												{id: 6, name: '≥', value: '>='},
												{id: 7, name: '≤', value: '<='}
											]}

											title="Площадь аренды"
										/>
									</div>
								</fieldset>
							</div>

							<div className="row">
								<div className="col-md-9">
									<fieldset>
										<div className="row">
											<legend>Цена</legend>

											<div className="col-md-3">
												<FilterInput
													name='selling_price'

													operators={[
														{id: 1, name: '',  value: ''},
														{id: 2, name: '=', value: '='},
														{id: 4, name: '>', value: '>'},
														{id: 5, name: '<', value: '<'},
														{id: 6, name: '≥', value: '>='},
														{id: 7, name: '≤', value: '<='}
													]}

													title="Цена продажи"
												/>
											</div>

											<div className="col-md-3">
												<FilterInput
													name='price_sq_meter'

													operators={[
														{id: 1, name: '',  value: ''},
														{id: 2, name: '=', value: '='},
														{id: 4, name: '>', value: '>'},
														{id: 5, name: '<', value: '<'},
														{id: 6, name: '≥', value: '>='},
														{id: 7, name: '≤', value: '<='}
													]}

													title="Цена продажи за м. кв."
												/>
											</div>

											<div className="col-md-3">
												<FilterInput
													name='rent_price'

													operators={[
														{id: 1, name: '',  value: ''},
														{id: 2, name: '=', value: '='},
														{id: 4, name: '>', value: '>'},
														{id: 5, name: '<', value: '<'},
														{id: 6, name: '≥', value: '>='},
														{id: 7, name: '≤', value: '<='}
													]}

													title="Цена аренды"
												/>
											</div>

											<div className="col-md-3">
												<FilterInput
													name='rent_price_sq_meter'

													operators={[
														{id: 1, name: '',  value: ''},
														{id: 2, name: '=', value: '='},
														{id: 4, name: '>', value: '>'},
														{id: 5, name: '<', value: '<'},
														{id: 6, name: '≥', value: '>='},
														{id: 7, name: '≤', value: '<='}
													]}

													title="Цена аренды за м. кв."
												/>
											</div>
										</div>
									</fieldset>
								</div>

								<div className="col-md-3">
									<fieldset>
										<div className="row">
											<legend>Этажность</legend>

											<div className="col-md-12">
												<FilterMulticomplete
													name='level'
													data={dictionaries.level_types}
													title='Этажность'
												/>
											</div>
										</div>
									</fieldset>
								</div>
							</div>

							<div className="row">
								<fieldset>
									<legend>Дата</legend>

									<div className="col-md-3">
										<FilterInput
											name='building_year'

											operators={[
												{id: 1, name: '',  value: ''},
												{id: 2, name: '=', value: '='},
												{id: 4, name: '>', value: '>'},
												{id: 5, name: '<', value: '<'},
												{id: 6, name: '≥', value: '>='},
												{id: 7, name: '≤', value: '<='}
											]}

											title="Год постройки"
										/>
									</div>

									<div className="col-md-4">
										<FilterDatepicker
											name='completed_at'

											operators={[
												{id: 1, name: '',                    value: ''},
												{id: 2, name: 'В этот день',         value: '='},
												{id: 4, name: 'После',               value: '>'},
												{id: 5, name: 'До',                  value: '<'},
												{id: 6, name: 'В этот день и позже', value: '>='},
												{id: 7, name: 'В этот день и ранее', value: '<='}
											]}

											title="Дата сдачи"
										/>
									</div>
								</fieldset>
							</div>

							<div className="form-group">
								<CollapsableBlock
								  title='Дополнительно'
								  uniqueId='commercial-filter-more-collapsable'
								>
									<div className="row">
										<div className="col-md-4">
											<FilterMulticontact
												name='agent'
												data={this.props.allUsers}
												title='Менеджер'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticontact
												name='contacts'
												data={this.props.allClients}
												title='Клиенты'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='source'
												data={this.props.allSources}
												title='Источник'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='moderation_status'
												data={dictionaries.moderation_status_types}
												title='Статус модерации'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='heating'
												data={dictionaries.heating_types}
												title='Отопление'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='floor_type'
												data={dictionaries.floor_types}
												title='Полы'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='security'
												data={dictionaries.security_types}
												title='Охрана'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='right_type_object'
												data={dictionaries.object_right_types}
												title='Вид права'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='phone_station'
												data={dictionaries.phone_stations}
												title='Телефонная станция'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='ownership_type'
												data={dictionaries.property_types}
												title='Вид собственности'
											/>
										</div>

										<div className="col-md-2">
											<FilterInput
												name='gates_num'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Количество ворот"
											/>
										</div>

										<div className="col-md-3">
											<FilterInput
												name='phone_numbers'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Кол-во телефонных номеров"
											/>
										</div>

										<div className="col-md-3">
											<FilterInput
												name='distance_to_stations'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Расстояние до остановок"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterInput
												name='lift_tonnage'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Лифт, тоннаж"
											/>
										</div>

										<div className="col-md-2">
											<FilterInput
												name='free_pairs'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Свободных пар"
											/>
										</div>

										<div className="col-md-2">
											<FilterInput
												name='ceiling_height'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Высота потолков"
											/>
										</div>

										<div className="col-md-2">
											<FilterInput
												name='monthly_income'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Ежемесячный доход"
											/>
										</div>

										<div className="col-md-2">
											<FilterInput
												name='payback_period'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Срок окупаемости"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='open_sale'
												title="Открытая продажа"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='exclusive'
												title="Эксклюзивность"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='net_sale'
												title="Чистая продажа"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_auto_service'
												title="Автосервис"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_recreation_center'
												title="База отдыха"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_garage'
												title="Гараж"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='profile_hotel'
												title="Гостиница"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_canteen'
												title="Столовая"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_catering'
												title="Общепит"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='unfinished'
												title="Стройвариант"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_cafe'
												title="Кафе"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_store'
												title="Магазин"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='profile_workshop'
												title="Цех"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_office'
												title="Офис"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_barbershop'
												title="Парикмахерская"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_site'
												title="Участок"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_industrial_base'
												title="Пром. база"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_production'
												title="Производство"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='profile_sauna'
												title="Сауна"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='profile_stock'
												title="Склад"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_autotransfer'
												title="Автоподъезд"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='ready_business'
												title="Готовый бизнес"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='wooden_windows'
												title="Деревянные окна"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='metal_plast_windows'
												title="Металлопластиковые окна"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='has_railway'
												title="Ж/д"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has220v'
												title="Линия 220В"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has380v'
												title="Линия 380В"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_water_supply'
												title="Водоснабжение"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_canalisation'
												title="Канализация"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_gas_supply'
												title="Газоснабжение"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='has_phone'
												title="Телефон"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_optical_fiber'
												title="Оптоволокно"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_lift_truck'
												title="Автопогрузчик"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_tower_crane'
												title="Башенный кран"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='passenger_lift'
												title="Пассажирский лифт"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_gantry_crane'
												title="Козловой кран"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='service_lift'
												title="Грузовой лифт"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_crane_beam'
												title="Кранбалка"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_lyada'
												title="Ляда"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_overhead_crane'
												title="Мостовой кран"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_elevator'
												title="Подъемник"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_telpher'
												title="Тельфер"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='has_cafes'
												title="Бары и кафе"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_cinemas'
												title="Кинотеатры"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_educational'
												title="Образовательные учреждения"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_hospitals'
												title="Больницы и диагностические центры"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_dedic_parking'
												title="Наличие выделенных парковочных мест"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_refrigeration'
												title="Холодильные камеры"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='price_include_phone'
												title="В стоимость входит телефон"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='mortgage'
												title="Ипотека"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='price_include_n_d_s'
												title="В стоимость входит НДС"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='price_include_electricity'
												title="В стоимость входит электроэнергия"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='price_include_communal'
												title="В стоимость входят коммунальные платежи"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='price_include_repairs'
												title="В стоимость входит ремонт"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='urgent_sell'
												title="Срочная продажа"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='dedicated_line'
												title="Выделенная линия"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_ramp'
												title="Наличие пандуса"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='wooden_windows_eur'
												title="Деревянные евроокна"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_escalator'
												title="Эскалатор"
											/>
										</div>
									</div>
								</CollapsableBlock>
							</div>
						</div>
					</Filter>
				</CollapsableBlock>

				<CommercialPropTable data={this.props.data} remove={this.handleRemove} entity="commercial_property" />
			</div>
		);
	}
}

function mapStateToProps(state) {
	const
		data = (state.filter.data || {}).commercial_property;

	return {
		allClients: state.clients.data,
		allSources: state.property.sources.data,
		allUsers  : state.users.data,
		data	  	: data || state.property.commercial.data,
		dealId    : state.active_deal.id,
		propDesc  : state.active_deal.text
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchClients	   	 : bindActionCreators(fetchClients, dispatch),
		fetchCommercialProp: bindActionCreators(fetchCommercialProp, dispatch),
		fetchSources	   	 : bindActionCreators(fetchSources, dispatch),
		fetchUsers		   	 : bindActionCreators(fetchUsers, dispatch),
		setMainPageData    : bindActionCreators(setMainPageData, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CommercialProperty);
