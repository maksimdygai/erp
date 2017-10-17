import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {show} from 'react-notification-system-redux';
import validator from 'validator';
import empty from 'generic/helpers/isempty';
import selectedKey from 'generic/helpers/selected-key';

class Form extends React.Component {
	constructor() {
		super();

		this.state = {
			data   : {},
			errors : {},
			isSent : false,
			isValid: false
		}
	}

	static childContextTypes = {
		errors           : PropTypes.object,
		forceError       : PropTypes.func,
		isSent           : PropTypes.bool,
		onChange         : PropTypes.func,
		passValueToParent: PropTypes.func
	}

	getChildContext() {
		return {
			errors           : (this.state || {}).errors,
			forceError       : this.handleInputError,
			isSent           : (this.state || {}).isSent,
			onChange         : this.handleInput,
			passValueToParent: this.handlePassedValue
		};
	}

	componentWillMount() {
		const
			data = this.props.data

		if(data)
			this.setState({data: data});

		if(this.props.new) {
			this.validate({});
		} else {
			data && this.validate(data);
		}
	}

	componentWillReceiveProps(nextProps) {
		let
			data           = this.state.data,
			schema         = this.props.schema,
			newData        = nextProps.data,
			newSchema      = nextProps.schema,
			passedData     = this.props.data,
			validationData = {};

		if(!_.isEqual(newData, passedData)) {
			this.setState({data: Object.assign(data, newData)});
		}

		if(!_.isEqual(newSchema, schema)) {
			_.each(newData, (V, K) => {
				if(!data[K])
					data[K] = V;

				/*transform int fields of data passed to form to Str for validator */
				validationData[K] = (typeof(V) == 'number' || V == null) ? _.toString(V) : V;
			});

			this.validate(validationData, newSchema);
		}

		if(this.state.isSent)
			this.setState({isSent: false});
	}

	componentWillUpdate(nextProps) {
		let
			data           = this.state.data,
			newData        = nextProps.data,
			validationData = {};

		if(!_.isEqual(this.props.data, newData)) {
			_.each(newData, (V, K) => {
				if(!data[K])
					data[K] = V;

				/*transform int fields of data passed to form to Str for validator */
				validationData[K] = (typeof(V) == 'number' || V == null) ? _.toString(V) : V;
			});

			this.validate(validationData);
		}

		if(!empty(this.state.errors))
			this.props.dispatch(show({
				title      : 'Форма',
				message    : 'Некоторые обязательные поля заполнены неправильно',
				position   : 'tr',
				autoDismiss: 20
			}, 'error'));

		if(this.state.isSent)
			this.setState({isSent: false});
	}

	handleCancel = e => {
		e.preventDefault();
		browserHistory.push(`/${this.props.entity}`);
	}

	handleInput = (e, validations, pattern) => {
		const
			data = this.state.data,
			target = e.target,
			name = target.name,
			value = (target.type === 'checkbox') ? target.checked : target.value;

		if(!validations) {
			validations = this.props.schema[name];
		}

		this.validateInput(name, value, validations, pattern);
		data[name] = value;
		this.setState({data: data});
	}

	handleInputError = (name, validateMethod, state) => {
		let
			errors = this.state.errors;

		errors = state ?
			Object.assign(errors, {[name]: validateMethod})
			: _.pickBy(errors, (V, K) => K !== name)

		this.setState({errors: errors});
	}

	handleSubmit = e => {
		e.preventDefault();

		if(_.includes(e.target.className.split(' '), 'disabled'))
			return;

		if(this.props.new) {
			this.props.post(this.state.data);
		} else {
			console.log(this.state);
			this.props.put(this.state.data);
		}

		this.setState({
			isSent : true,
			isValid: false
		})
	}

	handlePassedValue = (name, value, error, validation, rawdata) => {
		let
			{data, errors} = this.state;

		if(error) {
			errors[name] = validation;

			this.setState({
				errors : errors,
				isValid: false
			})

			return;
		} else if(!value && this.props.schema[name] == 'isRequired') {
			Object.assign(errors, {[name]: 'isRequired'});

			this.setState({
				errors : errors,
				isValid: false
			});

			return;
		}

		{/* handle single/multiple relations */}
		if((_.isArray(value) && rawdata) || !_.isArray(value)) {
			data[name] = value;
		} else {
			data[name] = selectedKey(value, 'id');
		}

		errors = _.pickBy(errors, (V, K) => K !== name);

		this.setState({
			data   : data,
			errors : errors,
			isValid: _.isEmpty(errors)
		});
	}

	validate(data, schema) {
		if (!schema)
			schema = this.props.schema;

		_.map(schema, (V, K) => {
			this.validateInput(K, data[K], V);
		});

		this.setState({errors: _.pickBy(this.state.errors, (V, K) => schema[K])});
		return _.isEmpty(this.state.errors);
	}

	validateInput(name, value, validations, pattern) {
		let
			errors = this.state.errors;

		if(_.isUndefined(value))
			return;

		if(!validations) {
			errors = _.pickBy(errors, (V, K) => K !== name);

			this.setState({
				errors : errors,
				isValid: _.isEmpty(errors)
			});

			return;
		}

		validations.split(',').forEach(validation => {
			let
				args = validation.split(':'),
				validateMethod = args.shift();

			if(validateMethod === 'isRequired') {
				errors = empty(value) ?
					Object.assign(errors, {[name]: validateMethod})
					: _.pickBy(errors, (V, K) => K !== name)
			} else {
				args = args.map(arg => JSON.parse(arg));
				args = [value].concat(args.length ? args : [pattern]);

				errors = validator[validateMethod].apply(validator, args) ?
				_.pickBy(errors, (V, K) => K !== name)
				: Object.assign(errors, {[name]: validateMethod})
			}
		});

		this.setState({
			errors : errors,
			isValid: _.isEmpty(errors)
		});
	}

	render() {
		const
			{cancel, isCompact, isQuick} = this.props,
			onCancel = cancel || this.handleCancel;

		return (
			<form id="form-validation" className="form-horizontal form-bordered">
				{this.props.children}

				<div className={`${isCompact ? '' : 'form-group'} form-actions`}>
					<div className="col-md-12">
						<div className="btn-toolbar pull-right">
							{!this.props.isQuick && (<button
								className="btn btn-sm btn-default"
								onClick={e => onCancel(e)}
							>
								Отменить
							</button>)}

							<button
								className={
									`btn btn-sm btn-success ${_.get(this.state, 'isValid') ? '' : 'disabled'}`
								}

								onClick={e => this.handleSubmit(e)}
								type="submit"
							>
								Сохранить
							</button>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

export default connect()(Form);
