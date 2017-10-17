import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import fetchHouses from 'modules/property/houses/actions/fetch.js';
import fetchClients from 'modules/clients/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import fetchSources from 'modules/property/sources/actions/fetch.js';
import showModal from 'modules/main_page/actions/show_modal.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import Filter from 'generic/components/Filter';
import FilterAddressFieldset from 'generic/components/Filter/Fieldset/AddressFieldset';
import FilterInput from 'generic/components/Filter/FilterInput';
import FilterMulticomplete from 'generic/components/Filter/FilterMulticomplete';
import FilterMulticontact from 'generic/components/Filter/FilterMulticontact';
import FilterCheckbox from 'generic/components/Filter/FilterCheckbox';
import Modal from 'generic/components/Modal';
import dictionaries from 'generic/dictionaries';
import HousesTable from '../../../components/HousesTable'

class Houses extends React.Component {
	componentWillMount() {
		this.setState({entity: 'houses'});
		this.props.fetchHouses();
		this.props.fetchClients();
		this.props.fetchUsers();
		this.props.fetchSources();
		this.props.setMainPageData({activePage: "houses"});
	}

	handleRemove = (e, id) => {
		e.preventDefault();
		this.props.remove(id);
	}

	render() {
		const
			{dealId, post, propDesc, showModal} = this.props,
			{entity} = this.state;

		return (
			<div>
				<div className="content-header">
					<div className="header-section">
						<h1>
							<p className="pull-right text-right">
								<button
									className="btn btn-sm btn-default btn-block"
									onClick={() => showModal('houses-add-prop-modal', true)}
								>
									Добавить из старой базы
								</button>

								<Link to='/houses/new/edit' className="btn btn-sm btn-success">Добавить</Link>
							</p>

							Дома
							<br></br>
							<small>Таблица всех домовладений</small>
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
					<Filter entity='house'>
						<div className="container-fluid">
							<FilterAddressFieldset entity='house'/>

							<div className="row">
								<fieldset>
									<legend>Дом</legend>

									<div className="col-md-4">
										<FilterMulticomplete
											name='type'
											data={dictionaries.house_types}
											title='Тип'
										/>
									</div>

									<div className="col-md-4">
										<FilterMulticomplete
											name='condition'
											data={dictionaries.apt_condition_types}
											title='Состояние'
										/>
									</div>

									<div className="col-md-4">
										<FilterMulticomplete
											name='material'
											data={dictionaries.house_wall_materials}
											title='Материал стен'
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
														{id: 4, name: '>', value: '>'},
														{id: 5, name: '<', value: '<'},
														{id: 6, name: '≥', value: '>='},
														{id: 7, name: '≤', value: '<='}
													]}

													title="Пл. (общая, м. кв.)"
												/>
											</div>

											<div className="col-md-4">
												<FilterInput
													name='living_sq'

													operators={[
														{id: 1, name: '',  value: ''},
														{id: 2, name: '=', value: '='},
														{id: 4, name: '>', value: '>'},
														{id: 5, name: '<', value: '<'},
														{id: 6, name: '≥', value: '>='},
														{id: 7, name: '≤', value: '<='}
													]}

													title="Пл. (жилая, м. кв.)"
												/>
											</div>

											<div className="col-md-4">
												<FilterInput
													name='kitchen_sq'

													operators={[
														{id: 1, name: '',  value: ''},
														{id: 2, name: '=', value: '='},
														{id: 4, name: '>', value: '>'},
														{id: 5, name: '<', value: '<'},
														{id: 6, name: '≥', value: '>='},
														{id: 7, name: '≤', value: '<='}
													]}

													title="Пл. (кухня, м. кв.)"
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
													name='floors'

													operators={[
														{id: 1, name: '',  value: ''},
														{id: 2, name: '=', value: '='},
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
												{id: 4, name: '>', value: '>'},
												{id: 5, name: '<', value: '<'},
												{id: 6, name: '≥', value: '>='},
												{id: 7, name: '≤', value: '<='}
											]}

											title="Спец. цена"
										/>
									</div>
								</fieldset>
							</div>

							<div className="form-group">
								<CollapsableBlock
								  title='Дополнительно'
								  uniqueId='houses-filter-more-collapsable'
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
												name='yard'
												data={dictionaries.yard_types}
												title='Двор'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='right_type_object'
												data={dictionaries.object_right_types}
												title='Вид права на дом'
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
												name='right_type_land'
												data={dictionaries.land_right_types}
												title='Вид права на земельный участок'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='floor_type'
												data={dictionaries.floor_types}
												title='Полы'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='communic_gas'
												data={dictionaries.communic_gas}
												title='Газ'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='communic_phone'
												data={dictionaries.communic_phone}
												title='Телефон'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='communic_water'
												data={dictionaries.communic_water}
												title='Вода'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='communic_canalisation'
												data={dictionaries.communic_canalisation}
												title='Канализация'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='communic_electricity'
												data={dictionaries.communic_electricity}
												title='Электричество'
											/>
										</div>
									</div>

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
												name='relief'
												data={dictionaries.landform_types}
												title='Рельеф участка'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='entrance_type'
												data={dictionaries.entrance_types}
												title='Въезд'
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
												name='land_location'
												data={dictionaries.placement}
												title='Расположение'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='bathroom'
												data={dictionaries.bathroom_types}
												title='Санузел'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='roof_type'
												data={dictionaries.roof_types}
												title='Крыша'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='heating'
												data={dictionaries.heating_types}
												title='Отопление'
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
												name='exclusive'
												title="Эксклюзивность"
											/>
										</div>

										<div className="col-md-2">
											<FilterInput
												name='ground_area'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Зем. участок (сот)"
											/>
										</div>

										<div className="col-md-2">
											<FilterInput
												name='rooms'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Количество комнат"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='elite'
												title="Элитное жильё"
											/>
										</div>

										<div className="col-md-2">
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

										<div className="col-md-2">
											<FilterCheckbox
												name='has_pool'
												title="Система кондиционирования"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='air_conditioning_system'
												title="Бассейн"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='access_control_system'
												title="Система контроля доступа"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='walkway_heating_system'
												title="Система обогрева дорожек"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='comb_ventilation_system'
												title="Система приточно-вытяжной вентиляции"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='home_security_alarm'
												title="Охранная сигнализация"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='video_surv_system'
												title="Система видеонаблюдения"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='voltage_stab_system'
												title="Система стабилизации напряжения"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='comb_ventilation_system'
												title="Система приточно-вытяжной вентиляции"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='automatic_watering_land'
												title="Система автополива участка"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='land_security_alarm'
												title="Периметральная сигнализация участка"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='home_fire_alarm'
												title="Пожарная сигнализация дома"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='backup_power_system'
												title="Система резервного электроснабжения"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='water_purification_system'
												title="Система очистки воды"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='central_dust_extraction_system'
												title="Система центрального пылеудаления"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='local_street_cooling_system'
												title="Система локального охлаждения улицы"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='roof_heating_system'
												title="Система обогрева кровли"
											/>
										</div>

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
												name='has_bathhouse'
												title="Баня"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='has_pool'
												title="Бассейн"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_paving'
												title="Мощение"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_landscaping'
												title="Ландшафтный дизайн"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_garden'
												title="Сад"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_kitchen_garden'
												title="Огород"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='wooden_windows'
												title="Деревянные окна"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='garage'
												title="Гараж"
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
												name='metal_plast_windows'
												title="Металлопластиковые окна"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='exit_to_pond'
												title="Выход к водоему"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='surveying'
												title="Межевание"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_yard'
												title="Наличие преддомовой территории"
											/>
										</div>
									</div>
								</CollapsableBlock>
							</div>
						</div>
					</Filter>
				</CollapsableBlock>

				<HousesTable data={this.props.data} remove={this.handleRemove} entity={entity} />

				<Modal header='Введите ID объекта' submitText='Найти' uniqueId='houses-add-prop-modal'>
					ID объекта
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const
		data = (state.filter.data || {}).house;

	return {
		allClients: state.clients.data,
		allUsers  : state.users.data,
		allSources: state.property.sources.data,
		data	  : data || state.property.houses.data,
		dealId    : state.active_deal.id,
		propDesc  : state.active_deal.text

	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchClients   : bindActionCreators(fetchClients, dispatch),
		fetchUsers	   : bindActionCreators(fetchUsers, dispatch),
		fetchSources   : bindActionCreators(fetchSources, dispatch),
		fetchHouses    : bindActionCreators(fetchHouses, dispatch),
		setMainPageData: bindActionCreators(setMainPageData, dispatch),
		showModal      : bindActionCreators(showModal, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Houses);
