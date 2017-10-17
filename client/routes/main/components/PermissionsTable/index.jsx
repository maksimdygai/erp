import React from 'react';
import { Link } from 'react-router';
import orNone from 'generic/helpers/or-none';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

const 
    PermissionsTable = ({data, entity, remove, roles}) => {
        const
            rows = (data != null) && data.map(item => (
                    <tr key={item.id}>
                        <td className="text-center"><input type="checkbox" id="checkbox1-1" name="checkbox1-1"></input></td>
                        <td>{orNone(item.module_name)}</td>
                        <td>{orNone(item.action)}</td>
                        <td>{_.map(matchArrEqualObjProps(item.roles, roles), 'role').join(', ')}</td>

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
                                <th>Действие</th>
                                <th>Роли</th>
                                <th style={{width: '110px'}} className="text-center">Опции</th>
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

PermissionsTable.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default PermissionsTable;
