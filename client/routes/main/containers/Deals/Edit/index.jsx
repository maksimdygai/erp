import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import ContactField from 'generic/components/Form/ContactField';
import Select from 'generic/components/Form/Select';
import AddressFieldset from 'generic/components/Form/Fieldset/AddressFieldset';
import fetch from 'modules/deals/actions/view.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import postDeal from 'modules/deals/actions/post.js';
import putDeal from 'modules/deals/actions/put.js';
import getName from 'generic/helpers/get-name';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';
import findCheck from 'generic/helpers/find-check';
import dictionaries from 'generic/dictionaries';
import fetchCity from 'modules/property/address/city/actions/fetch';

class DealEdit extends React.Component {
	constructor() {
		super();
		this.state = {data: {}};
	}

	componentWillMount() {
		if(this.props.params.id !== 'new')
			this.props.fetch(this.props.params.id);

		this.props.fetchUsers();
	}

	render() {
		const
			{allUsers, params, post, put} = this.props,
			data = Object.assign({}, this.props.data),

			{
				name,
				manager,
				status
			} = params.id === 'new' ? {} : data;

		return (
			<div>
				<div className="content-header">
					<div className="header-section">
						<h1>
							<i className="gi gi-table"></i>
							{params.id === 'new' ? 'Новая сделка' : `${name}`}
							<br></br>
							<small>Редактирование</small>
						</h1>
					</div>
				</div>

				<div className="block">
					<Form
						data={data}
						entity='deals'
						new={params.id === 'new' ? true : false}
						post={post}
						put={put}
						schema={{name: 'isLength:1'}}
					>
						<fieldset>
							<legend>Сделка</legend>

							<div className="col-md-3">
								<Input
									defaultValue={name ? name : ''}
									name='name'
									required={true}
									title="Название"
									validations='isLength:1'
								/>
							</div>

							<div className="col-md-3">
								<ContactField
									entity='deals'
									name='manager'
									required={true}
									title="Менеджер"
									value={getName(findCheck(allUsers, manager))}
								/>
							</div>

							<div className="col-md-3">
								<Select
									name='status'
									options={dictionaries.deal_statuses}
									passInt={true}
									placeholder='Выберите Статус сделки'
									title='Статус'
									value={status}
								/>
							</div>
						</fieldset>
					</Form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		allUsers: state.users.data,
		data    : state.deals.view
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetch     : bindActionCreators(fetch, dispatch),
		fetchCity : bindActionCreators(fetchCity, dispatch),
		fetchUsers: bindActionCreators(fetchUsers, dispatch),
		post      : bindActionCreators(postDeal, dispatch),
		put       : bindActionCreators(putDeal, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DealEdit);
