import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import fetchRoles from 'modules/roles/actions/fetch.js';
import removeRole from 'modules/roles/actions/remove.js';
import RolesTable from '../../components/RolesTable';

class Roles extends React.Component {
	componentWillMount(){
		this.props.fetch();
		this.props.setMainPageData({activePage:"roles"});
	}

	handleRemove = (e, id) => {
		e.preventDefault();
		this.props.remove(id);
	}

	render() {
		return (
			<div>
				<div className="content-header">
					<div className="header-section">
						<h1>
							<Link to='/roles/new/edit' className="btn btn-default pull-right">Добавить</Link>
							Роли
							<br></br>
							<small>Таблица всех ролей</small>
						</h1>
					</div>
				</div>
				
				<RolesTable data={this.props.roles} remove={this.handleRemove} entity="roles" />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		roles: state.roles.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetch          : bindActionCreators(fetchRoles, dispatch),
		remove         : bindActionCreators(removeRole, dispatch),
		setMainPageData: bindActionCreators(setMainPageData, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
