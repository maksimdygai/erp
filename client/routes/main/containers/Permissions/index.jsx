import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import fetchPermissions from 'modules/permissions/actions/fetch.js';
import removePermission from 'modules/permissions/actions/remove.js';
import fetchRoles from 'modules/roles/actions/fetch.js';
import Table from '../../../../generic/components/Table';
import { Link } from 'react-router';
import PermissionsTable from '../../components/PermissionsTable'

class Permissions extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount(){
        this.props.fetch();
        this.props.fetchRoles();

        this.props.setMainPageData({
            activePage: "permissions"
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
                            <Link to='/permissions/new/edit' className="btn btn-default pull-right">Добавить</Link>
                            Права
                            <br></br>
                            <small>Таблица всех прав</small>
                        </h1>
                    </div>
                </div>
                
                <PermissionsTable
                    data={this.props.permissions}
                    entity="permissions"
                    remove={this.handleRemove}
                    roles={this.props.roles}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        permissions: state.permissions.data,
        roles      : state.roles.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch          : bindActionCreators(fetchPermissions, dispatch),
        fetchRoles     : bindActionCreators(fetchRoles, dispatch),
        remove         : bindActionCreators(removePermission, dispatch),
        setMainPageData: bindActionCreators(setMainPageData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Permissions);

