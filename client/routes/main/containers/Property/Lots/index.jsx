import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import fetchLots from 'modules/property/lots/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import fetchClients from 'modules/clients/actions/fetch.js';
import fetchSources from 'modules/property/sources/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import Filter from 'generic/components/Filter';
import FilterAddressFieldset from 'generic/components/Filter/Fieldset/AddressFieldset';
import FilterMulticontact from 'generic/components/Filter/FilterMulticontact';
import FilterMulticomplete from 'generic/components/Filter/FilterMulticomplete';
import FilterInput from 'generic/components/Filter/FilterInput';
import FilterCheckbox from 'generic/components/Filter/FilterCheckbox';
import dictionaries from 'generic/dictionaries';
import LotsTable from '../../../components/LotsTable'

class Lots extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	}

	componentWillMount(){
		this.props.fetchLots();
		this.props.fetchClients();
		this.props.fetchSources();
		this.props.fetchUsers();
		this.props.setMainPageData({activePage: "lots"});
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
							<Link to='/lots/new/edit' className="btn btn-success btn-sm pull-right">Добавить</Link>
							Участки
							<br></br>
							<small>Таблица всех участков</small>
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
					uniqueId='lots-filter-collapsable'
				>
					<Filter entity='land'>
						<div className="container-fluid">
							<FilterAddressFieldset entity='land'/>

							<div className="row">
								<fieldset>
									<legend>Участок</legend>
									
									<div className="col-md-4">
										<FilterMulticomplete
											name='type'
											data={dictionaries.house_types}
											title='Тип'
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
													name='ground_area'

													operators={[
														{id: 1, name: '',  value: ''},
														{id: 2, name: '=', value: '='},
														{id: 4, name: '>', value: '>'},
														{id: 5, name: '<', value: '<'},
														{id: 6, name: '≥', value: '>='},
														{id: 7, name: '≤', value: '<='}
													]}

													title="Площадь (сот)"
												/>
											</div>

											<div className="col-md-4">
												<FilterInput
													name='measurement_x'

													operators={[
														{id: 1, name: '',  value: ''},
														{id: 2, name: '=', value: '='},
														{id: 4, name: '>', value: '>'},
														{id: 5, name: '<', value: '<'},
														{id: 6, name: '≥', value: '>='},
														{id: 7, name: '≤', value: '<='}
													]}

													title="Длина участка"
												/>
											</div>

											<div className="col-md-4">
												<FilterInput
													name='measurement_y'

													operators={[
														{id: 1, name: '',  value: ''},
														{id: 2, name: '=', value: '='},
														{id: 4, name: '>', value: '>'},
														{id: 5, name: '<', value: '<'},
														{id: 6, name: '≥', value: '>='},
														{id: 7, name: '≤', value: '<='}
													]}

													title="Ширина участка"
												/>
											</div>
										</div>
									</fieldset>
								</div>

								<div className="col-md-5">
									<fieldset>
										<div className="row">
											<legend>Цена</legend>

											<div className="col-md-6">
												<FilterInput
													name='price'

													operators={[
														{id: 1, name: '',  value: ''},
														{id: 2, name: '=', value: '='},
														{id: 4, name: '>', value: '>'},
														{id: 5, name: '<', value: '<'},
														{id: 6, name: '≥', value: '>='},
														{id: 7, name: '≤', value: '<='}
													]}

													title="Цена"
												/>
											</div>

											<div className="col-md-6">
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

													title="Специальная цена"
												/>
											</div>
										</div>
									</fieldset>
								</div>
							</div>

							<div className="form-group">
								<CollapsableBlock
								  title='Дополнительно'
								  uniqueId='lots-filter-more-collapsable'
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
												name='right_type_land'
												data={dictionaries.land_right_types}
												title='Тип права'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='land_position'
												data={dictionaries.placement}
												title='Расположение'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='communic_gas'
												data={dictionaries.communic_gas}
												title='Газ'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='communic_water'
												data={dictionaries.communic_water}
												title='Вода'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='relief'
												data={dictionaries.relief_types}
												title='Рельеф'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='communic_electricity'
												data={dictionaries.communic_electricity}
												title='Электричество'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='communic_phone'
												data={dictionaries.communic_phone}
												title='Телефон'
											/>
										</div>

										<div className="col-md-4">
											<FilterMulticomplete
												name='communic_canalisation'
												data={dictionaries.communic_canalisation}
												title='Канализация'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-4">
											<FilterMulticomplete
												name='entrance_type'
												data={dictionaries.entrance_road_types}
												title='Подъезд к участку'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterInput
												name='roadway_width'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Ширина проезжей части"
											/>
										</div>

										<div className="col-md-2">
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

										<div className="col-md-2">
											<FilterInput
												name='facade_width'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
													{id: 4, name: '>', value: '>'},
													{id: 5, name: '<', value: '<'},
													{id: 6, name: '≥', value: '>='},
													{id: 7, name: '≤', value: '<='}
												]}

												title="Ширина фасада"
											/>
										</div>

										<div className="col-md-6">
											<FilterInput
												name='terms'

												operators={[
													{id: 1, name: '',  value: ''},
													{id: 2, name: '=', value: '='},
												]}

												title="Условия"
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
												name='surveying'
												title="Межевание"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='elite'
												title="Элитное жилье"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='is_garden'
												title="Садоводческий участок"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='ldland_contract_of_sale'
												title="Договор купли-продажи"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='ldland_certificate_of_inheritance'
												title="Свидетельство о наследовании"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='ldland_protocols_auction'
												title="Протоколы торгов аукциона"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='ldland_contract_of_gift'
												title="Договор дарения"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='ldland_agreement_sharing_property'
												title="Соглашение о разделе совместно нажитого имущества"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='ldland_agreement_compensation'
												title="Договор об отступном"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='ldland_barter_contract'
												title="Договор мены"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='ldland_agreemen_alloc_owner_interest'
												title="Соглашение о выделении доли в праве собственности"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='ldland_court_dec_amicable_agr'
												title="Решение суда или мировое соглашение"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='ldland_decree_local_administration'
												title="Постановление местной администрации"
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
												name='has_adjoining_territory'
												title="Наличие прилегающей к участку территории"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='net_sale'
												title="Чистая продажа"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='payment_for_water'
												title="Оплачена вода"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='payment_for_electricity'
												title="Оплачено электричество"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='payment_for_gas'
												title="Оплачен газ"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='payment_for_canalization'
												title="Оплачена канализация"
											/>
										</div>

										<div className="col-md-2">
											<FilterCheckbox
												name='has_cafes'
												title="Бары и кафе"
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-2">
											<FilterCheckbox
												name='has_educational'
												title="Образовательные учреждения"
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
												name='has_hospitals'
												title="Больницы и диагностические центры"
											/>
										</div>
									</div>
								</CollapsableBlock>
							</div>
						</div>
					</Filter>
				</CollapsableBlock>

				<LotsTable data={this.props.data} remove={this.handleRemove} entity="lots" />
			</div>
		);
	}
}

function mapStateToProps(state) {
	const
		data = (state.filter.data || {}).land;

	return {
		allClients: state.clients.data,
		allUsers  : state.users.data,
		allSources: state.property.sources.data,
		data	  : data || state.property.lots.data,
		dealId    : state.active_deal.id,
		propDesc  : state.active_deal.text
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchLots      : bindActionCreators(fetchLots, dispatch),
		fetchClients   : bindActionCreators(fetchClients, dispatch),
		fetchUsers	   : bindActionCreators(fetchUsers, dispatch),
		fetchSources   : bindActionCreators(fetchSources, dispatch),
		setMainPageData: bindActionCreators(setMainPageData, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Lots);
