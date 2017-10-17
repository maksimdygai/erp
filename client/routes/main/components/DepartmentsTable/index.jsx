import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchDepartmentDicts from 'modules/departments_dicts/actions/fetch.js';
import fetchOffices from 'modules/offices/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import orNone from 'generic/helpers/or-none';
import getName from 'generic/helpers/get-name';

class DepartmensTable extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.props.fetchDepartmentDicts();
        this.props.fetchOffices();
        this.props.fetchUsers();
    }

    render() {
        const
            {data, departments_dicts, entity, offices, remove, users} = this.props,

            rows = (data != null) && data.map(item => (
                    <tr key={item.id}>
                        <td className="text-center"><input type="checkbox" id="checkbox1-1" name="checkbox1-1"></input></td>
                        <td>{orNone(_.find(departments_dicts, {'id': item.department.id}).name)}</td>
                        <td>{orNone(_.find(offices, {'id': item.office.id}).name)}</td>
                        <td>{getName(_.find(users, {'id': item.head.id}))}</td>

                        <td className="text-center">
                            <div className="btn-group btn-group-xs">
                                <Link to={`/${entity}/${item.id}/edit`} className="btn btn-default" title="Редактировать">
                                    <i className="fa fa-pencil"></i>
                                </Link>

                                <button className="btn btn-danger" onClick={e => remove(e, item.id)} title="Удалить">
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                )
            );

        return (
            <div className="block">
                <div className="table-responsive">
                    <table id="general-table" className="table table-striped table-vcenter">
                        {rows && (<thead>
                            <tr>
                                <th style={{width: '50px'}} className="text-center"><input type="checkbox"></input></th>
                                <th>Название</th>
                                <th>Офис</th>
                                <th>Руководитель</th>
                                <th style={{width: '110px'}} className="text-center">Действия</th>
                            </tr>
                        </thead>)}

                        <tbody>
                            {rows || (
                                <tr>
                                    <td className="text-center" colSpan="50">Список пуст</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        departments_dicts: state.departments_dicts.data,
        offices          : state.offices.data,
        users            : state.users.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDepartmentDicts: bindActionCreators(fetchDepartmentDicts, dispatch),
        fetchOffices        : bindActionCreators(fetchOffices, dispatch),
        fetchUsers          : bindActionCreators(fetchUsers, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmensTable);
