import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import filter from 'modules/filter/actions/fetch.js';
import filterHash from 'modules/filter/actions/hash.js';
import selectedKey from 'generic/helpers/selected-key';
import setUrlHash from 'generic/helpers/set-url-hash';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {data: {}};
    }

    static childContextTypes = {
        onChange         : PropTypes.func,
        passValueToParent: PropTypes.func,
        reset            : PropTypes.func
    }

    componentWillMount() {
        const
            hash = location.hash.substr(1);

        if(hash) {
            this.props.filterHash(hash);
            this.setState({data: JSON.parse(hash)});
        }
    }

    componentWillUpdate(nP, nS) {
        this.props.filterHash(JSON.stringify(nS.data));
        setUrlHash(nS.data);
    }

    getChildContext() {
        return {
            onChange         : this.handleInput,
            passValueToParent: this.handlePassedValue,
            reset            : this.resetField
        };
    }

    handleInput = (name, value, operator) => {
        const
            data = this.state.data;

        data[name] = {value, operator};
        this.setState({data: data});
    }

    handleSubmit = e => {
        e.preventDefault();

        if(_.includes(e.target.className.split(' '), 'disabled'))
            return;

        this.props.filter({
            entity: this.props.entity,
            query : this.state.data
        });
    }

    handlePassedValue = (name, value) => {
        let
            {data} = this.state;

        {/* handle single/multiple relations */}
        data[name] = _.isArray(value) ? selectedKey(value, 'id') : value;
        this.setState({data: data});
    }

    reset = e => {
        e.preventDefault();
        this.setState({data: {}});
    }

    resetField = name => {
        const
            data = this.state.data;

        data[name] = undefined;
        this.setState({data: data});
    }

    render() {
        return (
            <form id="form-validation" className="form-horizontal form-bordered filter">
                {this.props.children}

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group form-actions">
                            <div className="col-md-12 text-right">
                                <button
                                    className={`btn btn-sm btn-default`}
                                    onClick={e => this.reset(e)}
                                    type="cancel"
                                >
                                    Сбросить
                                </button>

                                <button
                                    className={`btn btn-sm btn-primary`}
                                    onClick={e => this.handleSubmit(e)}
                                    type="submit"
                                >
                                    Найти
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filter    : bindActionCreators(filter, dispatch),
        filterHash: bindActionCreators(filterHash, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Filter);
