import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toggleSidebar from 'modules/main_page/actions/toggle_sidebar';
import User from '../../components/User'

class Header extends React.Component {
	handleSidebarSwitch = () => {
        this.props.toggleSidebar(this.props.isSidebarOpen);
    }

    render() {
        return (
            <header id="header" className="navbar navbar-default navbar-fixed-top">
        		<ul className="nav navbar-nav-custom">
                    <li>
                        <a href="#" onClick={() => this.handleSidebarSwitch()}>
                            <i className="fa fa-bars fa-fw"></i>
                        </a>
                    </li>
                </ul>

                <form action="page_ready_search_results.html" method="post" className="navbar-form-custom">
                    <div className="form-group">
                        <input type="text" id="top-search" name="top-search" className="form-control" placeholder="Поиск"></input>
                    </div>
                </form>

                <ul className="nav navbar-nav-custom pull-right">
                    <User></User>
                </ul>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        isSidebarOpen: state.main_page.isSidebarOpen
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleSidebar: bindActionCreators(toggleSidebar, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
