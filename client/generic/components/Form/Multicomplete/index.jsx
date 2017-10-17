import React, {PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';
import dictionaries from 'generic/dictionaries';

const
    getSuggestions = (data, value, comparatorValue) => {
        const
            inputValue = value.trim().toLowerCase(),
            inputLength = inputValue.length;

        return inputLength === 0 ? [] : data.filter(item =>
            item[comparatorValue].toLowerCase().slice(0, inputLength) === inputValue
        );
    };

class Multicomplete extends React.Component {
    constructor() {
        super();

        this.state = {
            data       : [],
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
        this.setState({data: this.props.items});
    }

    componentWillUpdate(nextProps) {
        const
            newItems = nextProps.items;

        if(this.props.items !== newItems) {
            this.setState({data: newItems});
        }
    }

    onChange = (e, {newValue}) => {
        this.setState({value: newValue});
    }

    onDeleteItem = e => {
        const
            data = _.filter(this.state.data, O => O.id !== parseInt(e.target.id));

        e.preventDefault();
        this.setState({data: data});
        this.context.passValueToParent(e.target.name, data);
    };

    onSuggestionsFetchRequested = ({value, reason}) => {
        this.setState({suggestions: _.filter(this.props.data, x => {
            return !_.includes(this.state.data, x);
        })});
    }

    onSuggestionsClearRequested = () => {
        this.setState({suggestions: []});
    };

    onSuggestionSelected = (e, {suggestion}) => {
        const
            data = this.state.data

        if(!_.some(data, {id: suggestion.id}))
            data.push(suggestion);

        this.setState({
            data : data,
            value: ''
        });

        this.context.passValueToParent(this.props.name, data);
    }

    getSuggestionValue = suggestion => suggestion[this.props.comparatorValue]

    renderSuggestion = suggestion => (
        <span role="option">{suggestion[this.props.comparatorValue]}</span>
    )

    render() {
        const
            {data, suggestions, value} = this.state,

            {
                defaultErrorMessage = 'Это обязательное поле',
                items,
                name,
                placeholder,
                required = false,
                title
            } = this.props,

            errors = this.context ? this.context.errors : this.props.errors,
            error = errors[name],

            inputProps = {
                name,
                onChange: this.onChange,
                value
            },

            tags = data.map(item => {
                const
                    {id, name, role} = item || {};

                return (<span className="tag input-tag" key={id}>
                    <span>{name || role}</span>
                    <a href="#" id={id} name={this.props.name} title="Remove tag" onClick={e => this.onDeleteItem(e)}>x</a>
                </span>)
            });

        return (
            <div className="form-group">
                <label htmlFor={name}>
                    {title}
                    {required && <span className="text-danger">*</span>}
                </label>

                <div className="tagsinput" >
                    {tags}

                    <Autosuggest
                        alwaysRenderSuggestions={true}
                        getSuggestionValue={this.getSuggestionValue}
                        inputProps={inputProps}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        renderSuggestion={this.renderSuggestion}
                        suggestions={suggestions}
                    />
                </div>

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

export default Multicomplete;
