import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePickerPlugin from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import dictionaries from 'generic/dictionaries';

/*
    Usage

        * Only moment() date must be passed to Datepicker
*/

class Datepicker extends React.Component{
    constructor() {
        super();

        this.state = {
            date: ''
        };
    }

    static contextTypes = {
        errors           : PropTypes.object,
        onChange         : PropTypes.func.isRequired,
        passValueToParent: PropTypes.func.isRequired,
        router           : PropTypes.object.isRequired
    }

    componentWillMount() {
        let
          def = moment();

        if (!this.props.time) {
            def.set('hour', 0);
            def.set('minute', 0);
        }

        this.setState({date: this.props.defaultDate || def});
    }

    componentWillUpdate(nextProps) {
        const
            newDate = nextProps.defaultDate;

        if(this.props.defaultDate !== newDate) {
            this.setState({date: moment(newDate)});
        }
    }

    onDateChange = value => {
        let
          newDate = this.state.date;

        newDate.set('year', value.get('year'));
        newDate.set('month', value.get('month'));
        newDate.set('day', value.get('day'));

        this.setState({date: newDate});
        this.context.passValueToParent(this.props.name, newDate.format());
    }

    onTimeChange = value => {
        let
          newTime = this.state.date;

        newTime.set('hour', value.get('hour'));
        newTime.set('minute', value.get('minute'));

        this.setState({date: newTime});
        console.log(newTime.format());
        this.context.passValueToParent(this.props.name, newTime.format());
    }

    render() {
        const
            {
                defaultErrorMessage = 'Это обязательное поле',
                name,
                required,
                title,
                time
            } = this.props,

            errors = this.context ? this.context.errors : this.props.errors,
            error = errors[name];

        return (
            <div className="form-group">
                <label htmlFor={name}>
                    {title}
                    {required && <span className="text-danger">*</span>}
                </label>

                <div className="row">
                    <div className={time ? 'col-md-6' : 'col-md-12'}>
                        <DatePickerPlugin
                            selected={this.state.date || moment()}
                            onChange={this.onDateChange}
                        />
                    </div>

                    {time && <div className="col-md-6">
                      <TimePicker
                          allowEmpty={false}
                          defaultValue={this.state.date || moment()}
                          showSecond={false}
                          onChange={this.onTimeChange}
                      />
                    </div>}
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

export default Datepicker;
