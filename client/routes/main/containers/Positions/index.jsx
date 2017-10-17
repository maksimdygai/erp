import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import fetchUnits from 'modules/positions/actions/fetch.js';
import removePosition from 'modules/positions/actions/remove.js';
import Table from '../../../../generic/components/Table';
import { Link } from 'react-router';
import PositionsTable from '../../components/PositionsTable'

class Positions extends React.Component {
    componentWillMount(){
        this.props.fetch();

        this.props.setMainPageData({
            activePage: "positions"
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
                            <Link to='/positions/new/edit' className="btn btn-default pull-right">Добавить</Link>
                            Должность
                            <br></br>
                            <small>Таблица всех должностей</small>
                        </h1>
                    </div>
                </div>
                
                <PositionsTable data={this.props.positions} remove={this.handleRemove} entity="positions" />
            </div>
        );
    }
}

Positions.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        positions: state.positions.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch          : bindActionCreators(fetchUnits, dispatch),
        remove         : bindActionCreators(removePosition, dispatch),
        setMainPageData: bindActionCreators(setMainPageData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Positions);

