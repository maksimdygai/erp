import React from 'react';
import classNames from 'classnames/bind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import toggleSidebar from 'modules/main_page/actions/toggle_sidebar';
import Collapsable from 'generic/components/Collapsable';
import logout from 'modules/login_page/actions/logout';

class Sidebar extends React.Component {
	handleLogout = e => {
		e.preventDefault();
		this.props.logout();
	}

	render() {
		const
			{first_name, id, last_name} = (this.props.user || {});

		return (
			<div id="sidebar" className="sidebar">
				<section id="sidebar-scroll">
					<div className="sidebar-content">
						<div className="sidebar-section sidebar-user clearfix sidebar-nav-mini-hide">
							<i
								className="fa fa-thumb-tack sidebar-switch"
								onClick={() => this.props.toggleSidebar(this.props.isSidebarOpen)}
							></i>

							<div className="sidebar-user-avatar">
								<Link to={`/users/${id}`}>
									<img src="../../../../assets/images/profile.jpg" alt="avatar"></img>
								</Link>
							</div>

							<div className="sidebar-user-name">{`${first_name} ${last_name}`}</div>

							<div className="sidebar-user-links">
								<Link to="/profile" title="Профиль">
									<i className="gi gi-user"></i>
								</Link>

								<Link to="/settings" title="Настройки">
									<i className="gi gi-cogwheel"></i>
								</Link>

								<a href="#" onClick={this.handleLogout} title="Выйти"><i className="gi gi-exit"></i></a>
							</div>
						</div>

						<ul className="sidebar-nav">
							<li>
								<Link to="/dashboard" className="sidebar-nav-menu" activeClassName="active">
									<i className="gi gi-power sidebar-nav-icon"></i>
									<span className="sidebar-nav-mini-hide">Рабочий стол</span>
								</Link>

								<Link to="/deals" activeClassName="active">
									<i className="fa fa-briefcase sidebar-nav-icon"></i>
									<span className="sidebar-nav-mini-hide">Сделки</span>
								</Link>

								<Link to="/clients" activeClassName="active">
									<i className="fa fa-users sidebar-nav-icon"></i>
									<span className="sidebar-nav-mini-hide">Клиенты</span>
								</Link>

								<Link to="/tasks" activeClassName="active">
									<i className="fa fa-calendar-check-o sidebar-nav-icon"></i>
									<span className="sidebar-nav-mini-hide">Задачи</span>
								</Link>
							</li>

							<li>
								<Collapsable
									icon='gi-home'
									defaultCollapsed={true}
									title='Объекты'
									uniqueId='sidebar-property-collapsable'
								>
									<li><Link to="/apartments_rent" activeClassName="active">Аренда</Link></li>
									<li><Link to="/apartments_sell" activeClassName="active">Квартиры</Link></li>
									<li><Link to="/houses" activeClassName="active">Дома</Link></li>
									<li><Link to="/lots" activeClassName="active">Участки</Link></li>

									<li>
										<Link to="/commercial_property" activeClassName="active">Коммерция</Link>
									</li>
								</Collapsable>
							</li>

							<li>
								<Collapsable
									icon='gi-building'
									defaultCollapsed={true}
									title='Агентство'
									uniqueId='sidebar-agency-collapsable'
								>
									<li><Link to="/offices" activeClassName="active">Офисы</Link></li>
									<li><Link to="/departments" activeClassName="active">Отделы</Link></li>
									<li><Link to="/units" activeClassName="active">Подразделения</Link></li>
									<li><Link to="/users" activeClassName="active">Сотрудники</Link></li>
								</Collapsable>
							</li>

							<li>
								<Collapsable
									icon='gi-list'
									defaultCollapsed={true}
									title='Администрирование'
									uniqueId='sidebar-dictionaries-collapsable'
								>
									<li><Link to="/departments_dicts" activeClassName="active">Управление отделами</Link></li>
									<li><Link to="/positions" activeClassName="active">Должности</Link></li>
									<li><Link to="/categories" activeClassName="active">Категории</Link></li>
									<li><Link to="/roles" activeClassName="active">Роли</Link></li>
									<li><Link to="/permissions" activeClassName="active">Права</Link></li>
								</Collapsable>
							</li>
						</ul>

						<Link
							to={((this.props.mainData || {}).activePage != 'dashboard') ? '/dashboard' : '/'}
							className="sidebar-brand"
						>
							<i className="gi gi-flash"></i><span className="sidebar-nav-mini-hide">Company</span>
						</Link>
					</div>
				</section>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isSidebarOpen: state.main_page.isSidebarOpen,
		mainData     : state.main_page.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logout       : bindActionCreators(logout, dispatch),
		toggleSidebar: bindActionCreators(toggleSidebar, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
