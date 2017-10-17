import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';
import fetchUsers from 'modules/users/actions/fetch.js';
import getName from '../../../helpers/get-name';
import dictionaries from 'generic/dictionaries';

const
    getSuggestions = (data, value) => {
        const
            inputValue = value.trim().toLowerCase(),
            inputLength = inputValue.length;

        return inputLength === 0 ? data : data.filter(item =>
            item.first_name.toLowerCase().slice(0, inputLength) === inputValue
        );
    },

    getSuggestionValue = suggestion => getName(suggestion),

    renderSuggestion = suggestion => (
        <span role="option">{getName(suggestion)}</span>
    );

class ContactField extends React.Component {
    constructor() {
        super();

        this.state = {
            data       : {},
            isError    : false,
            suggestion : {},
            suggestions: [],
            value      : ''
        };
    }

    static contextTypes = {
        errors           : PropTypes.object,
        forceError       : PropTypes.func,
        onChange         : PropTypes.func.isRequired,
        passValueToParent: PropTypes.func.isRequired,
        router           : PropTypes.object.isRequired
    }

    componentWillMount(){
        this.props.fetchUsers();
        this.setState({value: this.props.value});
    }

    componentWillUpdate(nextProps) {
        const
            newVal = nextProps.value;

        if(this.props.value !== newVal) {
            this.setState({value: newVal});
        }
    }

    componentDidUpdate() {
        const
            {isError, suggestion, value} = this.state;

        if(!_.isEmpty(suggestion) && value != '')
            this.context.passValueToParent(this.props.name, {id: suggestion.id}, isError, 'isUnique');
    }

    onChange = (event, {newValue}) => {
        this.setState({value: newValue});

        if(newValue == '')
            this.context.passValueToParent(this.props.name, null, this.state.isError);
    }

    onSuggestionsFetchRequested = ({value}) => {
        const
            data = this.props.items || this.props.data;

        this.setState({suggestions: getSuggestions(data, value)});
    }

    onSuggestionSelected = (event, {suggestion}) => {
        const
            {compArr, entity, isUnique, name} = this.props,
            isError = !_.isUndefined(isUnique && _.find(compArr, I => I[name].id === suggestion.id));

        this.setState({
            isError   : isError,
            suggestion: suggestion
        });

        this.context.passValueToParent(this.props.name, {id: suggestion.id}, isError, 'isUnique');
    }

    render() {
        const
            {
                defaultErrorMessage = 'Это обязательное поле',
                defaultValue,
                name,
                placeholder,
                required = false,
                title
            } = this.props,

            {value, suggestions} = this.state,
            errors = this.context ? this.context.errors : this.props.errors,
            error = errors[name],

            inputProps = {
                name,
                onChange: this.onChange,
                value
            };

        return (
            <div className="form-group">
                <label htmlFor={name}>
                    {title}
                    {required && <span className="text-danger">*</span>}
                </label>

                <Autosuggest
                    alwaysRenderSuggestions={true}
                    getSuggestionValue={getSuggestionValue}
                    inputProps={inputProps}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderSuggestion={renderSuggestion}
                    suggestions={suggestions}
                />

                {error && <span
                    className="help-block has-error"
                    {...(this.state.isError || error) ? {} : {hidden: {}}}
                >
                    {defaultErrorMessage || dictionaries.form_errors[this.context.errors[name]]}
                </span>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data : state.users.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers: bindActionCreators(fetchUsers, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactField);
