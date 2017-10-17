import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Multicomplete from 'generic/components/Form/Multicomplete';
import viewPermission from 'modules/permissions/actions/view';
import fetchRoles from 'modules/roles/actions/fetch.js';
import post from 'modules/permissions/actions/post.js';
import put from 'modules/permissions/actions/put.js';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

class PermissionEdit extends React.Component {
	componentWillMount() {
		const
			id = this.props.params.id;

		this.props.fetchRoles();

		if(id != 'new')
			this.props.viewPermission(id);

		this.setState({entity: 'permissions'});
	}

	render() {
		const
			{allRoles, item, params, post, put} = this.props,
			{entity} = this.state,
			{action, module_name, roles} = params.id === 'new' ? {} : (item || {});

		return (
			<div>
				<div className="content-header">
					<div className="header-section">
						<h1>
							<i className="gi gi-table"></i>
							{params.id === 'new' ? 'Новое право' : `${module_name}`}
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
					>
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-3">
									<Input
										defaultValue={module_name}
										name='module_name'
										required={true}
										title="Название"
										type='text'
										validations='isLength:1'
									/>
								</div>

								<div className="col-md-3">
									<Input
										defaultValue={action}
										name='action'
										required={true}
										title="Действия"
										type='text'
										validations='isLength:1'
									/>
								</div>

								<div className="col-md-4">
									<Multicomplete
										comparatorValue='role'
										data={allRoles}
										items={matchArrEqualObjProps(roles, allRoles)}
										key='permission-roles-mtc'
										name='roles'
										required={true}
										title="Роли"
									/>
								</div>
							</div>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		allRoles: state.roles.data,
		item    : state.permissions.view
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoles    : bindActionCreators(fetchRoles, dispatch),
		post          : bindActionCreators(post, dispatch),
		put           : bindActionCreators(put, dispatch),
		viewPermission: bindActionCreators(viewPermission, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionEdit);
