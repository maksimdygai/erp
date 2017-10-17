import React from 'react';
import { Link } from 'react-router';
import orNone from '../../helpers/or-none';
import findOrNone from '../../helpers/find-or-none';
import getName from 'generic/helpers/get-name';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

const
	Table = ({data, departments, entity, offices, remove, roles, units}) => {
		const
			rows = (data != null) && data.map(item => {
				const
					department = findOrNone(departments, item.department ? item.department.id : undefined),
					email      = orNone(item.email),
					mobile     = orNone(item.internal_phone),
					name       = getName(item),
					userRoles  = _.map(matchArrEqualObjProps(item.roles, roles), 'role').join(', '),
					unit       = findOrNone(units, item.unit ? item.unit.id : undefined);

				return (<tr key={item.id}>
						<td className="text-center">
							<input type="checkbox" id="checkbox1-1" name="checkbox1-1"></input>
						</td>

						<td className="text-center">
							<img src="../../../assets/images/avatars/avatar1.jpg" alt="avatar" className="img-circle">
							</img>
						</td>

						<td title={name}>{name}</td>
						<td title={email}>{email}</td>
						<td title={mobile}>{mobile}</td>
						<td>{_.map(matchArrEqualObjProps(item.offices, offices), 'name').join(', ')}</td>
						<td title={unit}>{unit}</td>
						<td title={department}>{department}</td>
						<td title={userRoles}>{userRoles}</td>

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
				)}
			);

		return (
			<div className="block">
				<div className="table-responsive">
					<table id="general-table" className="table table-striped table-vcenter">
						{rows && (<thead>
							<tr>
								<th style={{width: '50px'}} className="text-center"><input type="checkbox"></input></th>
								<th style={{width: '50px'}} className="text-center"><i className="gi gi-user"></i></th>
								<th>Имя</th>
								<th>E-mail</th>
								<th>Телефон</th>
								<th>Офис</th>
								<th>Подразделение</th>
								<th>Отдел</th>
								<th>Роли</th>
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


export default Table;
