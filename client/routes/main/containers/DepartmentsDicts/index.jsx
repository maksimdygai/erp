import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import fetchDepartmentsDicts from 'modules/departments_dicts/actions/fetch.js';
import removeDepartmentDict from 'modules/departments_dicts/actions/remove.js';
import DepartmentsDictsTable from '../../components/DepartmentsDictsTable'

class DepartmentsDicts extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount(){
        this.props.fetch();

        this.props.setMainPageData({
            activePage: "departments_dicts"
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
                            <Link to='/departments_dicts/new/edit' className="btn btn-default pull-right">Добавить</Link>
                            Отделы
                            <br></br>
                            <small>Список названий отделов</small>
                        </h1>
                    </div>
                </div>
                
                <DepartmentsDictsTable
                    data={this.props.departments_dicts}
                    remove={this.handleRemove}
                    entity="departments_dicts"
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        departments_dicts: state.departments_dicts.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch          : bindActionCreators(fetchDepartmentsDicts, dispatch),
        remove         : bindActionCreators(removeDepartmentDict, dispatch),
        setMainPageData: bindActionCreators(setMainPageData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsDicts);

