import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../../components/Dropdown'
import toggleDropdown from 'modules/main_page/actions/toggle_dropdown';

class User extends React.Component {
	handleClick = () => {
		this.props.toggleDropdown(this.props.isDropdownOpen);
	} 

    render() {
        return (
        	<li id="user" className="dropdown">
        		<a href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={() => this.handleClick()}>
				    <img src="../../../../assets/images/profile.jpg" alt="avatar"></img>
				    <i className="fa fa-angle-down"></i>
				</a>

				<Dropdown />
        	</li>
        );
    }
}

User.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
    	isDropdownOpen: state.main_page.isDropdownOpen
    };
}

function mapDispatchToProps(dispatch) {
    return {
    	toggleDropdown: bindActionCreators(toggleDropdown, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
