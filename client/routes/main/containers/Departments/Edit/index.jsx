import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Autocomplete from 'generic/components/Form/Autocomplete';
import ContactField from 'generic/components/Form/ContactField';
import Select from 'generic/components/Form/Select';
import fetchDepartmentsDicts from 'modules/departments_dicts/actions/fetch.js';
import fetchOffices from 'modules/offices/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import viewDepartment from 'modules/departments/actions/view';
import post from 'modules/departments/actions/post.js';
import put from 'modules/departments/actions/put.js';
import orNone from 'generic/helpers/or-none';
import getName from 'generic/helpers/get-name';

class DepartmentEdit extends React.Component {
    componentWillMount() {
        const
            id = this.props.params.id;

        this.props.fetchDepartmentsDicts();
        this.props.fetchOffices();
        this.props.fetchUsers();

        if(id != 'new')
            this.props.viewDepartment(this.props.params.id);

        this.setState({entity: 'departments'});
    }

    render() {
        const
            {allDepartmentsDicts, allOffices, allUsers, item, params, post, put} = this.props,
            {entity} = this.state,
            {department = {}, head = {}, office = {}} = params.id === 'new' ? {} : (item || {});

        return (
            <div>
                <div className="content-header">
                    <div className="header-section">
                        <h1>
                            <i className="gi gi-table"></i>
                            {params.id === 'new' ? 'Новый отдел' : `${name}`}
                            <br></br>
                            <small>Редактирование</small>
                        </h1>
                    </div>
                </div>

                <div className="block">
                    <Form
                        data={item}
                        entity={entity}
                        new={params.id === 'new' ? true : false}
                        post={post}
                        put={put}
                    >
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3">
                                    <Select
                                        name='department'
                                        options={allDepartmentsDicts}
                                        placeholder='Выберите название'
                                        title='Название'
                                        value={department.id}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Autocomplete
                                        data={allOffices}
                                        comparatorValue='name'
                                        key='department-office-atc'
                                        name='office'
                                        title="Офис"
                                        value={orNone((_.find(allOffices, {'id': office.id}) || {}).name)}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <ContactField
                                        value={getName(_.find(allUsers, {'id': head.id}))}
                                        name='head'
                                        title="Руководитель"
                                        type='text'
                                    />
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>                    
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allDepartmentsDicts: state.departments_dicts.data,
        allOffices         : state.offices.data,
        allUsers           : state.users.data,
        item               : state.departments.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDepartmentsDicts: bindActionCreators(fetchDepartmentsDicts, dispatch),
        fetchOffices         : bindActionCreators(fetchOffices, dispatch),
        fetchUsers           : bindActionCreators(fetchUsers, dispatch),
        post                 : bindActionCreators(post, dispatch),
        put                  : bindActionCreators(put, dispatch),
        viewDepartment       : bindActionCreators(viewDepartment, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentEdit);
