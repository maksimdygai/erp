import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import fetchDepartments from 'modules/departments/actions/fetch.js';
import removeDepartment from 'modules/departments/actions/remove.js';
import DepartmentsTable from '../../components/DepartmentsTable'

class Departments extends React.Component {
    componentWillMount(){
        this.props.fetch();

        this.props.setMainPageData({
            activePage: "departments"
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
                            <Link to='/departments/new/edit' className="btn btn-default pull-right">Добавить</Link>
                            Отделы
                            <br></br>
                            <small>Таблица всех отделов</small>
                        </h1>
                    </div>
                </div>
                
                <DepartmentsTable data={this.props.departments} remove={this.handleRemove} entity="departments" />
            </div>
        );
    }
}

Departments.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        departments: state.departments.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch          : bindActionCreators(fetchDepartments, dispatch),
        remove         : bindActionCreators(removeDepartment, dispatch),
        setMainPageData: bindActionCreators(setMainPageData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Departments);

