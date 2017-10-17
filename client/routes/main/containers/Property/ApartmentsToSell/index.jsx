import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import fetchApartmentsSell from 'modules/property/apartments_sell/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import fetchClients from 'modules/clients/actions/fetch.js';
import fetchSources from 'modules/property/sources/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import Filter from 'generic/components/Filter';
import FilterAddressFieldset from 'generic/components/Filter/Fieldset/AddressFieldset';
import FilterInput from 'generic/components/Filter/FilterInput'
import FilterMulticomplete from 'generic/components/Filter/FilterMulticomplete';
import FilterMulticontact from 'generic/components/Filter/FilterMulticontact';
import FilterCheckbox from 'generic/components/Filter/FilterCheckbox';
import dictionaries from 'generic/dictionaries';
import ApartmentsSellTable from '../../../components/ApartmentsSellTable'

class ApartmentsToSell extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	}

	componentWillMount(){
		this.setState({entity: 'apartments_to_sell'});
		this.props.fetchApartmentsSell();
		this.props.fetchUsers();
		this.props.fetchClients();
		this.props.fetchSources();
		this.props.setMainPageData({activePage: "apartments_to_sell"});
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
							<Link to='/apartments_sell/new/edit' className="btn btn-success btn-sm pull-right">Добавить</Link>
							Квартиры (продажа)
							<br></br>
							<small>Таблица всех продающихся квартир</small>
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
					uniqueId='houses-filter-collapsable'
				>
					<Filter entity='apartment_sale'>
						<div className="container-fluid">
					  		<FilterAddressFieldset entity='apartment_sale'/>
							
							<div className="row">
								<fieldset>
									<legend>Дом</legend>
									
							  		<div className="col-md-6">
									  <FilterMulticomplete
										  name='type'
										  data={dictionaries.apt_types}
										  title='Тип'
									  />
									</div>

									<div className="col-md-6">
									  <FilterMulticomplete
										  name='housing_stock'
										  data={dictionaries.housing_stock}
										  title='Фонд'
									  />
									</div>
								</fieldset>
							</div>

							<div className="row">
								<div className="col-md-6">
									<FilterMulticomplete
										name='material'
										data={dictionaries.building_wall_materials}
										title='Материал стен здания'
									/>
								</div>

								<div className="col-md-6">
									<FilterMulticomplete
										name='condition'
										data={dictionaries.apt_condition_types}
										title='Состояние'
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-md-7">
									<fieldset>
										<div className="row">
											<legend>Площадь</legend>

											<div className="col-md-4">
											  <FilterInput
												name='total_sq'

												operators={[
												  {id: 1, name: '',  value: ''},
												  {id: 2, name: '=', value: '='},
												  {id: 3, name: '≠', value: '!='},
												  {id: 4, name: '>', value: '>'},
												  {id: 5, name: '<', value: '<'},
												  {id: 6, name: '≥', value: '>='},
												  {id: 7, name: '≤', value: '<='}
												]}

												title='Пл. (общая)'
											  />
										    </div>

										    <div className="col-md-4">
											  <FilterInput
												name='living_sq'

												operators={[
												  {id: 1, name: '',  value: ''},
												  {id: 2, name: '=', value: '='},
												  {id: 3, name: '≠', value: '!='},
												  {id: 4, name: '>', value: '>'},
												  {id: 5, name: '<', value: '<'},
												  {id: 6, name: '≥', value: '>='},
												  {id: 7, name: '≤', value: '<='}
												]}

												title='Пл. (жилая)'
											  />
										    </div>

										    <div className="col-md-4">
											  <FilterInput
												name='kitchen_sq'

												operators={[
												  {id: 1, name: '',  value: ''},
												  {id: 2, name: '=', value: '='},
												  {id: 3, name: '≠', value: '!='},
												  {id: 4, name: '>', value: '>'},
												  {id: 5, name: '<', value: '<'},
												  {id: 6, name: '≥', value: '>='},
												  {id: 7, name: '≤', value: '<='}
												]}

												title='Пл. (кухня)'
											  />
										    </div>
										</div>
									</fieldset>
								</div>

								<div className="col-md-5">
									<fieldset>
										<div className="row">
											<legend>Этажность</legend>
											
											<div className="col-md-6">
											  <FilterInput
												name='floor'

												operators={[
												  {id: 1, name: '',  value: ''},
												  {id: 2, name: '=', value: '='},
												  {id: 3, name: '≠', value: '!='},
												  {id: 4, name: '>', value: '>'},
												  {id: 5, name: '<', value: '<'},
												  {id: 6, name: '≥', value: '>='},
												  {id: 7, name: '≤', value: '<='}
												]}

												title='Этаж'
											  />
										    </div>

											<div className="col-md-6">
												<FilterInput
													name='floors'

													operators={[
													  {id: 1, name: '',  value: ''},
													  {id: 2, name: '=', value: '='},
													  {id: 3, name: '≠', value: '!='},
													  {id: 4, name: '>', value: '>'},
													  {id: 5, name: '<', value: '<'},
													  {id: 6, name: '≥', value: '>='},
													  {id: 7, name: '≤', value: '<='}
													]}

													title='Этажность'
												/>
											</div>
										</div>
									</fieldset>
								</div>
							</div>

							<div className="row">
								<fieldset>
									<legend>Цена</legend>

									<div className="col-md-3">
										<FilterInput
											name='price'

											operators={[
											  {id: 1, name: '',  value: ''},
											  {id: 2, name: '=', value: '='},
											  {id: 3, name: '≠', value: '!='},
											  {id: 4, name: '>', value: '>'},
											  {id: 5, name: '<', value: '<'},
											  {id: 6, name: '≥', value: '>='},
											  {id: 7, name: '≤', value: '<='}
											]}

											title='Цена'
										/>
									</div>

									<div className="col-md-3">
										<FilterInput
											name='special_price'

											operators={[
											  {id: 1, name: '',  value: ''},
											  {id: 2, name: '=', value: '='},
											  {id: 3, name: '≠', value: '!='},
											  {id: 4, name: '>', value: '>'},
											  {id: 5, name: '<', value: '<'},
											  {id: 6, name: '≥', value: '>='},
											  {id: 7, name: '≤', value: '<='}
											]}

											title='Спец. цена'
										/>
									</div>

									<div className="col-md-3">
										<FilterInput
											name='terms'

											operators={[
											  {id: 1, name: '',  value: ''},
											  {id: 2, name: '=', value: '='},
											  {id: 3, name: '≠', value: '!='},
											  {id: 4, name: '>', value: '>'},
											  {id: 5, name: '<', value: '<'},
											  {id: 6, name: '≥', value: '>='},
											  {id: 7, name: '≤', value: '<='}
											]}

											title='Условия'
										/>
									</div>
								</fieldset>
							</div>

							<div className="form-group">
								<CollapsableBlock
								  title='Дополнительно'
								  uniqueId='apartments-to-sell-filter-more-collapsable'
								>
									<div className="row">
									  <div className="col-md-4">
										  <FilterMulticomplete
											  name='moderation_status'
											  data={dictionaries.moderation_status_types}
											  title='Статус модерации'
										  />
									  </div>

									  <div className="col-md-4">
										  <FilterMulticontact
											  name='agent'
											  data={this.props.allUsers}
											  title='Менеджер'
										  />
									  </div>

									  <div className="col-md-4">
										  <FilterMulticomplete
											  name='placement'
											  data={dictionaries.placement}
											  title='Расположение'
										  />
									  </div>
								    </div>

								    <div className="row">
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
											  name='bathroom'
											  data={dictionaries.bathroom_types}
											  title='Санузел'
										  />
									  </div>

									  <div className="col-md-4">
										  <FilterMulticomplete
											  name='related'
											  data={dictionaries.joined_rooms}
											  title='Смежные комнаты'
										  />
									  </div>

									  <div className="col-md-4">
										  <FilterMulticomplete
											  name='commodities'
											  data={dictionaries.commodities}
											  title='Удобства'
										  />
									  </div>
								    </div>

								    <div className="row">
									  <div className="col-md-4">
										  <FilterMulticomplete
											  name='hot_water'
											  data={dictionaries.hot_water}
											  title='Горячая вода'
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
											  name='loggia'
											  data={dictionaries.loggia}
											  title='Лоджия'
										  />
									  </div>
									</div>

									<div className="row">
									  <div className="col-md-4">
										  <FilterMulticomplete
											  name='balcony'
											  data={dictionaries.balcony_types}
											  title='Балкон'
										  />
									  </div>

									  <div className="col-md-3">
										  <FilterInput
											name='underage_owners_num'

											operators={[
											  {id: 1, name: '',  value: ''},
											  {id: 2, name: '=', value: '='},
											  {id: 3, name: '≠', value: '!='},
											  {id: 4, name: '>', value: '>'},
											  {id: 5, name: '<', value: '<'},
											  {id: 6, name: '≥', value: '>='},
											  {id: 7, name: '≤', value: '<='}
											]}

											title='Несовершеннолетних собственников'
										  />
									  </div>

									  <div className="col-md-3">
										  <FilterInput
											name='parking_num'

											operators={[
											  {id: 1, name: '',  value: ''},
											  {id: 2, name: '=', value: '='},
											  {id: 3, name: '≠', value: '!='},
											  {id: 4, name: '>', value: '>'},
											  {id: 5, name: '<', value: '<'},
											  {id: 6, name: '≥', value: '>='},
											  {id: 7, name: '≤', value: '<='}
											]}

											title='Парковочных мест'
										  />
									  </div>
								    </div>

								    <div className="row">
									  	<div className="col-md-3">
											<FilterInput
												name='building_year'

												operators={[
												  {id: 1, name: '',  value: ''},
												  {id: 2, name: '=', value: '='},
												  {id: 3, name: '≠', value: '!='},
												  {id: 4, name: '>', value: '>'},
												  {id: 5, name: '<', value: '<'},
												  {id: 6, name: '≥', value: '>='},
												  {id: 7, name: '≤', value: '<='}
												]}

												title='Год постройки'
											/>
										</div>

										<div className="col-md-3">
										  <FilterInput
											name='purchase_year'

											operators={[
											  {id: 1, name: '',  value: ''},
											  {id: 2, name: '=', value: '='},
											  {id: 3, name: '≠', value: '!='},
											  {id: 4, name: '>', value: '>'},
											  {id: 5, name: '<', value: '<'},
											  {id: 6, name: '≥', value: '>='},
											  {id: 7, name: '≤', value: '<='}
											]}

											title='Год покупки'
										  />
										</div>

									    <div className="col-md-3">
										  <FilterInput
											name='ceiling_height'

											operators={[
											  {id: 1, name: '',  value: ''},
											  {id: 2, name: '=', value: '='},
											  {id: 3, name: '≠', value: '!='},
											  {id: 4, name: '>', value: '>'},
											  {id: 5, name: '<', value: '<'},
											  {id: 6, name: '≥', value: '>='},
											  {id: 7, name: '≤', value: '<='}
											]}

											title='Высота потолков'
										  />
									    </div>

									    <div className="col-md-3">
										  <FilterInput
											name='distance_to_stations'

											operators={[
											  {id: 1, name: '',  value: ''},
											  {id: 2, name: '=', value: '='},
											  {id: 3, name: '≠', value: '!='},
											  {id: 4, name: '>', value: '>'},
											  {id: 5, name: '<', value: '<'},
											  {id: 6, name: '≥', value: '>='},
											  {id: 7, name: '≤', value: '<='}
											]}

											title='Расстояние до остановок'
										  />
									    </div>
								    </div>
								    
								    <div className="row">
										<div className="col-md-3">
										  <FilterInput
											name='appart_on_floor'

											operators={[
											  {id: 1, name: '',  value: ''},
											  {id: 2, name: '=', value: '='},
											  {id: 3, name: '≠', value: '!='},
											  {id: 4, name: '>', value: '>'},
											  {id: 5, name: '<', value: '<'},
											  {id: 6, name: '≥', value: '>='},
											  {id: 7, name: '≤', value: '<='}
											]}

											title='Квартир на этаже'
										  />
										</div>

										<div className="col-md-3">
										  <FilterInput
											name='owners_num'

											operators={[
											  {id: 1, name: '',  value: ''},
											  {id: 2, name: '=', value: '='},
											  {id: 3, name: '≠', value: '!='},
											  {id: 4, name: '>', value: '>'},
											  {id: 5, name: '<', value: '<'},
											  {id: 6, name: '≥', value: '>='},
											  {id: 7, name: '≤', value: '<='}
											]}

											title='Количество собственников'
										  />
										</div>
								    </div>

									<div className="row">
									  <div className="col-md-2">
										  <FilterCheckbox
											  name='net_sale'
											  title='Чистая продажа'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='exclusive'
											  title='Эксклюзивность'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='open_sale'
											  title='Открытая продажа'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='from_firm'
											  title='Информация от организации'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='unfinished'
											  title='Стройвариант'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='elite'
											  title='Элитное жилье'
										  />
									  </div>
									</div>

									<div className="row">
									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_privatization_contract'
											  title='Договор безвозмездной передачи жилья гражданам'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_contract_of_sale'
											  title='Договор купли-продажи'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_contract_of_gift'
											  title='Договор дарения'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_barter_contract'
											  title='Договор мены'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_court_dec_amicable_agr'
											  title='Решение суда или мировое соглашение'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_certificate_of_inheritance'
											  title='Свидетельство о наследовании'
										  />
									  </div>
									</div>

									<div className="row">
									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_share_contract'
											  title='Договор долевого участия'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_decree_local_administration'
											  title='Постановление местной администрации'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_rent_contract'
											  title='Договор ренты'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_certificate_of_payment'
											  title='Справка о выплате пая'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_investment_contract'
											  title='Договор инвестирования'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_agreement_sharing_property'
											  title='Соглашение о разделе совместно нажитого имущества'
										  />
									  </div>
									</div>

									<div className="row">
									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_agreemen_alloc_owner_interest'
											  title='Соглашение о выделении доли в праве собственности'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='ldapsale_agreement_compensation'
											  title='Договор об отступном'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='has_cafes'
											  title='Бары и кафе'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='has_cinemas'
											  title='Кинотеатры'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='has_hospitals'
											  title='Больницы и диагностические центры'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='has_educational'
											  title='Образовательные учреждения'
										  />
									  </div>
									</div>

									<div className="row">
									  <div className="col-md-2">
										  <FilterCheckbox
											  name='mortgage'
											  title='Ипотека'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='urgent_sell'
											  title='Срочная продажа'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='for_rent'
											  title='Сдаётся в аренду'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='access_control'
											  title='Контроль доступа'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='lift_parking_connect'
											  title='Связь лифта с парковкой'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='wooden_windows'
											  title='Деревянные окна'
										  />
									  </div>
									</div>

									<div className="row">
									  <div className="col-md-2">
										  <FilterCheckbox
											  name='windows_to_yard'
											  title='Окна во двор'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='windows_to_street'
											  title='Окна на улицу'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='secure_parking'
											  title='Охраняемая парковка'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='passenger_lift'
											  title='Пассажирский лифт'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='wooden_windows_eur'
											  title='Деревянные евроокна'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='metal_plast_windows'
											  title='Металлопластиковые окна'
										  />
									  </div>
									</div>

									<div className="row">
									  <div className="col-md-2">
										  <FilterCheckbox
											  name='has_dedic_parking'
											  title='Выделенная парковка'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='guardrail'
											  title='Ограждение'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='service_lift'
											  title='Грузовой лифт'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='redevelopment'
											  title='Перепланировка'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='backup_power_system'
											  title='Резервное электроснабжение'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='concierge'
											  title='Консьерж'
										  />
									  </div>
									</div>

									<div className="row">
									  <div className="col-md-2">
										  <FilterCheckbox
											  name='house_territory'
											  title='Придомовая территория'
										  />
									  </div>

									  <div className="col-md-2">
										  <FilterCheckbox
											  name='video_surv_system'
											  title='Видеонаблюдение'
										  />
									  </div>
									</div>
								</CollapsableBlock>
							</div>
					  </div>
				  </Filter>
				</CollapsableBlock>

				<ApartmentsSellTable data={this.props.data} remove={this.handleRemove} entity="apartments_sell" />
			</div>
		);
	}
}

function mapStateToProps(state) {
	const
	  data = (state.filter.data || {}).apartment_sale;

	return {
		allUsers  : state.users.data,
		allClients: state.clients.data,
		allSources: state.property.sources.data,
		data      : data || state.property.apartments_sell.data,
		dealId    : state.active_deal.id,
		propDesc  : state.active_deal.text
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUsers         : bindActionCreators(fetchUsers, dispatch),
		fetchClients       : bindActionCreators(fetchClients, dispatch),
		fetchSources       : bindActionCreators(fetchSources, dispatch),
		fetchApartmentsSell: bindActionCreators(fetchApartmentsSell, dispatch),
		setMainPageData    : bindActionCreators(setMainPageData, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentsToSell);
