import React from 'react';
import { Link } from 'react-router';
import orNone from 'generic/helpers/or-none';
import getName from 'generic/helpers/get-name';

const 
    OfficesTable = ({data, remove, entity}) => {
        const
            rows = (data != null) && data.map(item => (
                    <tr key={item.id}>
                        <td className="text-center"><input type="checkbox" id="checkbox1-1" name="checkbox1-1"></input></td>
                        <td>{orNone(item.name)}</td>
                        <td>{getName(item.head)}</td>
                        <td>{orNone(item.address)}</td>
                        <td>{orNone(item.email)}</td>
                        <td>{orNone(item.phone)}</td>

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
                                <th>Руководитель</th>
                                <th>Адрес</th>
                                <th>E-mail</th>
                                <th>Телефон</th>
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

OfficesTable.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default OfficesTable;
