import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import viewPosition from 'modules/positions/actions/view';
import post from 'modules/positions/actions/post';
import put from 'modules/positions/actions/put';

class PositionEdit extends React.Component {
    componentWillMount() {
        const
            id = this.props.params.id;

        if(id != 'new')
            this.props.viewPosition(this.props.params.id);

        this.setState({entity: 'positions'});
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
                            {params.id === 'new' ? 'Новая должность' : `${name}`}
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
        item: state.positions.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        post        : bindActionCreators(post, dispatch),
        put         : bindActionCreators(put, dispatch),
        viewPosition: bindActionCreators(viewPosition, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionEdit);
