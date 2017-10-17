import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Radio from 'generic/components/Form/Radio';
import Select from 'generic/components/Form/Select';
import Textarea from 'generic/components/Form/Textarea';
import ContactField from 'generic/components/Form/ContactField';
import Multicontact from 'generic/components/Form/Multicontact';
import DropField from 'generic/components/Form/DropField';
import AddressFieldset from 'generic/components/Form/Fieldset/AddressFieldset';
import ContactFieldset from 'generic/components/Form/Fieldset/ContactFieldset';
import viewApartmentToRent from 'modules/property/apartments_rent/actions/view';
import fetchUsers from 'modules/users/actions/fetch.js';
import fetchSources from 'modules/property/sources/actions/fetch.js';
import post from 'modules/property/apartments_rent/actions/post.js';
import put from 'modules/property/apartments_rent/actions/put.js';
import findCheck from 'generic/helpers/find-check';
import getName from 'generic/helpers/get-name';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';
import dictionaries from 'generic/dictionaries';

class ApartmentToRentEdit extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	}

	componentWillMount() {
		const
			id = this.props.params.id;

		this.props.fetchUsers();
		this.props.fetchSources();

		if(id != 'new')
			this.props.viewApartmentToRent(id);

		this.setState({entity: 'apartments_rent'});
	}

	render() {
		const
			{allClients, allSources, allUsers, data, item, params, post, put} = this.props,
			{entity} = this.state,

			{
				agent,
				apartment,
				balcony,
				bathroom,
				block,
				city_fias_id,
				comment,
				commodities,
				concierge,
				condition,
				contacts,
				contracts_cooperation,
				contracts_exclusive,
				contracts_view,
				created_at,
				district,
				elite,
				entrance,
				exclusive,
				floor,
				floors,
				from_firm,
				furniture,
				has_boiler,
				has_dish_washer,
				has_fridge,
				has_microwave,
				has_parking,
				has_phone,
				has_split_system,
				has_tv,
				has_vacuum_cleaner,
				has_washing_machine,
				house_fias_id,
				house_number,
				housing_stock,
				id,
				kitchen_sq,
				lastСalled,
				latitude,
				living_sq,
				location,
				loggia,
				longitude,
				metal_plast_windows,
				moderation_at,
				moderation_status,
				net_sale,
				open_sale,
				passenger_lift,
				pledge,
				pref_animals,
				pref_young_children,
				prepay,
				price,
				price_include_electricity,
				price_include_gas,
				price_include_internet,
				price_include_phone,
				price_include_t_v,
				price_include_water,
				related,
				rent_type_all,
				rent_type_day,
				rent_type_for_office,
				rooms,
				service_lift,
				small_household_appliances,
				source,
				special_price,
				street_fias_id,
				terms,
				text_on_the_site,
				total_sq,
				type,
				updated_at,
				wooden_windows,
				wooden_windows_eur,
				yard
			} = params.id === 'new' ? {} : (item || {});

		return (
			<div>
				<div className="content-header">
					<div className="header-section">
						<h1>
							<i className="gi gi-table"></i>
							{params.id === 'new' ? 'Новая квартира для аренды' : `${id} (квартира для аренды)`}
							<br></br>
							<small>Редактирование</small>
						</h1>
					</div>
				</div>

				<div className="block">
					<Form
						data={item}
						entity={entity}
						new={params.id === 'new' ? true : false}
						post={post}
						put={put}

						schema={{
							agent         : 'isRequired',
							condition     : 'isRequired',
							contacts      : 'isRequired',
							city_fias_id  : 'isRequired',
							district      : 'isRequired',
							floor         : 'isInt',
							floors        : 'isInt',
							furniture     : 'isRequired',
							house_fias_id : 'isRequired',
							kitchen_sq    : 'isFloat',
							living_sq     : 'isFloat',
							prepay        : 'isFloat',
							price         : 'isFloat',
							source        : 'isRequired',
							street_fias_id: 'isRequired',
							total_sq      : 'isFloat',
							type          : 'isRequired'
						}}
					>
						{/* Management */}
						<ContactFieldset data={item} />

						{/* Type */}
						<fieldset>
							<legend>Тип</legend>

							<div className="container-fluid">
								<div className="row">
									<div className="col-md-2">
										<Select
											name='type'
											value={type}
											options={dictionaries.apt_types}
											passInt={true}
											placeholder='Выберите тип квартиры'
											required={true}
											title='Тип'
										/>
									</div>

									<div className="col-md-1">
										<Input
											defaultValue={floor}
											name='floor'
											required={true}
											title="Этаж"
											validations='isLength:1'
										/>
									</div>

									<div className="col-md-1">
										<Input
											defaultValue={floors}
											name='floors'
											required={true}
											title="Этажность"
											validations='isLength:1'
										/>
									</div>

									<div className="col-md-1">
										<Input
											defaultValue={rooms}
											name='rooms'
											title="Кол-во комнат"
											validations='isInt'
										/>
									</div>

									<div className="col-md-1">
										<Input
											defaultValue={total_sq}
											name='total_sq'
											required={true}
											title="Пл. (общая)"
											validations='isInt'
										/>
									</div>

									<div className="col-md-1">
										<Input
											defaultValue={living_sq}
											name='living_sq'
											required={true}
											title="Пл. (жилая)"
											validations='isInt'
										/>
									</div>

									<div className="col-md-1">
										<Input
											defaultValue={kitchen_sq}
											name='kitchen_sq'
											required={true}
											title="Пл. (кухня)"
											validations='isInt'
										/>
									</div>

									<div className="col-md-2">
										<Select
											name='housing_stock'
											value={housing_stock}
											options={dictionaries.housing_stock}
											passInt={true}
											placeholder='Выберите фонд'
											title='Фонд'
										/>
									</div>

									<div className="col-md-2">
										<Radio
											checked={elite}
											name='elite'
											options={dictionaries.defaultRadioOptions}
											title='Элитное жильё'
										/>
									</div>
								</div>
							</div>
						</fieldset>

						<AddressFieldset data={item} entity={entity} />

						{/* Price */}
						<fieldset>
							<legend>Цена, р.</legend>

							<div className="container-fluid">
								<div className="row">
									<div className="col-md-2">
										<Input
											defaultValue={price}
											name='price'
											required={true}
											title="Цена"
											validations='isLength:1'
										/>
									</div>

									<div className="col-md-2">
										<Input
											defaultValue={special_price}
											name='special_price'
											title="Спец. цена"
											validations='isLength:1'
										/>
									</div>

									<div className="col-md-2">
										<Input
											defaultValue={prepay}
											name='prepay'
											required={true}
											title="Предоплата"
											validations='isLength:1,isInt'
										/>
									</div>

									<div className="col-md-2">
										<Input
											defaultValue={terms}
											name='terms'
											title="Условия"
											validations='isLength:1'
										/>
									</div>

									<div className="col-md-2">
										<Radio
											checked={net_sale}
											name='net_sale'
											options={dictionaries.defaultRadioOptions}
											title='Чистая продажа'
										/>
									</div>

									<div className="col-md-2">
										<Radio
											checked={pledge}
											name='pledge'
											options={dictionaries.defaultRadioOptions}
											title='Залог'
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-md-2">
										<Radio
											checked={rent_type_all}
											name='rent_type_all'
											options={dictionaries.defaultRadioOptions}
											title='Любой тип аренды'
										/>
									</div>

									<div className="col-md-2">
										<Radio
											checked={rent_type_for_office}
											name='rent_type_for_office'
											options={dictionaries.defaultRadioOptions}
											title='Под офис'
										/>
									</div>

									<div className="col-md-2">
										<Radio
											checked={rent_type_day}
											name='rent_type_day'
											options={dictionaries.defaultRadioOptions}
											title='Посуточно'
										/>
									</div>

									<div className="col-md-6">
										<div className="form-group">
											<CollapsableBlock
												title="Цена включает"
												uniqueId={`apartments-rent-price-include-${id}`}
											>
												<div className="row">
													<div className="col-md-4">
														<Radio
															checked={price_include_phone}
															name='price_include_phone'
															options={dictionaries.defaultRadioOptions}
															title='В стоимость входит телефон'
														/>
													</div>

													<div className="col-md-4">
														<Radio
															checked={price_include_t_v}
															name='price_include_t_v'
															options={dictionaries.defaultRadioOptions}
															title='В стоимость входит телевидение'
														/>
													</div>

													<div className="col-md-4">
														<Radio
															checked={price_include_electricity}
															name='price_include_electricity'
															options={dictionaries.defaultRadioOptions}
															title='В стоимость входит электричество'
														/>
													</div>
												</div>

												<div className="row">
													<div className="col-md-4">
														<Radio
															checked={price_include_water}
															name='price_include_water'
															options={dictionaries.defaultRadioOptions}
															title='В стоимость входит вода'
														/>
													</div>

													<div className="col-md-4">
														<Radio
															checked={price_include_internet}
															name='price_include_internet'
															options={dictionaries.defaultRadioOptions}
															title='В стоимость входит интернет'
														/>
													</div>

													<div className="col-md-4">
														<Radio
															checked={price_include_gas}
															name='price_include_gas'
															options={dictionaries.defaultRadioOptions}
															title='В стоимость входит газ'
														/>
													</div>
												</div>
											</CollapsableBlock>
										</div>
									</div>
								</div>
							</div>
						</fieldset>

						{/* Additional */}
						<fieldset>
							<legend>Дополнительно</legend>

							<div className="container-fluid">
								<div className="row">
									<div className="col-md-4">
										<DropField name='photos' />
									</div>

									<div className="col-md-8">
										<div className="row">
											<div className="col-md-2">
												<Select
													name='condition'
													value={condition}
													options={dictionaries.apt_condition_types}
													passInt={true}
													placeholder='Выберите состояние квартиры'
													required={true}
													title='Состояние'
												/>
											</div>

											<div className="col-md-2">
												<Select
													name='commodities'
													value={commodities}
													options={dictionaries.commodities}
													passInt={true}
													placeholder='Выберите удобства'
													title='Удобства'
												/>
											</div>

											<div className="col-md-2">
												<Select
													name='furniture'
													value={furniture}
													options={dictionaries.furniture}
													passInt={true}
													placeholder='Определите наличие мебели'
													required={true}
													title='Мебель'
												/>
											</div>

											<div className="col-md-3">
												<Select
													name='yard'
													value={yard}
													options={dictionaries.yard_types}
													passInt={true}
													placeholder='Выберите тип двора'
													title='Двор'
												/>
											</div>

											<div className="col-md-3">
												<Select
													name='entrance'
													value={entrance}
													options={dictionaries.entrance_types}
													passInt={true}
													placeholder='Выберите тип въезда'
													title='Въезд'
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-md-2">
												<Select
													name='balcony'
													value={balcony}
													options={dictionaries.balcony_types}
													passInt={true}
													placeholder='Укажите наличие балкона'
													title='Балкон'
												/>
											</div>

											<div className="col-md-2">
												<Select
													name='loggia'
													value={loggia}
													options={dictionaries.balcony_types}
													passInt={true}
													placeholder='Укажите наличие лоджии'
													title='Лоджия'
												/>
											</div>

											<div className="col-md-2">
												<Select
													name='bathroom'
													value={bathroom}
													options={dictionaries.bathroom_types}
													passInt={true}
													placeholder='Укажите наличие санузла'
													title='Санузел'
												/>
											</div>

											<div className="col-md-3">
												<Select
													name='related'
													value={related}
													options={dictionaries.joined_rooms}
													passInt={true}
													placeholder='Выберите количество смежных комнат'
													title='Смежность'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={has_phone}
													name='has_phone'
													options={dictionaries.defaultRadioOptions}
													title='Есть телефон'
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-md-3">
												<Radio
													checked={metal_plast_windows}
													name='metal_plast_windows'
													options={dictionaries.defaultRadioOptions}
													title='Металлопластиковые окна'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={wooden_windows}
													name='wooden_windows'
													options={dictionaries.defaultRadioOptions}
													title='Деревянные окна'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={wooden_windows_eur}
													name='wooden_windows_eur'
													options={dictionaries.defaultRadioOptions}
													title='Деревянные евроокна'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={pref_animals}
													name='pref_animals'
													options={dictionaries.defaultRadioOptions}
													title='С животными'
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-md-3">
												<Radio
													checked={pref_young_children}
													name='pref_young_children'
													options={dictionaries.defaultRadioOptions}
													title='С детьми'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={has_parking}
													name='has_parking'
													options={dictionaries.defaultRadioOptions}
													title='Парковка'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={concierge}
													name='concierge'
													options={dictionaries.defaultRadioOptions}
													title='Консьерж'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={passenger_lift}
													name='passenger_lift'
													options={dictionaries.defaultRadioOptions}
													title='Пассажирский лифт'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={service_lift}
													name='service_lift'
													options={dictionaries.defaultRadioOptions}
													title='Грузовой лифт'
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<CollapsableBlock
												title="Бытовая техника"
												uniqueId={`apartments-rent-apliances-${id}`}
											>
												<div className="row">
													<div className="col-md-4">
														<Radio
															checked={has_boiler}
															name='has_boiler'
															options={dictionaries.defaultRadioOptions}
															title='Бойлер'
														/>
													</div>

													<div className="col-md-4">
														<Radio
															checked={has_microwave}
															name='has_microwave'
															options={dictionaries.defaultRadioOptions}
															title='Микроволновая печь'
														/>
													</div>

													<div className="col-md-4">
														<Radio
															checked={has_vacuum_cleaner}
															name='has_vacuum_cleaner'
															options={dictionaries.defaultRadioOptions}
															title='Пылесос'
														/>
													</div>
												</div>

												<div className="row">
													<div className="col-md-4">
														<Radio
															checked={has_dish_washer}
															name='has_dish_washer'
															options={dictionaries.defaultRadioOptions}
															title='Посудомоечная машина'
														/>
													</div>

													<div className="col-md-4">
														<Radio
															checked={has_split_system}
															name='has_split_system'
															options={dictionaries.defaultRadioOptions}
															title='Сплит-система'
														/>
													</div>

													<div className="col-md-4">
														<Radio
															checked={has_washing_machine}
															name='has_washing_machine'
															options={dictionaries.defaultRadioOptions}
															title='Стиральная машина'
														/>
													</div>
												</div>

												<div className="row">
													<div className="col-md-4">
														<Radio
															checked={has_fridge}
															name='has_fridge'
															options={dictionaries.defaultRadioOptions}
															title='Холодильник'
														/>
													</div>

													<div className="col-md-4">
														<Radio
															checked={has_tv}
															name='has_tv'
															options={dictionaries.defaultRadioOptions}
															title='Телевизор'
														/>
													</div>

													<div className="col-md-4">
														<Radio
															checked={small_household_appliances}
															name='small_household_appliances'
															options={dictionaries.defaultRadioOptions}
															title='Мелкая бытовая техника'
														/>
													</div>
												</div>
											</CollapsableBlock>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<Textarea
											defaultValue={comment}
											name='comment'
											rows={5}
											title="Комментарий"
										/>
									</div>

									<div className="col-md-6">
										<Textarea
											defaultValue={text_on_the_site}
											name='text_on_the_site'
											rows={5}
											title="Текст для объявления"
										/>
									</div>
								</div>
							</div>
						</fieldset>
					</Form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		allSources : state.property.sources.data,
		allUsers   : state.users.data,
		item       : state.property.apartments_rent.view
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchSources       : bindActionCreators(fetchSources, dispatch),
		fetchUsers         : bindActionCreators(fetchUsers, dispatch),
		post               : bindActionCreators(post, dispatch),
		put                : bindActionCreators(put, dispatch),
		viewApartmentToRent: bindActionCreators(viewApartmentToRent, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentToRentEdit);
