import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toggleCollapsable from 'modules/main_page/actions/toggle_collapsable.js';

const
	CollapsableBlock = ({children, icon, isCollapsed, title, toggle, uniqueId}) => {
		let
			collapsed = isCollapsed[uniqueId];

		return (
			<div className="block collapsable-block">
				<div 
					className={`block-title ${collapsed ? 'open' : ''}`}
					onClick={() => toggle(uniqueId, (isCollapsed || {})[uniqueId])}
				>
					<h2>
			            {title}
			        </h2>
					
					<div className="block-options pull-right">
		            	<i className="fa fa-angle-left"></i>
					</div>
			    </div>

				<div
					className="collapsable-block-content"
					style={{display: collapsed ? "block" : "none"}}
				>
					{children}
				</div>
			</div>
		)
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

export default connect(mapStateToProps, mapDispatchToProps)(CollapsableBlock);
