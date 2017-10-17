import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setMainPageData from 'modules/main_page/actions/set_data.js';

class Profile extends React.Component {
	componentWillMount() {
		this.props.setMainPageData({
			activePage: "profile"
		});
	}

    render() {
        return (
            <div>
            	<div className="content-header">
                    <div className="header-section">
                        <h1>
                            Профиль
                            <br></br>
                            <small>Просмотр профиля</small>
                        </h1>
                    </div>
                </div>                
            </div>
        );
    }
}

Profile.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        setMainPageData: bindActionCreators(setMainPageData, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
