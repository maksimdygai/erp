import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import fetchCategories from 'modules/categories/actions/fetch.js';
import fetchDepartments from 'modules/departments_dicts/actions/fetch.js';
import fetchOffices from 'modules/offices/actions/fetch.js';
import fetchPositions from 'modules/positions/actions/fetch.js';
import fetchRoles from 'modules/roles/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import fetchUnits from 'modules/units/actions/fetch.js';
import removeUser from 'modules/users/actions/delete.js';
import Table from '../../../../generic/components/Table';
import { Link } from 'react-router';

class Users extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }
    
	componentWillMount(){
        this.props.fetch();
        this.props.fetchCategories();
        this.props.fetchDepartments();
        this.props.fetchOffices();
        this.props.fetchPositions();
        this.props.fetchRoles();
        this.props.fetchUnits();

		this.props.setMainPageData({
			activePage: "users"
		});
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
                            <Link to='/users/new/edit' className="btn btn-default pull-right">Добавить</Link>
                            Пользователи
                            <br></br>
                            <small>Таблица всех пользователей</small>
                        </h1>
                    </div>
                </div>
                
                <Table
                    data={this.props.users}
                    departments={this.props.departments}
                    entity="users" 
                    offices={this.props.offices}
                    roles={this.props.roles}
                    remove={this.handleRemove}
                    units={this.props.units}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        departments: state.departments_dicts.data,
        offices    : state.offices.data,
        roles      : state.roles.data,
        units      : state.units.data,
        users      : state.users.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch           : bindActionCreators(fetchUsers, dispatch),
        fetchCategories : bindActionCreators(fetchCategories, dispatch),
        fetchDepartments: bindActionCreators(fetchDepartments, dispatch),
        fetchOffices    : bindActionCreators(fetchOffices, dispatch),
        fetchPositions  : bindActionCreators(fetchPositions, dispatch),
        fetchRoles      : bindActionCreators(fetchRoles, dispatch),
        fetchUnits      : bindActionCreators(fetchUnits, dispatch),
        remove          : bindActionCreators(removeUser, dispatch),
        setMainPageData : bindActionCreators(setMainPageData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

