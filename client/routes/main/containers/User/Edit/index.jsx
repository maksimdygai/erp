import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Autocomplete from 'generic/components/Form/Autocomplete';
import ContactField from 'generic/components/Form/ContactField';
import Multicomplete from 'generic/components/Form/Multicomplete';
import Select from 'generic/components/Form/Select';
import Datepicker from 'generic/components/Form/Datepicker';
import DropField from 'generic/components/Form/DropField';
import viewUser from 'modules/users/actions/view';
import fetchCategories from 'modules/categories/actions/fetch.js';
import fetchDepartments from 'modules/departments/actions/fetch.js';
import fetchOffices from 'modules/offices/actions/fetch.js';
import fetchPositions from 'modules/positions/actions/fetch.js';
import fetchRoles from 'modules/roles/actions/fetch.js';
import fetchUnits from 'modules/units/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import post from 'modules/users/actions/post.js';
import put from 'modules/users/actions/put.js';
import orNone from 'generic/helpers/or-none';
import getName from 'generic/helpers/get-name';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';
import findCheck from 'generic/helpers/find-check';

class UserEdit extends React.Component {
	componentWillMount() {
		const
			id = this.props.params.id;

		this.props.fetchCategories();
		this.props.fetchDepartments();
		this.props.fetchOffices();
		this.props.fetchPositions();
		this.props.fetchRoles();
		this.props.fetchUnits();
		this.props.fetchUsers();

		if(id !== 'new')
			this.props.viewUser(id);

		this.setState({entity: 'users'});
	}

	render() {
		const
			{
				allCategories,
				allDepartments,
				allOffices,
				allPositions,
				allRoles,
				allUnits,
				allUsers,
				item,
				params,
				post,
				put
			} = this.props,

			{entity} = this.state,

			{
				address,
				birthday,
				category,
				cell_phone,
				department = {},
				email,
				first_name,
				internal_phone,
				is_head_department,
				is_head_office,
				is_mentor,
				is_unit_manager,
				last_name,
				mentor,
				middle_name,
				mobile_phone,
				offices,
				password,
				position = {},
				roles,
				unit = {},
				username
			} = params.id === 'new' ? {} : (item || {});

		return (
			<div>
				<div className="content-header">
					<div className="header-section">
						<h1>
							<i className="gi gi-table"></i>
							{params.id === 'new' ? 'Новый пользователь' : getName(item)}
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
							address   : 'isLength:1',
							birthday  : 'isLength:1',
							email     : 'isEmail',
							first_name: 'isLength:1',
							last_name : 'isLength:1',
							offices   : 'isRequired',
							unit      : 'isRequired',
							username  : 'isLength:1'
						}}
					>
						<fieldset>
							<div className="col-sm-6">
								<div className="col-sm-6">
									<Input
										defaultValue={last_name}
										name='last_name'
										required={true}
										title="Фамилия"
										type='text'
										validations='isLength:1'
									/>

									<Input
										defaultValue={middle_name}
										name='middle_name'
										title="Отчество"
										type='text'
									/>

									<Datepicker
										defaultDate={moment(birthday)}
										name='birthday'
										required={true}
										title="День рождения"
										validations='isLength:1'
									/>

									<Input
										defaultValue={email}
										name='email'
										required={true}
										title="Email"
										type='text'
										validations='isEmail'
									/>

									<Input
										defaultValue={mobile_phone}
										name='mobile_phone'
										title="Телефон (сот)"
										type='text'
									/>

									<Multicomplete
										comparatorValue='name'
										data={allOffices}
										items={matchArrEqualObjProps(offices, allOffices)}
										key='user-office-mtc'
										name='offices'
										required={true}
										title="Офисы"
										validations='isRequired'
									/>
								</div>

								<div className="col-sm-6">
									<Input
										defaultValue={first_name}
										name='first_name'
										required={true}
										title="Имя"
										type='text'
										validations='isLength:1'
									/>

									<Input
										defaultValue={username}
										name='username'
										required={true}
										title="Имя пользователя"
										type='text'
										validations='isLength:1'
									/>

									<Input
										defaultValue={address}
										name='address'
										required={true}
										title="Адрес"
										type='text'
										validations='isLength:1'
									/>

									<Input
										defaultValue={internal_phone}
										name='internal_phone'
										title="Телефон (внутр)"
										type='text'
									/>

									<Input
										defaultValue={cell_phone}
										name='cell_phone'
										title="Телефон (дом)"
										type='text'
									/>
								</div>
							</div>

							<div className="col-sm-6">
								<div className="row">
									<div className="col-sm-12">
										<DropField allowMultiple={false} name='photo' />
									</div>
								</div>
									
								<div className="row">
									<div className="col-sm-6">
										<Select
											name='position'
											options={allPositions}
											placeholder='Выберите должность'
											title='Должность'
										/>
									</div>

									<div className="col-sm-6">
										<Autocomplete
											comparatorValue='name'
											data={allCategories}
											key='user-category-atc'
											name='category'
											required={true}
											title="Категория"
											value={findCheck(allCategories, category, 'name')}
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-sm-6">
										<Autocomplete
											data={allUnits}
											comparatorValue='name'
											key='user-unit-atc'
											name='unit'
											required={true}
											title="Подразделение"
											validations='isRequired'
											value={findCheck(allUnits, unit, 'name')}
										/>

										<Select
											name='department'
											options={allDepartments}
											placeholder='Выберите отдел'
											title='Отдел'
										/>
									</div>

									<div className="col-sm-6">
										<Multicomplete
											comparatorValue='role'
											data={allRoles}
											items={matchArrEqualObjProps(roles, allRoles)}
											key='user-roles-mtc'
											name='roles'
											required={true}
											title="Роли"
										/>

										<ContactField
											key='user-mentor-atc'
											name='mentor'
											title="Наставник"
											value={getName(findCheck(allUsers, mentor))}
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-sm-6">
										<div className="checkbox">
											<label htmlFor="is_unit_manager">
												<input
													id="is_unit_manager"
													name="is_unit_manager"
													type="checkbox"
												></input>

												Руководитель Подразделения
											</label>
										</div>

										<div className="checkbox">
											<label htmlFor="is_head_office">
												<input
													id="is_head_office"
													name="is_head_office"
													type="checkbox"
												></input>

												Руководитель Офиса
											</label>
										</div>
									</div>

									<div className="col-sm-6">
										<div className="checkbox">
											<label htmlFor="is_head_department">
												<input
													id="is_head_department"
													name="is_head_department"
													type="checkbox"
												></input>

												Руководитель Отдела
											</label>
										</div>

										<div className="checkbox">
											<label htmlFor="is_mentor">
												<input
													id="is_mentor"
													name="is_mentor"
													type="checkbox"
												></input>

												Допуск к работе наставником
											</label>
										</div>
									</div>
								</div>

								<Input
									defaultValue={password}
									name='password'
									required={true}
									title="Пароль"
									type='text'
								/>
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
		allCategories : state.categories.data,
		allDepartments: state.departments_dicts.data,
		allOffices    : state.offices.data,
		allPositions  : state.positions.data,
		allRoles      : state.roles.data,
		allUnits      : state.units.data,
		allUsers      : state.users.data,
		item          : state.users.view
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchCategories : bindActionCreators(fetchCategories, dispatch),
		fetchDepartments: bindActionCreators(fetchDepartments, dispatch),
		fetchOffices    : bindActionCreators(fetchOffices, dispatch),
		fetchPositions  : bindActionCreators(fetchPositions, dispatch),
		fetchRoles      : bindActionCreators(fetchRoles, dispatch),
		fetchUnits      : bindActionCreators(fetchUnits, dispatch),
		fetchUsers      : bindActionCreators(fetchUsers, dispatch),
		post            : bindActionCreators(post, dispatch),
		put             : bindActionCreators(put, dispatch),
		viewUser        : bindActionCreators(viewUser, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);