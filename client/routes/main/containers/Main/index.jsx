import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch';
import getUserInfo from 'modules/user_info/actions/fetch';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import Content from '../../components/Content';
import Dashboard from '../../components/Dashboard';
import Notifications from 'react-notification-system-redux';

class Main extends React.Component {
	static defaultProps = {
		isSidebarOpen: false
	}

	componentWillMount() {
		moment.locale('ru');
		
		browserHistory.listen(location => {
			if(location.pathname !== '/login')
				this.props.getUserInfo();
		});
	}

	render() {
		const
			{children, isSidebarOpen, notifications, userInfo} = this.props;

		return (
			<div
				id="page-container"

				className={`
					footer-fixed
					sidebar-partial
					sidebar-no-animations
					${isSidebarOpen ? 'sidebar-visible-lg sidebar-visible-xs' : ''}
				`}
			>
				<SideBar user={userInfo || {}} />

				<div id="main-container">
					<Content>
						{children}
					</Content>

					<Notifications notifications={notifications} />

					<footer className="clearfix">
						<div className="pull-right">
							Developed by Developer
						</div>
						<div className="pull-left">
							&copy; Company 2017
						</div>
					</footer>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		isSidebarOpen: state.main_page.isSidebarOpen,
		notifications: state.notifications,
		userInfo     : state.user_info.data
	}),

	dispatch => ({getUserInfo: bindActionCreators(getUserInfo, dispatch)})
)(Main);
