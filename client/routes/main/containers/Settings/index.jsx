import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setMainPageData from 'modules/main_page/actions/set_data.js';

class Settings extends React.Component {
	componentWillMount() {
		this.props.setMainPageData({
			activePage: "settings"
		});
	}

    render() {
        return (
            <div>
            	<div className="content-header">
                    <div className="header-section">
                        <h1>
                            Настройки
                            <br></br>
                            <small>Изменение профиля</small>
                        </h1>
                    </div>
                </div>                
            </div>
        );
    }
}

Settings.contextTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
