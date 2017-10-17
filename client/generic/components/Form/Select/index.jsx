import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectPlugin from 'react-select';
import dictionaries from 'generic/dictionaries';

class Select extends React.Component{
    constructor() {
        super();

        this.state = {
            options: [],
            value  : null
        };
    }

    static contextTypes = {
        errors           : PropTypes.object,
        onChange         : PropTypes.func.isRequired,
        passValueToParent: PropTypes.func.isRequired,
        router           : PropTypes.object.isRequired
    }

    componentWillMount() {
        this.setState({
            options: this.props.options ?
              _.map(this.props.options, O => ({label: O.name, value: O.id}))
              : [],
            value  : this.props.value || ''
        })
    }

    componentWillUpdate(nextProps) {
        const
            newVal = nextProps.value,
            newOptions = nextProps.options,
            options = [];

        if(newOptions != this.props.options) {
            newOptions.map(option => {
                options.push({
                    label: option.name,
                    value: option.id
                });

                this.setState({options: options});
            });
        }

        if(this.props.value !== newVal) {
            this.setState({value: newVal});
        }
    }

    onChange = value => {
        const
            newValue = value.value;

        this.props.passState && this.props.passState(value);

        this.setState({value: newValue});
        this.context.passValueToParent(this.props.name, this.props.passInt ? newValue : {id: newValue})
    }

    render() {
        const
            {
                clearable = false,
                compact,
                defaultErrorMessage = 'Это обязательное поле',
                disabled,
                name,
                placeholder,
                required,
                title
            } = this.props,

            {options, value} = this.state,
            errors = this.context ? this.context.errors : this.props.errors,
            error = errors[name];

        return (
            <div className={compact ? '' : 'form-group'}>
                {title && (<label htmlFor={name} title={title}>
                    {title}
                    {required && <span className="text-danger">*</span>}
                </label>)}

                <SelectPlugin
                    clearable={clearable}
                    disabled={disabled}
                    name={name}
                    onChange={this.props.onChange || this.onChange}
                    options={options}
                    placeholder={placeholder || ''}
                    searchable={false}
                    value={value}
                />

                {error && <span
                    className="help-block has-error"
                    {...(error || '').length ? {} : {hidden: {}}}
                    title={dictionaries.form_errors[error] || defaultErrorMessage}
                >
                    {dictionaries.form_errors[error] || defaultErrorMessage}
                </span>}
            </div>
        );
    }
}

export default Select;
