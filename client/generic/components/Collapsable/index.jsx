import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toggleCollapsable from 'modules/main_page/actions/toggle_collapsable.js';

const
	Collapsable = ({children, defaultCollapsed, icon, isCollapsed, title, toggle, uniqueId}) => {
		let
			collapsed = _.isUndefined(isCollapsed[uniqueId]) ? defaultCollapsed : isCollapsed[uniqueId];

		return (<div>
			<a href="#"
				className={collapsed ? 'open' : ''}
				onClick={() => toggle(uniqueId, (isCollapsed || {})[uniqueId])}
			>
	            <i className="fa fa-angle-left sidebar-nav-indicator sidebar-nav-mini-hide"></i>
	            {icon && (<i className={`gi sidebar-nav-icon ${icon}`}></i>)}
	            <span className="sidebar-nav-mini-hide">{title}</span>
	        </a>

			<ul
				style={collapsed ? {display: "block"} : {}}
			>
				{children}
			</ul>
		</div>)
	};

function mapStateToProps(state) {
    return {
    	isCollapsed: state.main_page.isCollapsed
    };
}

function mapDispatchToProps(dispatch) {
    return {
    	toggle: bindActionCreators(toggleCollapsable, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Collapsable);
