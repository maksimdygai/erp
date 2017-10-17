import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import viewRole from 'modules/roles/actions/view';
import post from 'modules/roles/actions/post.js';
import put from 'modules/roles/actions/put.js';

class RoleEdit extends React.Component {
	componentWillMount() {
		const
			id = this.props.params.id;

		if(id != 'new')
			this.props.viewRole(id);

		this.setState({entity: 'roles'});
	}

	render() {
		const
			{item, params, post, put} = this.props,
			{entity} = this.state,
			{priority, role} = params.id === 'new' ? {} : (item || {});

		return (
			<div>
				<div className="content-header">
					<div className="header-section">
						<h1>
							<i className="gi gi-table"></i>
							{params.id === 'new' ? 'Новая роль' : `${role}`}
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
								<div className="col-md-2">
									<Input
										defaultValue={role}
										name='role'
										required={true}
										title="Название"
										type='text'
										validations='isLength:1'
									/>
								</div>

								<div className="col-md-2">
									<Input
										defaultValue={priority}
										name='priority'
										required={true}
										title="Приоритет"
										type='text'
										validations='isLength:1,isNumeric'
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
		item: state.roles.view
	};
}

function mapDispatchToProps(dispatch) {
	return {
		post    : bindActionCreators(post, dispatch),
		put     : bindActionCreators(put, dispatch),
		viewRole: bindActionCreators(viewRole, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleEdit);
