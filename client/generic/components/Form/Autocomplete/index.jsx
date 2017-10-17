import React, {PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';
import dictionaries from 'generic/dictionaries';

const
    getSuggestions = (data, value, comparatorValue) => {
        const
            inputValue = value ? value.trim().toLowerCase() : '',
            inputLength = inputValue.length;

        return inputLength === 0 ? data : data.filter(item =>
            item[comparatorValue].toLowerCase().slice(0, inputLength) === inputValue
        );
    },

    getSuggestionValue = suggestion => suggestion.name,

    renderSuggestion = suggestion => (
        <span role="option">{suggestion.name}</span>
    );

class Autocomplete extends React.Component {
    constructor() {
        super();

        this.state = {
            data       : {},
            suggestions: [],
            value      : ''
        };
    }

    static contextTypes = {
        errors           : PropTypes.object,
        onChange         : PropTypes.func.isRequired,
        passValueToParent: PropTypes.func.isRequired,
        router           : PropTypes.object.isRequired
    }

    componentWillMount(){
        this.setState({value: this.props.value});
    }

    componentWillUpdate(nextProps) {
        const
            newVal = nextProps.value;

        if(this.props.value !== newVal) {
            this.setState({value: newVal});
        }
    }

    onChange = (event, {newValue}) => {
        this.setState({value: newValue});
    }

    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(this.props.data, value, this.props.comparatorValue)
        });
    }

    onSuggestionsClearRequested = () => {
        this.setState({suggestions: []});
    };

    onSuggestionSelected = (event, {suggestion}) => {
        this.context.passValueToParent(this.props.name, {id: suggestion.id});
    }

    render() {
        const
            {
                defaultErrorMessage = 'Это обязательное поле',
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
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderSuggestion={renderSuggestion}
                    suggestions={suggestions}
                />

                {error && <span
                    className="help-block has-error"
                    {...(error || '').length ? {} : {hidden: {}}}
                >
                    {dictionaries.form_errors[error] || defaultErrorMessage}
                </span>}
            </div>
        );
    }
}

export default Autocomplete;
