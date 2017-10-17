import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import fetchUnits from 'modules/units/actions/fetch.js';
import removeUnit from 'modules/units/actions/remove.js';
import Table from '../../../../generic/components/Table';
import UnitsTable from '../../components/UnitsTable'

class Units extends React.Component {
    componentWillMount(){
        this.props.fetch();

        this.props.setMainPageData({
            activePage: "units"
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
                            <Link to='/units/new/edit' className="btn btn-default pull-right">Добавить</Link>
                            Подразделения
                            <br></br>
                            <small>Таблица всех подразделений</small>
                        </h1>
                    </div>
                </div>
                
                <UnitsTable data={this.props.units} remove={this.handleRemove} entity="units" />
            </div>
        );
    }
}

Units.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        units: state.units.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch          : bindActionCreators(fetchUnits, dispatch),
        remove         : bindActionCreators(removeUnit, dispatch),
        setMainPageData: bindActionCreators(setMainPageData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Units);
