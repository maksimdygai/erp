import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PieChart, Pie, Cell } from 'recharts';
import Calendar from 'routes/main/components/Calendar';
import Timeline from 'routes/main/components/Timeline';
import getName from 'generic/helpers/get-name';
import findCheck from 'generic/helpers/find-check';
import toggleSidebar from 'modules/main_page/actions/toggle_sidebar';
import getSummary from 'modules/dashboard/actions/fetch';
import fetchDeals from 'modules/deals/actions/fetch';
import fetchClients from 'modules/clients/actions/fetch';
import fetchUsers from 'modules/users/actions/fetch';
import dictionaries from 'generic/dictionaries';

class Dashboard extends React.Component {
	componentWillMount() {
		this.props.getSummary();
		this.props.fetchDeals();
		this.props.fetchClients();
		this.props.fetchUsers();
	}

	render() {
		const
			{apartments, houses} = (this.props.summary || {}).properties || {},
			{in_office, total, without_tasks} = (this.props.summary || {}).clients || {},
			deals = (this.props.summary || {}).deals || {},
			{due_today, expired} = (this.props.summary || {}).tasks || {},
			{allClients, allDeals, allUsers, userId} = this.props,

			userClients = _.filter(allClients, C => C.manager.id == userId),
			userDeals = _.filter(allDeals, D => D.manager.id == userId),

			chartPresets = {
				myRate : [{color: dictionaries.progres_colors[3].value, value: 85}, {color: '#ededed', value: 15}],
				offRate: [{color: dictionaries.progres_colors[2].value, value: 75}, {color: '#ededed', value: 25}],
				ladder : [{color: dictionaries.progres_colors[1].value, value: 38}, {color: '#ededed', value: 62}]
			};

		return (
			<div>
				<div className="content-header">
					<div
						className="sidebar-switch-sm"
						onClick={() => this.props.toggleSidebar(this.props.isSidebarOpen)}
					>
						<i className="fa fa-chevron-right"></i>
					</div>

					<div className="header-section">
						<div className="row">
							<div className="col-md-7 hidden-xs hidden-sm">
								<h1>
									Рабочий стол<br/><small>{getName(findCheck(allUsers, {id: userId}))}</small>
								</h1>
							</div>

							<div className="col-md-5">
								<div className="row">
									<div className="col-md-4 col-xs-4">
										<PieChart width={100} height={100} style={{margin: '0 auto'}}>
											<Pie
												data={chartPresets.myRate}
												innerRadius={35}
												outerRadius={40}
												labelLine={false}
												label={({cx, cy}) => (
													<text
														x={cx} y={cy+8}
														textAnchor='middle'
														style={{margin: '0',
    															 fontSize: '26px',
    													 		 lineHeight: '32px',
																	 fontFamily: '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    													     fontWeight: '300'}}
													>
														80%
													</text>
												)}
											>
												{_.map(chartPresets.myRate, P => (<Cell fill={P.color}/>))}
											</Pie>
										</PieChart>

										<h3 className="text-center">
											<small>Мой рейтинг</small>
										</h3>
									</div>

									<div className="col-md-4 col-xs-4">
										<PieChart width={100} height={100} style={{margin: '0 auto'}}>
											<Pie
												data={chartPresets.offRate}
												innerRadius={35}
												outerRadius={40}
												labelLine={false}
												label={({cx, cy}) => (
													<text
														x={cx} y={cy+8}
														textAnchor='middle'
														style={{margin: '0',
    															 fontSize: '26px',
    													 		 lineHeight: '32px',
																	 fontFamily: '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    													     fontWeight: '300'}}
													>
														75%
													</text>
												)}
											>
												{_.map(chartPresets.offRate, P => (<Cell fill={P.color}/>))}
											</Pie>
										</PieChart>

										<h3 className="text-center">
											<small>Рейтинг офиса</small>
										</h3>
									</div>

									<div className="col-md-4 col-xs-4">
										<PieChart width={100} height={100} style={{margin: '0 auto'}}>
											<Pie
												data={chartPresets.ladder}
												innerRadius={35}
												outerRadius={40}
												labelLine={false}
												label={({cx, cy}) => (
													<g>
														<defs>
												        <clipPath  patternUnits="userSpaceOnUse" id="clip">
												          <circle cx="50%" cy="50%" r="35" ></circle>
												        </clipPath>
												    </defs>

														<image x={0} y={0} href="../../../../assets/images/profile.jpg" width='100px' height='100px' clipPath='url(#clip)'/>
													</g>
												)}
											>
												{_.map(chartPresets.ladder, P => (<Cell fill={P.color}/>))}
											</Pie>
										</PieChart>

										<h3 className="text-center">
											<small>Лестница успеха</small>
										</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-6">
						<div className="block block-alt-noborder full">
								<div className="navbar navbar-default" style={{marginBottom: '0px'}}>
									<form className="navbar-form-custom">
										<div className="form-group">
											<input type="text" className="form-control" placeholder="Поиск.."/>
										</div>
									</form>
								</div>
						</div>

						<div className="block">
							<div className="block-title">
								<h2>Объекты</h2>
							</div>

							<table className="table table-borderless table-striped">
								<thead>
									<tr>
										<th></th>
										<th>Новых</th>
										<th>Прозвон</th>
										<th>Реклама</th>
									</tr>
								</thead>

								<tbody>
									{apartments && (<tr>
										<td style={{width: '30%'}}><strong>Квартиры</strong></td>
										<td>{`${apartments.new.in_office}/${apartments.new.total}`}</td>
										<td>{`${apartments.ringing.in_office}/${apartments.ringing.total}`}</td>
										<td>{`${apartments.advertising.in_office}/${apartments.advertising.total}`}</td>
									</tr>)}

									{houses && (<tr>
										<td style={{width: '30%'}}><strong>Дома</strong></td>
										<td>{`${houses.new.in_office}/${houses.new.total}`}</td>
										<td>{`${houses.ringing.in_office}/${houses.ringing.total}`}</td>
										<td>{`${houses.advertising.in_office}/${houses.advertising.total}`}</td>
									</tr>)}
								</tbody>
							</table>
						</div>

						<div className="block">
							<div className="block-title">
								<h2>Клиенты</h2>
							</div>

							<table className="table table-borderless table-striped">
								<tbody>
									<tr>
										<td style={{width: '30%'}}><strong>Новые</strong></td>
										<td>{`${in_office}/${total}`}</td>
									</tr>

									<tr>
										<td style={{width: '30%'}}><strong>Без задач</strong></td>
										<td>{`${without_tasks}`}</td>
									</tr>
								</tbody>
							</table>
							<br/>
							<div className="block-title">
								<h2>Звонки</h2>
							</div>

							<div className="widget-advanced widget-advanced-alt">
								<div className="widget-main">
									<div className="row text-center">
										<div className="col-xs-4">
											<Link to='clients?calls=in'>
												<span className="widget-link">
													<h4 className="animation-hatch">
														<strong>{7}</strong>
														<br></br>
														<small>Входящие</small>
													</h4>
												</span>
											</Link>
										</div>

										<div className="col-xs-4">
											<Link to='clients?calls=out'>
												<span className="widget-link">
													<h4 className="animation-hatch">
														<strong>{2}</strong>
														<br></br>
														<small>Исходящие</small>
													</h4>
												</span>
											</Link>
										</div>

										<div className="col-xs-4">
											<Link to='clients?calls=missed'>
												<span className="widget-link">
													<h4 className="animation-hatch">
														<strong>{3}</strong>
														<br></br>
														<small>Пропущенные</small>
													</h4>
												</span>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>

						{deals.statistic && (<div className="block">
							<div className="block-title">
								<h2>Сделки</h2>
							</div>

							<table className="table table-borderless table-striped">
								<tbody>
									<tr>
										<td style={{width: '40%'}}><strong>Вход заявки</strong></td>

										<td>
											<Link to='deals?status=1'>
												<div className="progress-bar progress-bar-info pull-right"
													role="progressbar"
													aria-valuenow={`${deals.statistic['1'].percent}`}
													aria-valuemin="0"
													aria-valuemax="100"
													style={{
														width: `${deals.statistic['1'].percent}%`,
														backgroundColor: dictionaries.deal_statuses[0].color
													}}
												>
													{`${deals.statistic['1'].percent}%`}
												</div>
											</Link>
										</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Квалификация клиента</strong></td>

										<td>
											<Link to='deals?status=2'>
												<div className="progress-bar progress-bar-info pull-right"
													role="progressbar"
													aria-valuenow={`${deals.statistic['2'].percent}`}
													aria-valuemin="0"
													aria-valuemax="100"
													style={{
														width: `${deals.statistic['2'].percent}%`,
														backgroundColor: dictionaries.deal_statuses[1].color
													}}
												>
													{`${deals.statistic['2'].percent}%`}
												</div>
											</Link>
										</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Подбор вариантов</strong></td>

										<td>
											<Link to='deals?status=3'>
												<div className="progress-bar progress-bar-info pull-right"
													role="progressbar"
													aria-valuenow={`${deals.statistic['3'].percent}`}
													aria-valuemin="0"
													aria-valuemax="100"
													style={{
														width: `${deals.statistic['3'].percent}%`,
														backgroundColor: dictionaries.deal_statuses[2].color
													}}
												>
													{`${deals.statistic['3'].percent}%`}
												</div>
											</Link>
										</td>
									</tr>

									<tr>
										<td style={{width: '40%'}}><strong>Показ объектов</strong></td>

										<td>
											<Link to='deals?status=4'>
												<div className="progress-bar progress-bar-info pull-right"
													role="progressbar"
													aria-valuenow={`${deals.statistic['4'].percent}`}
													aria-valuemin="0"
													aria-valuemax="100"
													style={{
														width: `${deals.statistic['4'].percent}%`,
														backgroundColor: dictionaries.deal_statuses[3].color
													}}
												>
													{`${deals.statistic['4'].percent}%`}
												</div>
											</Link>
										</td>
									</tr>
								</tbody>
							</table>

							<div className="widget-advanced widget-advanced-alt">
								<div className="widget-main">
									<div className="row text-center">
										<div className="col-xs-4">
											<Link className="widget-link" to='deals?task=1'>
													<h4 className="animation-hatch">
														<strong>{`${deals.without_tasks}`}</strong>
														<br></br>
														<small>Без задач</small>
													</h4>
											</Link>
										</div>

										<div className="col-xs-4">
											<Link to='deals?task=2'>
												<span className="widget-link">
													<h4 className="animation-hatch">
														<strong>{`${expired}`}</strong>
														<br></br>
														<small>Просрочено</small>
													</h4>
												</span>
											</Link>
										</div>

										<div className="col-xs-4">
											<Link to='deals?task=3'>
												<span className="widget-link">
													<h4 className="animation-hatch">
														<strong>{`${due_today}`}</strong>
														<br></br>
														<small>На сегодня</small>
													</h4>
												</span>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>)}
					</div>

					<div className="col-md-6">
						<div className="block block-alt-noborder full">
							<div className="block-title">
								<h2>Календарь</h2>
							</div>

							<div className="container-fluid">
								<Calendar
									params={{
										userDeals  : userDeals,
										userClients: userClients}}
								/>
							</div>
						</div>

						<Timeline
							entity={{
								name: 'user',
								params: {
									userDeals  : userDeals,
									userClients: userClients
								}
							}}
							isEditable={false}
							isCompact={true}
						/>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const
		userInfo = state.user_info.data;

	return {
		allClients   : state.clients.data,
		allDeals     : state.deals.data,
		allUsers     : state.users.data,
		isSidebarOpen: state.main_page.isSidebarOpen,
		summary      : state.dashboard.data,
		userId       : userInfo && userInfo.id
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getSummary   : bindActionCreators(getSummary, dispatch),
		fetchClients : bindActionCreators(fetchClients, dispatch),
		fetchDeals   : bindActionCreators(fetchDeals, dispatch),
		fetchUsers   : bindActionCreators(fetchUsers, dispatch),
		toggleSidebar: bindActionCreators(toggleSidebar, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
