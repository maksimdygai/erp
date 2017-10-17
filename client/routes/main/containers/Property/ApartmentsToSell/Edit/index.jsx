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
import Datepicker from 'generic/components/Form/Datepicker';
import DropField from 'generic/components/Form/DropField';
import AddressFieldset from 'generic/components/Form/Fieldset/AddressFieldset';
import ContactFieldset from 'generic/components/Form/Fieldset/ContactFieldset';
import viewApartmentToSell from 'modules/property/apartments_sell/actions/view';
import post from 'modules/property/apartments_sell/actions/post.js';
import put from 'modules/property/apartments_sell/actions/put.js';
import findCheck from 'generic/helpers/find-check';
import getName from 'generic/helpers/get-name';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';
import dictionaries from 'generic/dictionaries';

class ApartmentToSellEdit extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	}

	componentWillMount() {
		const
			id = this.props.params.id;

		if(id != 'new')
			this.props.viewApartmentToSell(id);

		this.setState({entity: 'apartments_sell'});
	}

	render() {
		const
			{data, item, params, post, put} = this.props,
			{entity} = this.state,

			{
				access_control,
				agent,
				apartment,
				appart_on_floor,
				backup_power_system,
				balcony,
				bathroom,
				block,
				building_year,
				ceiling_height,
				city_fias_id,
				comment,
				commodities,
				completed,
				completed_at,
				concierge,
				condition,
				contacts,
				contracts_cooperation,
				contracts_exclusive,
				contracts_view,
				created_at,
				distance_to_stations,
				district,
				elite,
				exclusive,
				floor,
				floor_type,
				floors,
				for_rent,
				from_firm,
				guardrail,
				has_cafes,
				has_cinemas,
				has_dedic_parking,
				has_educational,
				has_hospitals,
				heating,
				hot_water,
				house_fias_id,
				house_territory,
				housing_stock,
				id,
				kitchen_sq,
				lastСalled,
				latitude,
				ldapsale_agreemen_alloc_owner_interest,
				ldapsale_agreement_compensation,
				ldapsale_agreement_sharing_property,
				ldapsale_barter_contract,
				ldapsale_certificate_of_inheritance,
				ldapsale_certificate_of_payment,
				ldapsale_contract_of_gift,
				ldapsale_contract_of_sale,
				ldapsale_court_dec_amicable_agr,
				ldapsale_decree_local_administration,
				ldapsale_investment_contract,
				ldapsale_privatization_contract,
				ldapsale_rent_contract,
				ldapsale_share_contract,
				lift_parking_connect,
				living_sq,
				location,
				loggia,
				longitude,
				material,
				metal_plast_windows,
				moderation_at,
				moderation_status,
				mortgage,
				net_sale,
				open_sale,
				owners_num,
				parking_num,
				passenger_lift,
				placement,
				price,
				purchase_year,
				redevelopment,
				related,
				secure_parking,
				service_lift,
				source,
				special_price,
				street_fias_id,
				terms,
				text_on_the_site,
				total_sq,
				type,
				underage_owners_num,
				unfinished,
				updated_at,
				urgent_sell,
				video_surv_system,
				windows_to_street,
				windows_to_yard,
				wooden_windows,
				wooden_windows_eur
			} = params.id === 'new' ? {} : (item || {});

		return (
			<div>
				<div className="content-header">
					<div className="header-section">
						<h1>
							<i className="gi gi-table"></i>
							{params.id === 'new' ? 'Новая квартира для продажи' : `${id} (квартира для продажи)`}
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
							apartment     : 'isRequired',
							balcony       : 'isRequired',
							bathroom      : 'isRequired',
							city_fias_id  : 'isRequired',
							condition     : 'isRequired',
							contacts      : 'isRequired',
							district      : 'isRequired',
							floor         : 'isInt',
							floors        : 'isInt',
							heating       : 'isRequired',
							house_fias_id : 'isRequired',
							housing_stock : 'isRequired',
							kitchen_sq    : 'isFloat',
							living_sq     : 'isFloat',
							loggia        : 'isRequired',
							material      : 'isRequired',
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
									<div className="col-md-4">
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

									<div className="col-md-3">
										<Select
											name='material'
											value={material}
											options={dictionaries.building_wall_materials}
											passInt={true}
											placeholder='Выберите материал стен здания'
											required={true}
											title='Материал стен здания'
										/>
									</div>

									<div className="col-md-3">
										<Select
											name='housing_stock'
											value={housing_stock}
											options={dictionaries.housing_stock}
											passInt={true}
											placeholder='Выберите фонд'
											required={true}
											title='Фонд'
										/>
									</div>
								</div>

								<div className="row">
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
										<Input
											defaultValue={building_year}
											name='building_year'
											title="Год постройки"
											validations='isInt'
										/>
									</div>

									<div className="col-md-2">
										<Datepicker
											defaultDate={moment(completed_at)}
											name='completed_at'
											title="Дата сдачи"
											validations='isLength:1'
										/>
									</div>

									<div className="col-md-2">
										<Radio
											checked={unfinished}
											name='unfinished'

											options={[
												{label: 'Не уст.', value: 0},
												{label: 'Да'     , value: 1},
												{label: 'Нет'    , value: 2}
											]}

											title='Стройвариант'
										/>
									</div>

									<div className="col-md-3">
										<Radio
											checked={elite}
											name='elite'

											options={[
												{label: 'Не уст.', value: 0},
												{label: 'Да'     , value: 1},
												{label: 'Нет'    , value: 2}
											]}

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
									<div className="col-md-1">
										<Input
											defaultValue={price}
											name='price'
											required={true}
											title="Цена"
											validations='isLength:1'
										/>
									</div>

									<div className="col-md-1">
										<Input
											defaultValue={special_price}
											name='special_price'
											title="Спец. цена"
											validations='isLength:1'
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

											options={[
												{label: 'Не уст.', value: 0},
												{label: 'Да'     , value: 1},
												{label: 'Нет'    , value: 2}
											]}

											title='Чистая продажа'
										/>
									</div>

									<div className="col-md-2">
										<Radio
											checked={mortgage}
											name='mortgage'

											options={[
												{label: 'Не уст.', value: 0},
												{label: 'Да'     , value: 1},
												{label: 'Нет'    , value: 2}
											]}

											title='Ипотека'
										/>
									</div>

									<div className="col-md-2">
										<Radio
											checked={urgent_sell}
											name='urgent_sell'

											options={[
												{label: 'Не уст.', value: 0},
												{label: 'Да'     , value: 1},
												{label: 'Нет'    , value: 2}
											]}

											title='Срочная продажа'
										/>
									</div>

									<div className="col-md-2">
										<Radio
											checked={for_rent}
											name='for_rent'

											options={[
												{label: 'Не уст.', value: 0},
												{label: 'Да'     , value: 1},
												{label: 'Нет'    , value: 2}
											]}

											title='Сдаётся в аренду'
										/>
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
											<div className="col-md-3">
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

											<div className="col-md-3">
												<Select
													name='bathroom'
													value={bathroom}
													options={dictionaries.bathroom_types}
													passInt={true}
													placeholder='Выберите тип санузла'
													required={true}
													title='Санузел'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={concierge}
													name='concierge'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Консьерж'
												/>
											</div>

											<div className="col-md-3">
												<Input
													defaultValue={ceiling_height}
													name='ceiling_height'
													title="Высота потолков"
													validations='isInt'
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-md-3">
												<Select
													name='floor_type'
													value={floor_type}
													options={dictionaries.floor_types}
													passInt={true}
													placeholder='Выберите тип полов'
													title='Полы'
												/>
											</div>

											<div className="col-md-3">
												<Select
													name='hot_water'
													value={hot_water}
													options={dictionaries.hot_water}
													passInt={true}
													placeholder='Выберите тип нагрева воды'
													title='Горячая вода'
												/>
											</div>

											<div className="col-md-3">
												<Select
													name='heating'
													value={heating}
													options={dictionaries.heating_types}
													passInt={true}
													placeholder='Выберите тип отопления'
													required={true}
													title='Отопление'
												/>
											</div>

											<div className="col-md-3">
												<Input
													defaultValue={purchase_year}
													name='purchase_year'
													title="Год покупки"
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-md-3">
												<Select
													name='loggia'
													value={loggia}
													options={dictionaries.loggia}
													passInt={true}
													placeholder='Выберите тип лоджии'
													required={true}
													title='Лоджия'
												/>
											</div>

											<div className="col-md-3">
												<Select
													name='commodities'
													value={commodities}
													options={dictionaries.commodities}
													passInt={true}
													placeholder='Выберите удобства'
													title='Удобства'
												/>
											</div>

											<div className="col-md-3">
												<Select
													name='balcony'
													value={balcony}
													options={dictionaries.balcony_types}
													passInt={true}
													placeholder='Выберите тип балкона'
													required={true}
													title='Балкон'
												/>
											</div>

											<div className="col-md-3">
												<Select
													name='related'
													value={related}
													options={dictionaries.joined_rooms}
													passInt={true}
													placeholder='Выберите количество смежных комнат'
													title='Смежные комнаты'
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-md-3">
												<Input
													defaultValue={appart_on_floor}
													name='appart_on_floor'
													title="Квартир на этаже"
												/>
											</div>

											<div className="col-md-3">
												<Select
													name='placement'
													value={placement}
													options={dictionaries.placement}
													passInt={true}
													placeholder='Выберите расположение квартиры'
													title='Расположение'
												/>
											</div>

											<div className="col-md-3">
												<Input
													defaultValue={distance_to_stations}
													name='distance_to_stations'
													title="Расстояние до остановок"
													validations='isLength:1'
												/>
											</div>

											<div className="col-md-3">
												<Input
													defaultValue={owners_num}
													name='owners_num'
													title="Количество собственников"
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-md-3">
												<Input
													defaultValue={underage_owners_num}
													name='underage_owners_num'
													title="Несовершеннолетних собственников"
												/>
											</div>

											<div className="col-md-3">
												<Input
													defaultValue={parking_num}
													name='parking_num'
													title="Парковочных мест"
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={redevelopment}
													name='redevelopment'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Перепланировка'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={house_territory}
													name='house_territory'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Придомовая территория'
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-md-3">
												<Radio
													checked={windows_to_yard}
													name='windows_to_yard'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Окна во двор'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={windows_to_street}
													name='windows_to_street'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Окна на улицу'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={wooden_windows}
													name='wooden_windows'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Деревянные окна'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={wooden_windows_eur}
													name='wooden_windows_eur'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Деревянные евроокна'
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-md-3">
												<Radio
													checked={metal_plast_windows}
													name='metal_plast_windows'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Металлопластиковые окна'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={guardrail}
													name='guardrail'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Ограждение'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={backup_power_system}
													name='backup_power_system'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Резервное электроснабжение'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={access_control}
													name='access_control'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Контроль доступа'
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-md-3">
												<Radio
													checked={passenger_lift}
													name='passenger_lift'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Пассажирский лифт'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={service_lift}
													name='service_lift'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Грузовой лифт'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={lift_parking_connect}
													name='lift_parking_connect'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Связь лифта с парковкой'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={has_dedic_parking}
													name='has_dedic_parking'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Выделенная парковка'
												/>
											</div>
										</div>

										<div className="row">
											<div className="col-md-3">
												<Radio
													checked={has_dedic_parking}
													name='has_dedic_parking'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Выделенная парковка'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={secure_parking}
													name='secure_parking'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Охраняемая парковка'
												/>
											</div>

											<div className="col-md-3">
												<Radio
													checked={video_surv_system}
													name='video_surv_system'

													options={[
														{label: 'Не уст.', value: 0},
														{label: 'Да'     , value: 1},
														{label: 'Нет'    , value: 2}
													]}

													title='Видеонаблюдение'
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<CollapsableBlock
												title='Инфраструктура'
												uniqueId={`apartments-sell-infrastructure-${id}`}
											>
												<div className="row">
													<div className="col-md-6">
														<Radio
															checked={has_cafes}
															name='has_cafes'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Бары и кафе'
														/>
													</div>

													<div className="col-md-6">
														<Radio
															checked={has_cinemas}
															name='has_cinemas'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Кинотеатры'
														/>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6">
														<Radio
															checked={has_hospitals}
															name='has_hospitals'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Больницы и диагностические центры'
														/>
													</div>

													<div className="col-md-6">
														<Radio
															checked={has_educational}
															name='has_educational'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Образовательные учреждения'
														/>
													</div>
												</div>
											</CollapsableBlock>
										</div>
									</div>

									<div className="col-md-6">
										<div className="form-group">
											<CollapsableBlock
												title="Правовые документы"
												uniqueId={`apartments-sell-docs-${id}`}
											>
												<div className="row">
													<div className="col-md-6">
														<Radio
															checked={ldapsale_privatization_contract}
															name='ldapsale_privatization_contract'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Договор безвозмездной передачи жилья гражданам'
														/>
													</div>

													<div className="col-md-6">
														<Radio
															checked={ldapsale_court_dec_amicable_agr}
															name='ldapsale_court_dec_amicable_agr'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Решение суда или мировое соглашение'
														/>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6">
														<Radio
															checked={ldapsale_rent_contract}
															name='ldapsale_rent_contract'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Договор ренты'
														/>
													</div>

													<div className="col-md-6">
														<Radio
															checked={ldapsale_agreemen_alloc_owner_interest}
															name='ldapsale_agreemen_alloc_owner_interest'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Соглашение о выделении доли в праве собственности'
														/>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6">
														<Radio
															checked={ldapsale_contract_of_sale}
															name='ldapsale_contract_of_sale'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Договор купли-продажи'
														/>
													</div>

													<div className="col-md-6">
														<Radio
															checked={ldapsale_certificate_of_inheritance}
															name='ldapsale_certificate_of_inheritance'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Свидетельство о наследовании'
														/>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6">
														<Radio
															checked={ldapsale_agreement_compensation}
															name='ldapsale_agreement_compensation'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Договор об отступном'
														/>
													</div>

													<div className="col-md-6">
														<Radio
															checked={ldapsale_certificate_of_payment}
															name='ldapsale_certificate_of_payment'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Справка о выплате пая'
														/>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6">
														<Radio
															checked={ldapsale_contract_of_gift}
															name='ldapsale_contract_of_gift'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Договор дарения'
														/>
													</div>

													<div className="col-md-6">
														<Radio
															checked={ldapsale_share_contract}
															name='ldapsale_share_contract'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Договор долевого участия'
														/>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6">
														<Radio
															checked={ldapsale_investment_contract}
															name='ldapsale_investment_contract'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Договор инвестирования'
														/>
													</div>

													<div className="col-md-6">
														<Radio
															checked={ldapsale_barter_contract}
															name='ldapsale_barter_contract'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Договор мены'
														/>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6">
														<Radio
															checked={ldapsale_decree_local_administration}
															name='ldapsale_decree_local_administration'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Постановление местной администрации'
														/>
													</div>

													<div className="col-md-6">
														<Radio
															checked={ldapsale_agreement_sharing_property}
															name='ldapsale_agreement_sharing_property'

															options={[
																{label: 'Не уст.', value: 0},
																{label: 'Да'     , value: 1},
																{label: 'Нет'    , value: 2}
															]}

															title='Соглашение о разделе совместно нажитого имущества'
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
		item       : state.property.apartments_sell.view
	};
}

function mapDispatchToProps(dispatch) {
	return {
		post               : bindActionCreators(post, dispatch),
		put                : bindActionCreators(put, dispatch),
		viewApartmentToSell: bindActionCreators(viewApartmentToSell, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentToSellEdit);
