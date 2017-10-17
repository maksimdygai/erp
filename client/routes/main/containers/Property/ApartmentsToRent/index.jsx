import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import fetchApartmentsRent from 'modules/property/apartments_rent/actions/fetch.js';
import fetchClients from 'modules/clients/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import fetchSources from 'modules/property/sources/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import Filter from 'generic/components/Filter';
import FilterAddressFieldset from 'generic/components/Filter/Fieldset/AddressFieldset';
import FilterInput from 'generic/components/Filter/FilterInput';
import FilterMulticomplete from 'generic/components/Filter/FilterMulticomplete';
import FilterMulticontact from 'generic/components/Filter/FilterMulticontact';
import FilterCheckbox from 'generic/components/Filter/FilterCheckbox';
import dictionaries from 'generic/dictionaries';
import ApartmentsRentTable from '../../../components/ApartmentsRentTable'

class ApartmentsToRent extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	}

	componentWillMount(){
		this.props.fetchApartmentsRent();
		this.props.fetchClients();
		this.props.fetchUsers();
		this.props.fetchSources();
		this.props.setMainPageData({activePage: "apartments_to_rent"});
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
							<Link to='/apartments_rent/new/edit' className="btn btn-success btn-sm pull-right">Добавить</Link>
							Квартиры (аренда)
							<br></br>
							<small>Таблица всех сдающихся в аренду квартир</small>
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
				  uniqueId='apartments-to-rent-filter-collapsable'
				>
					<Filter entity='apartment_rent'>
						<div className="container-fluid">
							<FilterAddressFieldset entity='apartment_rent'/>	

							<div className="row">
								<fieldset>
									<legend>Дом</legend>

									<div className="col-md-4">
										<FilterMulticomplete
											name='type'
											data={dictionaries.apt_types}
											title='Тип'
										/>
									</div>

									<div className="col-md-4">
										<FilterMulticomplete
											name='housing_stock'
											data={dictionaries.housing_stock}
											title='Фонд'
										/>
									</div>

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

													title="Пл. (общая)"
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

													title="Пл. (жилая)"
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

													title="Пл. (кухня)"
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

													title="Этаж"
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

													title="Этажность"
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

											title="Цена"
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

											title="Спец. цена"
										/>
									</div>

									<div className="col-md-3">
										<FilterInput
											name='prepay'

											operators={[
												{id: 1, name: '',  value: ''},
												{id: 2, name: '=', value: '='},
												{id: 3, name: '≠', value: '!='},
												{id: 4, name: '>', value: '>'},
												{id: 5, name: '<', value: '<'},
												{id: 6, name: '≥', value: '>='},
												{id: 7, name: '≤', value: '<='}
											]}

											title="Предоплата"
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

											title="Условия"
										/>
									</div>
								</fieldset>
							</div>

							<div className="form-group">
								<CollapsableBlock
								  title='Дополнительно'
								  uniqueId='apartments-to-rent-filter-more-collapsable'
								>
									<div className="row">
										<div className="col-md-4">
										 	<FilterMulticomplete
												name='source'
												data={this.props.allSources}
												title='Источник'
										 	/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='commodities'
												data={dictionaries.commodities}
												title='Удобства'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='furniture'
												data={dictionaries.furniture}
												title='Мебель'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='yard'
												data={dictionaries.yard_types}
												title='Двор'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='entrance'
												data={dictionaries.entrance_types}
												title='Въезд'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='balcony'
												data={dictionaries.balcony_types}
												title='Балкон'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='loggia'
												data={dictionaries.balcony_types}
												title='Лоджия'
											/>
										</div>

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
												title='Смежность'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterInput
												name='rooms'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 3, name: '≠', value: '!='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Кол-ва комнат"
											/>
										</div>
									</div>

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
												name='moderation_status'
												data={dictionaries.moderation_status_types}
												title='Статус модерации'
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
												name='from_firm'
												title="Информация от организации"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_phone'
												title="Есть телефон"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='elite'
												title="Элитное жильё"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='pledge'
												title="Залог"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='price_include_phone'
												title="В стоимость входит телефон"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='price_include_t_v'
												title="В стоимость входит телевидение"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='rent_type_all'
												title="Любой тип аренды"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='price_include_electricity'
												title="В стоимость входит электричество"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='price_include_water'
												title="В стоимость входит вода"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
										  <FilterCheckbox
											name='rent_type_day'
											title="Посуточно"
										  />
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='price_include_internet'
												title="В стоимость входит интернет"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='price_include_gas'
												title="В стоимость входит газ"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='rent_type_for_office'
												title="Под офис"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='metal_plast_windows'
												title="Металлопластиковые окна"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='pref_animals'
												title="С животными"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='has_boiler'
												title="Бойлер"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_microwave'
												title="Микроволновая печь"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_vacuum_cleaner'
												title="Пылесос"
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
												name='has_parking'
												title="Парковка"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_dish_washer'
												title="Посудомоечная машина"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='has_split_system'
												title="Сплит-система"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_washing_machine'
												title="Стиральная машина"
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
												name='pref_young_children'
												title="С детьми"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_fridge'
												title="Холодильник"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_tv'
												title="Телевизор"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='small_household_appliances'
												title="Мелкая бытовая техника"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='concierge'
												title="Консьерж"
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
												name='service_lift'
												title="Грузовой лифт"
											/>
										</div>
									</div>
								</CollapsableBlock>
							</div>
						</div>
					</Filter>
				</CollapsableBlock>

				<ApartmentsRentTable data={this.props.data} remove={this.handleRemove} entity="apartments_rent" />
			</div>
		);
	}
}

function mapStateToProps(state) {
	const
		data = (state.filter.data || {}).apartment_rent;

	return {
		allClients: state.clients.data,
		allUsers  : state.users.data,
		allSources: state.property.sources.data,
		data      : data || state.property.apartments_rent.data,
		dealId    : state.active_deal.id,
		propDesc  : state.active_deal.text
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchClients       : bindActionCreators(fetchClients, dispatch),
		fetchUsers         : bindActionCreators(fetchUsers, dispatch),
		fetchSources       : bindActionCreators(fetchSources, dispatch),
		fetchApartmentsRent: bindActionCreators(fetchApartmentsRent, dispatch),
		setMainPageData    : bindActionCreators(setMainPageData, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentsToRent);
