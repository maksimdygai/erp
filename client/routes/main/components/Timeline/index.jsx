import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Textarea from 'generic/components/Form/Textarea';
import Datepicker from 'generic/components/Form/Datepicker';
import Multicontact from 'generic/components/Form/Multicontact';
import ContactField from 'generic/components/Form/ContactField';
import Select from 'generic/components/Form/Select';
import fetchUsers from 'modules/users/actions/fetch.js';
import fetchTasks from 'modules/notes/tasks/actions/fetch.js';
import fetchUserNotes from 'modules/notes/user_notes/actions/fetch.js';
import fetchSystemNotes from 'modules/notes/system_notes/actions/fetch.js';
import postTask from 'modules/notes/tasks/actions/post.js';
import putTask from 'modules/notes/tasks/actions/put.js';
import postUserNote from 'modules/notes/user_notes/actions/post.js';
import putUserNote from 'modules/notes/user_notes/actions/put.js';
import findCheck from 'generic/helpers/find-check';
import getName from 'generic/helpers/get-name';
import dictionaries from 'generic/dictionaries';

class Timeline extends React.Component {
	constructor() {
		super();

		this.state = {
			noteType          : null,
			currentlyEditingId: null,
			taskToComplete    : null
		}
	}

	componentWillMount() {
		this.props.fetchUsers();
		this.props.fetchTasks();
		this.props.fetchUserNotes();
		this.props.fetchSystemNotes();
	}

	getEditingForm(data) {
		let
			noteFormSchema = {text: 'isRequired'};

		if (data.type > 300) {
			Object.assign(noteFormSchema, {dead_line: 'isRequired', to_user: 'isRequired'});
		}

		return (
			<div style={{zIndex: '1000', position: 'relative', background: '#fff'}}>
				<Form
					data={data}
					isQuick={false}
					cancel={this.cancelEdit}
					new={false}
					put={this.putNote}
					schema={noteFormSchema}
				 >
					<div className="row">
						<div className="block-noborder">
							<div className="container-fluid">
								{data.type > 300 && <div className="row">
									<div className="col-md-6">
										<Datepicker
											name='dead_line'
											defaultDate={moment(data.dead_line)}
											title='Дедлайн'
											required={true}
											time={true}
										/>
									</div>

									<div className="col-md-6">
										<ContactField
										  name='to_user'
										  value={getName(findCheck(this.props.users, data.to_user))}
										  title="Ответственный"
										  data={this.props.users}
										  required={true}
										/>
									</div>
								</div>}

								<div className="row">
									<div className="col-md-12">
										<Textarea
											name='text'
											defaultValue={data.text}
											required={true}
											rows={5}
											title="Описание"
											required={true}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Form>
			</div>
		)
	}

 	addNote = e => {
		e.preventDefault(e);
		this.setState({currentlyEditingId: 'new'});
	}

	editNote = (e, id, type) => {
		e.preventDefault();
		this.setState({currentlyEditingId: `${type}${id}`});
	}

 	completeTask = (e, id, type) => {
		e.preventDefault();
		
		this.setState({
			currentlyEditingId: `${type}${id}`,
			taskToComplete    : id
		});
	}

	cancelEdit = e => {
		e.preventDefault();
		this.setState({
			noteType          : null,
			currentlyEditingId: null,
			taskToComplete    : null
		});
	}

	passState = value => {
		this.setState({noteType: value.value});
	}

	postNote = data => {
		if (data.type >= 201 && data.type <= 300) {
			this.props.postUserNote(data);
			this.props.fetchUserNotes();
		}

		else if (data.type >= 301 && data.type <= 400) {
			this.props.postTask(data);
			this.props.fetchTasks();
		}

		this.setState({
			noteType          : null,
			currentlyEditingId: null
		});
	}

	putNote = data => {
		if (data.type >= 201 && data.type <= 300) {
			this.props.putUserNote(data);
		}

		else if (data.type >= 301 && data.type <= 400) {
			this.props.putTask(data);
		}

		this.setState({
			noteType          : null,
			currentlyEditingId: null
		});
	}

	putComplete = data => {
		data.done_at = moment().format('YYYY-MM-DDTHH:mm:ssZZ');
		this.props.putTask(data);

		this.setState({
			noteType          : null,
			currentlyEditingId: null,
			taskToComplete    : null
		});
	}

	parseFields = fields => {
		if (fields[0] != '{' || fields[fields.length - 1] != '}')
			return fields;

		let
			parsed = {},
			blank = fields.slice(1, fields.length - 1);

		blank = blank.split(',');

		_.map(blank, F => {
			const
				keyValue = F.split(':');

			_.set(parsed, _.trim(keyValue[0]), this.parseFields(_.trim(keyValue[1])));
		});

		return parsed;
	}

	filterNotes(entity) {
		if (!entity)
			return [];

		const
			{name, params} = entity,
			{tasks, userNotes, systemNotes} = this.props;

		let
			filteredTasks = [],
			filteredUNotes = [],
			filteredSNotes = [];

		if (name == 'user') {
			const
				{userDeals, userClients} = params;

			filteredTasks = _.filter(tasks, T =>
				T.deal && _.find(userDeals, D => D.id == T.deal.id) ||
				T.client && _.find(userClients, C => C.id == T.client.id)
			);
			filteredUNotes = _.filter(userNotes, U =>
				U.deal && _.find(userDeals, D => D.id == U.deal.id) ||
				U.client && _.find(userClients, C => C.id == U.client.id)
			);
			filteredSNotes = _.filter(systemNotes, S =>
				S.deal && _.find(userDeals, D => D.id == S.deal.id) ||
				S.client && _.find(userClients, C => C.id == S.client.id)
			);
		}

		else {
			const
				{id} = params;

			filteredTasks = _.filter(tasks, T => T[name] && T[name].id == id);
			filteredUNotes = _.filter(userNotes, U => U[name] && U[name].id == id);
			filteredSNotes = _.filter(systemNotes, S => S[name] && S[name].id == id);
		}

		return _.concat(filteredTasks, filteredUNotes, filteredSNotes);
	}

	renderNote(N) {
		if (N.type >= 1 && N.type <= 100) {
			const
				fields = this.parseFields(N.fields);

			if (N.type >= 1 && N.type <= 3) {
				return <div className="timeline-content">
					<p className="push-bit">
						<strong>
							{_.find(dictionaries.note_types, {'id': N.type}).value}
						</strong>
					</p>

					<p>{`От: ${fields.from_phone}`}</p>
					<p className="push-bit">{`Кому: ${fields.to_phone}`}</p>
					<p>{N.done_text || N.text}</p>
				</div>;
			}

			else if (N.type >= 4 && N.type <= 6) {
				return <div className="timeline-content">
					<p className="push-bit">
						<strong>
							{_.find(dictionaries.note_types, {'id': N.type}).value}
						</strong>
					</p>

					<p>{`Отправитель: ${fields.from_email}`}</p>
					<p className="push-bit">{`Получатель: ${to_email}`}</p>
					<p>{N.done_text || N.text}</p>
				</div>;
			}
		}

		else if (N.type >= 201 && N.type <= 300) {
			return <div className="timeline-content">
				<p className="push-bit">
					<strong>
						{_.find(dictionaries.note_types, {'id': N.type}).value}
					</strong>

					<span>{` — ${moment(N.created_at).format('DD.MM.YYYY HH:mm')}`}</span>
				</p>

				<p>{`Добавил: ${getName(findCheck(this.props.users, N.creator))}`}</p>
				<p className="push-bit">{`Изменено: ${moment(N.created_at).format('DD.MM.YYYY HH:mm')}`}</p>
				<p>{N.done_text || N.text}</p>
			</div>;
		}

		else if (N.type >= 301 && N.type <= 400) {
			return <div className="timeline-content">
				<p className="push-bit">
					<strong>
						{_.find(dictionaries.note_types, {'id': N.type}).value}
					</strong>

					<span>{
						N.done_at ?
							` — выполнено: ${moment(N.done_at).format('DD.MM.YYYY HH:mm')}` :
							` — до ${moment(N.dead_line).format('DD.MM.YYYY HH:mm')}`
					}</span>
				</p>

				<p>{`Поручитель: ${getName(findCheck(this.props.users, N.creator))}`}</p>
				<p className="push-bit">{`Ответственный: ${getName(findCheck(this.props.users, N.to_user))}`}</p>
				<p>{N.done_text || N.text}</p>
			</div>;
		}
	}

	render() {
		const
			{isEditable, isCompact, entity, users} = this.props,
			{noteType, currentlyEditingId, taskToComplete} = this.state,
			notes = this.filterNotes(entity);

		let
			noteFormSchema = {
				type: 	   'isRequired',
				text:  	   'isRequired'
			};

		if (noteType > 300) {
			Object.assign(noteFormSchema, {dead_line: 'isRequired', to_user: 'isRequired'});
		}

		return (
			<div className="block">
				<div className="block-title">
					<h2>Лента событий</h2>

					{isEditable &&
					currentlyEditingId != 'new' &&

					<div className="block-options pull-right">
						<button
							className="btn btn-sm btn-success"
							onClick={e => this.addNote(e)}
						>
							Добавить
						</button>
					</div>}
				</div>

				{currentlyEditingId == 'new' &&
					(entity) && <Form
					data={{[entity.name]: {id: entity.params.id}}}
					isQuick={false}
					cancel={this.cancelEdit}
					new={true}
					post={this.postNote}
					schema={noteFormSchema}
				>
					<div className="row">
						<div className="block-noborder">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-6">
										<Select
											name='type'
											options={_.filter(dictionaries.note_types, x => x.id > 200)}
											passState={this.passState}
											passInt={true}
											placeholder='Выберите тип примечания'
											title='Тип'
											required={true}
										/>
									</div>
								</div>

								{noteType > 300 && <div className="row">
									<div className="col-md-6">
										<Datepicker
											name='dead_line'
											title='Дедлайн'
											required={true}
											time={true}
										/>
									</div>

									<div className="col-md-6">
										<ContactField
										  name='to_user'
										  title="Ответственный"
										  value=''
										  data={users}
										  required={true}
										/>
									</div>
								</div>}

								{noteType && <div className="row">
									<div className="col-md-12">
										<Textarea
											name='text'
											required={true}
											rows={5}
											title="Описание"
											required={true}
										/>
									</div>
								</div>}
							</div>
						</div>
					</div>
				</Form>}

				{
					notes.length ?
						(<div
							className="timeline"
							style={isCompact && {
								position: 'relative',
								overflow: 'hidden',
								width: 'auto',
								maxHeight: '550px',
								overflowY: 'scroll'
							}}
						>
							<ul className="timeline-list">
								{
									_.sortBy(notes, N => N.created_at)
										.reverse()
										.map(N => {

											if (currentlyEditingId == `${N.type}${N.id}`){
												if (taskToComplete == N.id) {
													return (
														<div style={{zIndex: '1000', position: 'relative', background: '#fff'}}>
															<Form
																data={N}
																isQuick={false}
																cancel={this.cancelEdit}
																new={false}
																put={this.putComplete}
																schema={{done_text: 'isRequired'}}
															>
																<div className="block-noborder">
																	<Textarea
																		name='done_text'
																		required={true}
																		rows={5}
																		title="Комментарий"
																		required={true}
																	/>
																</div>
															</Form>
														</div>
													)
												}

												else {return this.getEditingForm(N)}
											}

											let
												noteData = [],
												counter = 1;

											const
												noteColor = _.find(dictionaries.note_types, {'id': N.type}).color,
												path = N.deal ? `deals/${N.deal.id}` : `clients/${N.client.id}`;

											return (
												<li key={`${N.type}${N.id}`} className="active">
													{isEditable ?
														<div>
															{N.type > 100 && !N.done_at && <div className="block-options pull-right">
																{N.type >= 301 && N.type <= 400 &&
																<a
																	className="btn btn-success btn-alt btn-sm note-edit-btn"
																	href='#'
																	onClick={e => this.completeTask(e, N.id, N.type)}
																	title="Завершить"
																>
																	<i className="fa fa-check"></i>
																</a>}

																<a
																	className="btn btn-default btn-alt btn-sm note-edit-btn"
																	href="#"
																	onClick={e => this.editNote(e, N.id, N.type)}
																	title="Редактировать"
																>
																	<i className="fa fa-pencil"></i>
																</a>
															</div>}
														</div> :

														(<div className="block-options pull-right">
															<Link
																to={path}
																className="btn btn-default btn-alt btn-sm"
															>
																<i className="gi gi-chevron-right"></i>
															</Link>
														</div>)
													}

													<div
														className="timeline-icon"
														style={{backgroundColor: noteColor, borderColor: noteColor}}
													>
														<i
															className={N.done_at ?
																'fa fa-check' :
																`fa fa-${_.find(dictionaries.note_types, {'id': N.type}).icon}`
															}
														></i>
													</div>

													<div className="timeline-time">
														<small>{moment(N.created_at).fromNow()}</small>
													</div>

													{this.renderNote(N)}
												</li>
											);
										})
								}
							</ul>
						</div>)

					: (<p>События еще не добавлены</p>)
				}
			</div>
		)
	}
}

export default connect(
	state => ({
		users      : state.users.data,
		systemNotes: state.notes.system_notes.data,
		userNotes  : state.notes.userNotes.data,
		tasks      : state.notes.tasks.data
	}),

	dispatch => ({
		fetchUsers      : bindActionCreators(fetchUsers, dispatch),
		fetchTasks      : bindActionCreators(fetchTasks, dispatch),
		fetchSystemNotes: bindActionCreators(fetchSystemNotes, dispatch),
		fetchUserNotes  : bindActionCreators(fetchUserNotes, dispatch),
		postTask        : bindActionCreators(postTask, dispatch),
		putTask         : bindActionCreators(putTask, dispatch),
		postUserNote    : bindActionCreators(postUserNote, dispatch),
		putUserNote     : bindActionCreators(putUserNote, dispatch)
	})
)(Timeline);
