import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dictionaries from 'generic/dictionaries';

class Radio extends React.Component{
    constructor() {
        super();
        this.state = {
            checked: 0,
            received: false
        };
    }

    static contextTypes = {
        passValueToParent: PropTypes.func.isRequired,
        router           : PropTypes.object.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.received &&
            nextProps.checked !== undefined) {
            this.setState({
                checked: Number(nextProps.checked),
                received: true
            });
        }
    }

    onChange = e => {
        const
            value = _.toInteger(e.target.value);

        this.setState({checked: value});
        this.context.passValueToParent(this.props.name, value);
    }

    render() {
        const
            {
                name,
                required,
                title,

                options = [
                    {label: 'Не установлено', value: 0},
                    {label: 'Да'            , value: 1},
                    {label: 'Нет'           , value: 2}
                ]

            } = this.props;

        return (
            <div className="form-group">
                <label title={title}>
                    {title}
                    {required && <span className="text-danger">*</span>}
                </label>

                <p>
                    {options.map(O => {
                        const
                            {label, value} = O;

                        return (
                            <label key={value} htmlFor={`${value}`} className="radio-inline">
                                <input
                                    id={`${name}-${value}`}
                                    name={`${name}-${value}`}
                                    onChange={e => this.onChange(e)}
                                    type="radio"
                                    value={value}
                                    {...this.state.checked === value ? {checked: {}} : {checked: false}}
                                />
                                {label}
                            </label>
                        )
                    })}
                </p>
            </div>
        );
    }
}

export default Radio;
