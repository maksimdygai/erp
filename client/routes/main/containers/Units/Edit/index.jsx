import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import ContactField from 'generic/components/Form/ContactField';
import Multicomplete from 'generic/components/Form/Multicomplete';
import fetchOffices from 'modules/offices/actions/fetch.js';
import fetchUnit from 'modules/units/actions/view.js';
import post from 'modules/units/actions/post.js';
import put from 'modules/units/actions/put.js';
import getName from 'generic/helpers/get-name';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

class UnitEdit extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.props.fetchOffices();
        this.props.fetchUnit(this.props.params.id);
    }

    render() {
        const
            {allOffices, data, item, params, post, put} = this.props,
            {head, name, offices} = item || {};

        return (
            <div>
                <div className="content-header">
                    <div className="header-section">
                        <h1>
                            <i className="gi gi-table"></i>
                            {params.id === 'new' ? 'Новое подразделение' : `${name}`}
                            <br></br>
                            <small>Редактирование</small>
                        </h1>
                    </div>
                </div>

                <div className="block">
                    <Form
                        data={item}
                        entity='units'
                        new={params.id === 'new' ? true : false}
                        post={post}
                        put={put}
                    >
                        <fieldset>
                            <div className="col-md-4">
                                <Input
                                    defaultValue={name}
                                    name='name'
                                    required={true}
                                    title="Название"
                                    type='text'
                                    validations='isLength:1'
                                />
                            </div>

                            <div className="col-md-4">
                                <ContactField
                                    compArr={data}
                                    defaultErrorMessage='Это руководитель другого подразделения'
                                    entity='units'
                                    isUnique={true}
                                    name='head'
                                    title="Руководитель"
                                    type='text'
                                    value={getName(head)}
                                />
                            </div>

                            <div className="col-md-4">
                                <Multicomplete
                                    comparatorValue='name'
                                    data={allOffices}
                                    items={matchArrEqualObjProps(offices, allOffices)}
                                    key='unit-offices-mtc'
                                    name='offices'
                                    title="Офисы"
                                />
                            </div>
                        </fieldset>
                    </Form>
                </div>                    
            </div>
        );
    }   
}

function mapStateToProps(state) {
    return {
        allOffices: state.offices.data,
        data      : state.units.data,
        item      : state.units.item
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchOffices: bindActionCreators(fetchOffices, dispatch),
        fetchUnit   : bindActionCreators(fetchUnit, dispatch),
        post        : bindActionCreators(post, dispatch),
        put         : bindActionCreators(put, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitEdit);
