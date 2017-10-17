import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import fetchOffices from 'modules/offices/actions/fetch.js';
import removeOffice from 'modules/offices/actions/remove.js';
import Table from '../../../../generic/components/Table';
import { Link } from 'react-router';
import OfficesTable from '../../components/OfficesTable'

class Offices extends React.Component {
    componentWillMount(){
        this.props.fetch();

        this.props.setMainPageData({
            activePage: "offices"
        });
    }

    handleRemove = (e, id) => {
        e.preventDefault();
        this.props.remove(id);
    }

    render() {
        return (
            <div>
                <div className="content-header">
                    <div className="header-section">
                        <h1>
                            <Link to='/offices/new/edit' className="btn btn-default pull-right">Добавить</Link>
                            Офисы
                            <br></br>
                            <small>Таблица всех офисов</small>
                        </h1>
                    </div>
                </div>
                
                <OfficesTable data={this.props.offices} remove={this.handleRemove} entity="offices" />
            </div>
        );
    }
}

Offices.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        offices: state.offices.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch          : bindActionCreators(fetchOffices, dispatch),
        remove         : bindActionCreators(removeOffice, dispatch),
        setMainPageData: bindActionCreators(setMainPageData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Offices);

