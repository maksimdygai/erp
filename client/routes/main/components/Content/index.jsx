import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setMainPageData from 'modules/main_page/actions/set_data.js';

class Content extends React.Component {
    componentDidUpdate() {
      window.scrollTo(0, 0);
    }

    render() {
        return (
        	<div id="page-content">
        		{this.props.children}
        	</div>
        );
    }
}

Content.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
