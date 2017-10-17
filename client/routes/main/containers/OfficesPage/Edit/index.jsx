import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import ContactField from 'generic/components/Form/ContactField';
import viewOffice from 'modules/offices/actions/view';
import post from 'modules/offices/actions/post.js';
import put from 'modules/offices/actions/put.js';
import getName from 'generic/helpers/get-name';

class OfficeEdit extends React.Component {
    componentWillMount() {
        const
            id = this.props.params.id;

        if(id != 'new')
            this.props.viewOffice(this.props.params.id);

        this.setState({entity: 'offices'});
    }

    render() {
        const
            {item, params, post, put} = this.props,
            {entity} = this.state,
            
            {
                address,
                email,
                head,
                id,
                name,
                phone
            } = params.id === 'new' ? {} : (item || {});

        return (
            <div>
                <div className="content-header">
                    <div className="header-section">
                        <h1>
                            <i className="gi gi-table"></i>
                            {params.id === 'new' ? 'Новый офис' : `${name}`}
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
                                <div className="col-md-2">
                                    <Input
                                        defaultValue={name}
                                        name='name'
                                        required={true}
                                        title="Название"
                                        type='text'
                                        validations='isLength:1'
                                    />
                                </div>

                                <div className="col-md-2">
                                    <ContactField
                                        value={getName(head)}
                                        name='head'
                                        title="Руководитель"
                                    />
                                </div>

                                <div className="col-md-2">
                                    <Input
                                        defaultValue={address}
                                        name='address'
                                        required={true}
                                        title="Адрес"
                                        type='text'
                                        validations='isLength:1'
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Input
                                        defaultValue={email}
                                        name='email'
                                        required={true}
                                        title="Email"
                                        type='text'
                                        validations='isEmail'
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Input
                                        defaultValue={phone}
                                        name='phone'
                                        pattern='8\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}'
                                        placeholder='Телефон в формате 8 863 xxx-xx-xx'
                                        required={true}
                                        title="Телефон"
                                        type='text'
                                        validations='isLength:1,matches'
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
        item: state.offices.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        post      : bindActionCreators(post, dispatch),
        put       : bindActionCreators(put, dispatch),
        viewOffice: bindActionCreators(viewOffice, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficeEdit);