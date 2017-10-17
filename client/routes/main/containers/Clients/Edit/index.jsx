import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import ContactField from 'generic/components/Form/ContactField';
import fetch from 'modules/clients/actions/view.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import postClient from 'modules/clients/actions/post.js';
import putClient from 'modules/clients/actions/put.js';
import getName from 'generic/helpers/get-name';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';
import findCheck from 'generic/helpers/find-check';

class ClientEdit extends React.Component {
    constructor() {
        super();
        this.state = {data: {}};
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        if(this.props.params.id !== 'new')
            this.props.fetch(this.props.params.id);

        this.props.fetchUsers();
    }

    render() {
        const
            {allUsers, params, post, put, clients} = this.props,
            data = _.find(clients, C => C.id == params.id),

            {
                email,
                first_name,
                last_name,
                manager,
                mobile_phone,
                work_phone
            } = params.id === 'new' ? {} : data || {};

        return (
            <div>
                <div className="content-header">
                    <div className="header-section">
                        <h1>
                            <i className="gi gi-table"></i>
                            {params.id === 'new' ? 'Новый клиент' : `${getName(data)}`}
                            <br></br>
                            <small>Редактирование</small>
                        </h1>
                    </div>
                </div>

                <div className="block">
                    <Form
                        data={data}
                        entity='clients'
                        new={params.id === 'new' ? true : false}
                        post={post}
                        put={put}

                        schema={{
                            email: 'isEmail',
                            first_name: 'isLength:1',
                            last_name: 'isLength:1',
                            mobile_phone: 'isLength:1'
                        }}
                    >
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-2">
                                    <Input
                                        defaultValue={first_name}
                                        name='first_name'
                                        required={true}
                                        title="Имя"
                                        validations='isLength:1'
                                    />
                                </div>

                                <div className="col-md-2">
                                    <Input
                                        defaultValue={last_name}
                                        name='last_name'
                                        required={true}
                                        title="Фамилия"
                                        validations='isLength:1'
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Input
                                        defaultValue={email}
                                        name='email'
                                        required={true}
                                        title="Email"
                                        validations='isEmail'
                                    />
                                </div>

                                <div className="col-md-2">
                                    <Input
                                        defaultValue={mobile_phone}
                                        name='mobile_phone'
                                        pattern='\+\d{1}\s\d{3}\s\d{3}\-\d{2}\-\d{2}'
                                        required={true}
                                        placeholder='Телефон в формате +7 xxx xxx-xx-xx'
                                        title="Телефон (мобильный)"
                                        validations='isLength:1,matches'
                                    />
                                </div>

                                <div className="col-md-3">
                                    <ContactField
                                        entity='clients'
                                        name='manager'
                                        required={true}
                                        title="Менеджер"
                                        value={getName(findCheck(allUsers, manager))}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-2">
                                    <Input
                                        defaultValue={work_phone}
                                        name='work_phone'
                                        pattern='\+\d{1}\s\d{3}\s\d{3}\-\d{2}\-\d{2}'
                                        placeholder='Телефон в формате +7 xxx xxx-xx-xx'
                                        title="Телефон (рабочий)"
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
        allUsers: state.users.data,
        clients : state.clients.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch     : bindActionCreators(fetch, dispatch),
        fetchUsers: bindActionCreators(fetchUsers, dispatch),
        post      : bindActionCreators(postClient, dispatch),
        put       : bindActionCreators(putClient, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientEdit);
