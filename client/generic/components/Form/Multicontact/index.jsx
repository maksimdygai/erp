import React, {PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';
import getName from '../../../helpers/get-name';
import dictionaries from 'generic/dictionaries';

const
    getSuggestions = (data, value, comparatorValue) => {
        const
            inputValue = value.trim().toLowerCase(),
            inputLength = inputValue.length;

        return inputLength === 0 ? [] : data.filter(item =>
            item.first_name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

class Multicontact extends React.Component {
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
        this.setState({data: this.props.items || []})
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

        this.setState({
            data: data
        });

        this.context.passValueToParent(e.target.name, data);
    };

    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(this.props.data, value, this.props.comparatorValue)
        });
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
        <span role="option">{getName(suggestion)}</span>
    )

    render() {
        const
            {
                defaultErrorMessage = 'Это обязательное поле',
                items,
                name,
                placeholder,
                required = false,
                title
            } = this.props,

            {data, suggestions, value} = this.state,
            errors = this.context ? this.context.errors : this.props.errors,
            error = errors[name],

            inputProps = {
                name,
                onChange: this.onChange,
                value
            },

            tags = data && data.map(item => {
                const
                    {id} = item,
                    fullName = getName(item);

                return (<span className="tag input-tag" key={id}>
                    <span title={fullName}>{fullName}</span>

                    <a
                        href="#"
                        id={id}
                        name={this.props.name}
                        title="Remove tag"
                        onClick={e => this.onDeleteItem(e)}
                    >x</a>
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

export default Multicontact;
