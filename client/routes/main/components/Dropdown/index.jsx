import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toggleDropdown from 'modules/main_page/actions/toggle_dropdown';
import logout from 'modules/login_page/actions/logout';

class Dropdown extends React.Component {
    static defaultProps = {
    	isOpen: false
    }

    handleItemClick = () => {
    	this.props.toggle(false);
    }

    handleLogout = e => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return (
        	<ul className={`dropdown-menu dropdown-custom dropdown-menu-right ${this.props.isOpen ? '' : 'hidden'}`}>
				<li className="dropdown-header text-center">Аккаунт</li>
				<li>
				    <Link to='/profile' onClick={() => this.handleItemClick()}>
				        <i className="fa fa-user fa-fw pull-right"></i>
				        Профиль
				    </Link>

				    <Link to='/settings'>
				        <i className="fa fa-cog fa-fw pull-right"></i>
				        Настройки
				    </Link>

				    <a href="#" onClick={e => this.handleLogout(e)}><i className="fa fa-ban fa-fw pull-right"></i>Выйти</a>
				</li>
			</ul>
        );
    }
}

Dropdown.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
    	isOpen: state.main_page.isDropdownOpen
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
    	toggle: bindActionCreators(toggleDropdown, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
