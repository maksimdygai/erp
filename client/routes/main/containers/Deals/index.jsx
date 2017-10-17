import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import fetchDeals from 'modules/deals/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import fetchTasks from 'modules/notes/tasks/actions/fetch.js';
import remove from 'modules/deals/actions/remove.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import DealsTable from '../../components/DealsTable'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dictionaries from 'generic/dictionaries';
import getName from 'generic/helpers/get-name';
import parseUrl from 'generic/helpers/parse-url';

class Deals extends React.Component {
	constructor() {
		super();

		this.state = {defaultFilter: parseUrl(location.href)};
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	}

	componentWillMount() {
		this.props.fetch();
		this.props.fetchUsers();
		this.props.fetchTasks();
		this.props.setMainPageData({activePage: "deals"});
	}

	handleRemove = (e, id) => {
		e.preventDefault();
		this.props.remove(id);
	}

	getTaskStatus = id => {
		const
			dealTasks = _.filter(this.props.tasks, T => T.deal && T.deal.id == id);

		let
			type, color, text;

		if (!dealTasks.length) {
			return 1;
		}
		else if (_.find(dealTasks, T => moment(T.dead_line).format('YYYYMMDD') < moment().format('YYYYMMDD'))) {
			return 2;
		}
		else if (_.find(dealTasks, T => moment(T.dead_line).format('YYYYMMDD') == moment().format('YYYYMMDD'))) {
			return 3;
		}
		else {
			return 4;
		}
	}

	render() {
		const
			{ tasks, users } = this.props,
			{ defaultFilter } = this.state;

		let
			data = _.map(this.props.data, I => {
				I.task_status = this.getTaskStatus(I.id);
				return I;
			}),
			deal_statuses = {},
			task_statuses = {};

		_.map(dictionaries.deal_statuses, S => deal_statuses[S.id] = S.value);
		_.map(dictionaries.task_statuses, S => task_statuses[S.id] = S.value);

		return (
			<div>
				<div className="content-header">
					<div className="header-section">
						<h1>
							<Link to='/deals/new/edit' className="btn btn-default pull-right">Добавить</Link>
							Сделки
							<br></br>
							<small>Таблица всех сделок</small>
						</h1>
					</div>
				</div>

				<div className="block">
					<BootstrapTable
						data={ data }
						selectRow={{mode: 'checkbox'}}
					>
						<TableHeaderColumn
							dataField='name'
							dataFormat={(cell, row) => (<Link to={`/deals/${row.id}`} title="Подробности">{cell}</Link>)}
							thStyle={{width: '23%'}}
							tdStyle={{width: '23%'}}
						>
							Название
						</TableHeaderColumn>

						<TableHeaderColumn
							dataField='manager'
							dataFormat={(cell, row) => getName(_.find(users, {'id': cell.id}))}
							thStyle={{width: '23%'}}
							tdStyle={{width: '23%'}}
						>
							Менеджер
						</TableHeaderColumn>

						<TableHeaderColumn
							dataField='status'
							dataFormat={(cell, row) => {
								const
									conf = _.find(dictionaries.deal_statuses, {'id': cell});

								return (
									<span className="badge" style={{backgroundColor: conf.color}}>
										{conf.value}
									</span>
								)
							}}
							filterFormated
							formatExtraData={deal_statuses}
							filter={{
								type: 'SelectFilter',
								options: deal_statuses,
								selectText: 'Выберите',
								condition: 'eq',
								defaultValue: defaultFilter.status
							}}
							thStyle={{width: '23%'}}
							tdStyle={{width: '23%'}}
						>
							Статус
						</TableHeaderColumn>

						<TableHeaderColumn
							dataField='task_status'
							dataFormat={(cell, row) => {
								const
									conf = _.find(dictionaries.task_statuses, S => S.id == cell) || {};

								return (
									<span className="badge" style={{backgroundColor: conf.color}}>
										{conf.value}
									</span>
								)
							}}
							formatExtraData={deal_statuses}
							filter={{
								type: 'SelectFilter',
								options: task_statuses,
								selectText: 'Выберите',
								condition: 'eq',
								defaultValue: defaultFilter.task
							}}
							thStyle={{width: '23%'}}
							tdStyle={{width: '23%'}}
						>
							Задачи
						</TableHeaderColumn>

						<TableHeaderColumn
							isKey={true}
							dataField='id'
							dataAlign='center'
							dataFormat={(cell, row) => (
								<div className="text-center">
									<div className="btn-group btn-group-xs">
										<Link to={`/deals/${cell}/edit`} className="btn btn-default" title="Редактировать">
												<i className="fa fa-pencil"></i>
										</Link>

										<button className="btn btn-danger" onClick={e => this.handleRemove(e, cell)} title="Удалить">
												<i className="fa fa-times"></i>
										</button>
									</div>
								</div>
							)}
						>
							Действия
						</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		data : state.deals.data,
		tasks: state.notes.tasks.data,
		users: state.users.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetch          : bindActionCreators(fetchDeals, dispatch),
		fetchTasks     : bindActionCreators(fetchTasks, dispatch),
		fetchUsers     : bindActionCreators(fetchUsers, dispatch),
		remove         : bindActionCreators(remove, dispatch),
		setMainPageData: bindActionCreators(setMainPageData, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Deals);
