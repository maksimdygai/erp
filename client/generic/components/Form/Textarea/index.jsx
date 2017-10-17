import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dictionaries from 'generic/dictionaries';

class Textarea extends React.Component{
    constructor() {
        super();

        this.state = {
            error       : false,
            errorMessage: '',
            value       : null
        };
    }

    static contextTypes = {
        errors  : PropTypes.object,
        isSent  : PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        router  : PropTypes.object.isRequired
    }

    componentWillMount() {
        if (this.props.defaultValue) {
            this.setState({
                value   : this.props.defaultValue,
                received: true
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.received && !this.state.value && nextProps.defaultValue) {
            this.setState({
                value   : nextProps.defaultValue,
                received: true
            });
        }
    }

    componentWillUpdate() {
        if(this.context.isSent)
            this.setState({value: ''});
    }

    onChange = e => {
        const
            {pattern, validations} = this.props;

        this.setState({value: e.target.value});
        this.context.onChange(e, validations, pattern);
    }

    render() {
        const
            {
                compact,
                defaultValue,
                defaultErrorMessage = 'Заполните поле корректно',
                name,
                placeholder,
                required = false,
                rows,
                title,
            } = this.props;

        return (
            <div className={compact ? '' : 'form-group'}>
                {title && (<label htmlFor={name}>
                    {title}
                    {required && <span className="text-danger">*</span>}
                </label>)}

                <textarea
                    className="form-control"
                    value={this.state.value}
                    id={name}
                    name={name}
                    onChange={e => this.onChange(e)}
                    placeholder={placeholder ? placeholder : title}
                    rows={rows}
                    type="text"
                ></textarea>

                {this.context.errors[name] && <span
                    className="help-block has-error"
                    {...(this.context.errors[name] || '').length ? {} : {hidden: {}}}
                >
                    {dictionaries.form_errors[this.context.errors[name]] || defaultErrorMessage}
                </span>}
            </div>
        );
    }
}

export default Textarea;
