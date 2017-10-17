import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import viewDepartment from 'modules/departments_dicts/actions/view.js';
import post from 'modules/departments_dicts/actions/post.js';
import put from 'modules/departments_dicts/actions/put.js';

class DepartmentEdit extends React.Component {
    componentWillMount() {
        const
            id = this.props.params.id;

        if(id != 'new')
            this.props.viewDepartment(this.props.params.id);

        this.setState({entity: 'departments_dicts'});
    }

    render() {
        const
            {item, params, post, put} = this.props,
            {entity} = this.state,
            {name} = params.id === 'new' ? {} : (item || {});

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
                                    <Input
                                        defaultValue={name}
                                        name='name'
                                        required={true}
                                        title="Название"
                                        type='text'
                                        validations='isLength:1'
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
        item: state.departments_dicts.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        post          : bindActionCreators(post, dispatch),
        put           : bindActionCreators(put, dispatch),
        viewDepartment: bindActionCreators(viewDepartment, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentEdit);
