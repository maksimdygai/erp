import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchUsers from 'modules/users/actions/fetch.js';
import orNone from 'generic/helpers/or-none';
import getName from 'generic/helpers/get-name';
import dictionaries from 'generic/dictionaries';

class ClientsTable extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.props.fetchUsers();
    }

    render() {
        const
            {data, entity, remove, users} = this.props,

            rows = (data != null) && data.map(item => (
                    <tr key={item.id}>
                        <td className="text-center"><input type="checkbox" id="checkbox1-1" name="checkbox1-1"></input></td>
                        
                        <td>
                            <Link to={`/${entity}/${item.id}`} title="Подробности">{item.name}</Link>
                        </td>

                        <td>{getName(_.find(users, {'id': item.manager.id}))}</td>
                        <td>{_.find(dictionaries.deal_statuses, {'id': item.status}).value}</td>

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
                                <th>Менеджер</th>
                                <th>Статус</th>
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
        users: state.users.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers: bindActionCreators(fetchUsers, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsTable);
