import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import PropertyList from 'routes/main/components/PropertyList';
import Timeline from 'routes/main/components/Timeline';
import ClientBlock from 'routes/main/components/ClientBlock';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import Modal from 'generic/components/Modal';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Textarea from 'generic/components/Form/Textarea';
import Datepicker from 'generic/components/Form/Datepicker';
import Multicontact from 'generic/components/Form/Multicontact';
import ContactField from 'generic/components/Form/ContactField';
import Select from 'generic/components/Form/Select';
import showModal from 'modules/main_page/actions/show_modal.js';
import fetchDeal from 'modules/deals/actions/view.js';
import fetchClients from 'modules/clients/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import fetchTasks from 'modules/notes/tasks/actions/fetch.js';
import fetchUserNotes from 'modules/notes/user_notes/actions/fetch.js';
import fetchSystemNotes from 'modules/notes/system_notes/actions/fetch.js';
import postTask from 'modules/notes/tasks/actions/post.js';
import putTask from 'modules/notes/tasks/actions/put.js';
import postUserNote from 'modules/notes/user_notes/actions/post.js';
import putUserNote from 'modules/notes/user_notes/actions/put.js';
import fetchContracts from 'modules/contracts/contracts_view/actions/fetch.js';
import postContractView from 'modules/contracts/contracts_view/actions/post.js';
import putContractView from 'modules/contracts/contracts_view/actions/put.js';
import setActiveDeal from 'modules/active_deal/actions/id.js';
import clearPropList from 'modules/active_deal/actions/clear_prop_list.js';
import resetActiveDeal from 'modules/active_deal/actions/reset.js';
import editPropDesc from 'modules/active_deal/actions/text.js';
import editPropType from 'modules/active_deal/actions/prop_type.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import findCheck from 'generic/helpers/find-check';
import getName from 'generic/helpers/get-name';
import orNone from 'generic/helpers/or-none';
import findOrNone from 'generic/helpers/find-or-none';
import dictionaries from 'generic/dictionaries';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

class Deal extends React.Component {
	constructor() {
		super();

		this.state = {
			qualif_desc         : '',
			property_type       : '',
			propListProps		: {}
		};
	}

	componentWillMount(){
		const
			id = this.props.params.id;

		this.props.fetch(id);
		this.props.fetchClients();
		this.props.fetchContracts();
		this.props.fetchUsers();
		this.props.setActiveDeal(id);
		this.props.setMainPageData({activePage: "client"});
	}

	onEditQualifText = e => {
		const
			value = e.target.value;

		this.setState({qualif_desc: value});
		this.props.editPropDesc(value);
	}

	onResetActiveDeal = e => {
		e.preventDefault();
		this.props.resetActiveDeal();
	}

	onSelectPropType = e => {
		const
			value = e.target.value;

		this.setState({property_type: value});
		this.props.editPropType(value);
	}

	onSubmit = e => {
		e.preventDefault();
		browserHistory.push(`/${this.props.propType}`);
	}

	addContract(e) {
		e.preventDefault();
		this.setState({isContractFormActive: true});
	}

	onPostContractView = data => {
		this.setState({isContractFormActive: false});
		this.props.postContractView(data);
		this.props.fetchContracts();
	}

	onPutContractView = data => {
		this.setState({isContractFormActive: false});
		this.props.putContractView(data);
	}

	onCancelContractForm = e => {
		e.preventDefault();
		this.setState({isContractFormActive: false});
	}

	onStepBack = e => {
		e.preventDefault();
		this.props.clearPropList();
		browserHistory.goBack();
	}

	onShowPropertyList = contracts => {
		const
			propListItems = {
				apartment_sale		 : contracts.apartments_sale,
				apartment_rent		 : contracts.apartments_rent,
				commercial_property: contracts.commercial_property,
				house 						 : contracts.houses,
				land							 : contracts.lands
			}

		_.find(propListItems, (V, K) => {
				if (V && V.length > 0) {
						this.setState({propListItems: {
								items : V,
								entity: K
						}});
						return true;
				}
		});

		this.props.showModal('deal-contracts-list-property-modal', true);
	}

	render() {
		const
			{
			  clearPropList,
	  		data,
	  	  propDesc,
			  propList,
			  propType,
			  users,
			  contracts,
			} = this.props,
			{id, name, manager, notes, status, clients} = data || {},
			{isContractFormActive, propListItems} = this.state;

		return (
			<div>
				<div className="row">
					<div className="col-md-5 col-lg-5">
						<div className="block">
							<div className="block-title">
								<h2>Информация по сделке</h2>

								<div className="block-options pull-right">
									<Link
										to={`/deals/${id}/edit`}
										className="btn btn-default btn-alt btn-sm"
										title="Редактировать"
									>
										<i className="fa fa-pencil"></i>
									</Link>
								</div>
							</div>

							<table className="table table-borderless table-striped">
								<tbody>
									<tr>
										<td style={{width: '40%'}}><strong>Номер</strong></td>
										<td>{name}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Менеджер</strong></td>
										<td>{getName(_.find(users, {'id': (manager || {}).id}))}</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Статус</strong></td>
										<td>{(_.find(dictionaries.deal_statuses, {'id': status}) || {}).value}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="block">
							<div className="block-title">
								<h2>Квалификация</h2>
							</div>

							<form className="form-horizontal">
								<div className="container-fluid">
									<div className="row">
										<div className="form-group">
											<div className="col-sm-12 col-md-6">
												<label htmlFor='property_type' title='Тип недвижимости'>Тип недвижимости</label>

												<select
													className="form-control"
													onChange={e => this.onSelectPropType(e)}
													name='property_type'
													defaultValue={propType}
												>
													{[
														{id: 0, value: '',                    name: ''},
														{id: 1, value: 'apartments_sell',     name: 'Квартира на продажу'},
														{id: 2, value: 'apartments_rent',     name: 'Квартира на аренду'},
														{id: 3, value: 'houses',              name: 'Дом'},
														{id: 4, value: 'lots',                name: 'Участок'},
														{id: 5, value: 'commercial_property', name: 'Коммерческая недвижимость'}
													]

													.map(O => (
														<option
															key={O.id}
															value={O.value}
															{...(O.id == 0 && {disabled: true})}
														>
															{O.name}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label htmlFor='qualif_desc' title='Квалификация'>Квалификация</label>

												<textarea
													className="form-control"
													id='qualif_desc'
													name='qualif_desc'
													onChange={e => this.onEditQualifText(e)}
													placeholder='Введите подробное описание объекта, предоставленное пользователем'
													rows='5'
													value={propDesc}
												></textarea>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="form-group form-actions">
											<div className="col-md-12 text-right">
												<div className='btn-toolbar pull-right'>
													<button
														className='btn btn-xs btn-primary'
														onClick={e => this.onResetActiveDeal(e)}
														title='Сброс Сделки'
													>
														<i className="fa fa-times"></i>
													</button>

													{propList.length == 0 && (<button
														className={
															`btn btn-xs btn-primary ${this.props.propDesc && this.props.propType
																? '' : 'disabled'}`
														}

														onClick={e => this.onSubmit(e)}
														title='Квалифицировать'
													>
														<i className="fa fa-chevron-right"></i>
													</button>)}

													{propList.length > 0 && (<button
														className={`btn btn-xs btn-primary`}
														onClick={e => this.onStepBack(e)}
														title='Вернуться к выбору объектов'
													>
														<i className="fa fa-rotate-left"></i>
													</button>)}

													{propList.length > 0 && (<button
														className={`btn btn-xs btn-primary`}
														onClick={e => false}
													>
														Прикрепить к договору
													</button>)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>

							{isContractFormActive && (<Form
								data={{
									deal			   : {id: id},
									apartments_sale	   : [],
									apartments_rent    : [],
									houses			   : [],
									lands			   : [],
									commercial_property: []
								}}

								isQuick={false}
								new={true}
								post={this.onPostContractView}
								put={this.onPutContractView}
								cancel={this.onCancelContractForm}
								schema={{
									number: 'isRequired',
									agent : 'isRequired',
									client: 'isRequired'
								}}
							>
								<fieldset>
									<legend>Договор просмотра</legend>

									<div className="row">
										<div className="col-md-6">
												<Input
													name='number'
													required={true}
													title="Номер"
												/>
										</div>

										<div className="col-md-6">
											<Select
												name='status'
												options={dictionaries.contract_statuses}
												passInt={true}
												placeholder='Выберите статус договора'
												title='Статус'
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<ContactField
													name='agent'
													required={true}
													title="Агент"
													value=''
													items={users}
											/>
										</div>

										<div className="col-md-6">
											<ContactField
												name='client'
												required={true}
												title="Клиент"
												value=''
												items={clients}
											/>
										</div>
									</div>
								</fieldset>
							</Form>)}
						</div>

						<div className="block">
							<div className="block-title">
								<h2>Договоры просмотра</h2>
							</div>

							{_.map(_.filter(contracts, c => c.deal.id == id), C => {
								return (
									<CollapsableBlock
										title={`Договор #${C.number} от ${moment(C.created_at).format('L')}`}
										uniqueId={'contract-view-' + C.id}
									>
										<table className="table table-borderless table-striped">
											<tbody>
												<tr>
													<td style={{width: '40%'}}><strong>Дата редактирования</strong></td>
													<td>{C.updated_at}</td>
												</tr>

												<tr>
													<td style={{width: '40%'}}><strong>Дата подписания</strong></td>
													<td>{C.created_at}</td>
												</tr>

												<tr>
													<td style={{width: '40%'}}><strong>Статус</strong></td>
													<td>{findOrNone(dictionaries.contract_statuses, C.status)}</td>
												</tr>
											</tbody>
										</table>

										<div className="text-right">
											<button
												className="btn btn-sm btn-default btn-block"
												onClick={() => this.onShowPropertyList(C)}
											>
												Список недвижимости
											</button>
										</div>
									</CollapsableBlock>
								);
							})}
						</div>

						<div className="block">
							<div className="block-title">
								<h2>Клиенты</h2>

								<div className="block-options pull-right">
	                                <Link to={''} className="btn btn-default btn-alt btn-sm" title="Редактировать">
	                                    <i className="fa fa-plus"></i>
	                                </Link>
	                            </div>
							</div>

							<div className="row">
								{
									clients && clients.length ?
									_.map(data.clients, C => (
										<ClientBlock key={C.id} clientId={C.id} />
									))
									: (<p>Клиент еще не добавлен</p>)
								}
							</div>
						</div>
					</div>

					<div className="col-md-7 col-lg-7">
						<Timeline entity={{name: 'deal', params: {id: id}}} isEditable={true} />
					</div>

				</div>

				<Modal
					header={propListItems &&
									_.find(dictionaries.object_types, E => E.type == propListItems.entity).value}
					cancelText='Ок'
					uniqueId='deal-contracts-list-property-modal'
					noSubmit={true}
				>
					<PropertyList
						items={propListItems && propListItems.items}
						entity={propListItems && propListItems.entity}
					/>
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		data    	 : state.deals.view,
		clients 	 : state.clients.data,
		propDesc	 : state.active_deal.text,
		propList	 : state.active_deal.prop_list,
		propType	 : state.active_deal.prop_type,
		users   	 : state.users.data,
		contracts: state.contracts.view.data,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		clearPropList   : bindActionCreators(clearPropList, dispatch),
		editPropDesc    : bindActionCreators(editPropDesc, dispatch),
		editPropType    : bindActionCreators(editPropType, dispatch),
		fetch           : bindActionCreators(fetchDeal, dispatch),
		fetchClients    : bindActionCreators(fetchClients, dispatch),
		fetchUsers      : bindActionCreators(fetchUsers, dispatch),
		resetActiveDeal : bindActionCreators(resetActiveDeal, dispatch),
		setActiveDeal   : bindActionCreators(setActiveDeal, dispatch),
		setMainPageData : bindActionCreators(setMainPageData, dispatch),
		fetchContracts  : bindActionCreators(fetchContracts, dispatch),
		postContractView: bindActionCreators(postContractView, dispatch),
		putContractView : bindActionCreators(putContractView, dispatch),
		setMainPageData : bindActionCreators(setMainPageData, dispatch),
		showModal 			: bindActionCreators(showModal, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Deal);
