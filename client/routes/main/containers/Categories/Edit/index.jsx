import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Autocomplete from 'generic/components/Form/Autocomplete';
import viewCategory from 'modules/categories/actions/view';
import fetchPositions from 'modules/positions/actions/fetch.js';
import post from 'modules/categories/actions/post.js';
import put from 'modules/categories/actions/put.js';
import orNone from 'generic/helpers/or-none';

class CategoryEdit extends React.Component {
	componentWillMount() {
		const
			id = this.props.params.id;

		this.props.fetchPositions();

		if(id != 'new')
			this.props.viewCategory(id);

		this.setState({entity: 'categories'});
	}

	render() {
		const
			{allPositions, item, params, post, put} = this.props,
			{entity} = this.state,
			{name, plan, percent, position = {}} = params.id === 'new' ? {} : (item || {});

		return (
			<div>
				<div className="content-header">
					<div className="header-section">
						<h1>
							<i className="gi gi-table"></i>
							{params.id === 'new' ? 'Новая категория' : `${name}`}
							<br></br>
							<small>Редактирование</small>
						</h1>
					</div>
				</div>

				<div className="block">
					<Form
						data={item}
						entity={entity}
						new={params.id === 'new' ? true : false}
						post={post}
						put={put}
					>
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-2">
									<Input
										defaultValue={name}
										name='name'
										required={true}
										title="Название"
										type='text'
										validations='isLength:1'
									/>
								</div>

								<div className="col-md-2">
									<Autocomplete
										data={allPositions}
										comparatorValue='name'
										key='category-position-atc'
										name='position'
										title="Должность"
										value={orNone((_.find(allPositions, {'id': position.id}) || {}).name)}
									/>
								</div>

								<div className="col-md-2">
									<Input
										defaultValue={plan}
										name='plan'
										placeholder='Введите число'
										required={true}
										title="План"
										type='text'
										validations='isInt'
									/>
								</div>

								<div className="col-md-2">
									<Input
										defaultValue={percent}
										name='percent'
										placeholder='Введите число в формате 1.23'
										required={true}
										title="Процент"
										type='text'
										validations='isDecimal'
									/>
								</div>
							</div>
						</div>
					</Form>
				</div>                    
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		allPositions: state.positions.data,
		item        : state.categories.view
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPositions: bindActionCreators(fetchPositions, dispatch),
		post          : bindActionCreators(post, dispatch),
		put           : bindActionCreators(put, dispatch),
		viewCategory  : bindActionCreators(viewCategory, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);
