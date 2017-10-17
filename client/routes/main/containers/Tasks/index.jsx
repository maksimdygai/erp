import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import fetchTasks from 'modules/notes/tasks/actions/fetch.js';
import dictionaries from 'generic/dictionaries';

class Tasks extends React.Component {
    constructor() {
        super();

        this.state = {
            filter: [301, 302, 303]
        };
    }
    componentWillMount() {
        this.props.fetchTasks();
    }

    getTaskList(list) {
        return _.map(list, T => {
            const
                path = T.deal ? `deals/${T.deal.id}` : `clients/${T.clients.id}`;

            return (
                <Link to={path} className="list-group-item">
                    <h4 className="list-group-item-heading">{_.find(dictionaries.note_types, TT => T.type == TT.id).name}</h4>
                    <p className="list-group-item-text">{T.text}</p>
                </Link>
            )
        });
    }

    setFilter(type) {
        let
          newFilter = this.state.filter;

        if (_.find(this.state.filter, T => T == type)) {
            _.remove(newFilter, T => T == type);
        }
        else {
            newFilter.push(type);
        }

        this.setState({filter: newFilter});
    }

    render() {
        const
            {tasks, userId} = this.props;

        let
            userTasks = _.filter(tasks, T => T.to_user.id == userId && _.find(this.state.filter, TT => TT == T.type)),
            overdue = _.filter(userTasks, T => moment(T.dead_line).format("YYYYMMDD") < moment().format("YYYYMMDD")),
            today = _.filter(userTasks, T => moment(T.dead_line).format("YYYYMMDD") == moment().format("YYYYMMDD")),
            income = _.filter(userTasks, T => moment(T.dead_line).format("YYYYMMDD") > moment().format("YYYYMMDD"));


        return (
            <div>
                <div className="content-header">
                    <div className="header-section">
                        <div className="row">
                            <div className="col-md-4 col-lg-6 hidden-xs hidden-sm">
                              <h1>
                                Задачи
                              </h1>
                            </div>

                            <div className="col-md-8 col-lg-6">
                                <div className="row text-center">
                                    <div className="col-md-6 hidden-xs">
                                    </div>

                                    <div className="col-md-2 col-xs-4">
                                      <label className="switch switch-task-t1">
                                        <input
                                          type="checkbox"
                                          onClick={e => this.setFilter(301)}
                                          checked={_.find(this.state.filter, T => T == 301)}
                                        />

                                        <span></span>
                                      </label>

                                      <span className="help-block">Звонки</span>
                                    </div>

                                    <div className="col-md-2 col-xs-4">
                                      <label className="switch switch-task-t2">
                                        <input
                                          type="checkbox"
                                          onClick={e => this.setFilter(302)}
                                          checked={_.find(this.state.filter, T => T == 302)}
                                        />

                                        <span></span>
                                      </label>

                                      <span className="help-block">Встречи</span>
                                    </div>

                                    <div className="col-md-2 col-xs-4">
                                      <label className="switch switch-task-t3">
                                        <input
                                          type="checkbox"
                                          onClick={e => this.setFilter(303)}
                                          checked={_.find(this.state.filter, T => T == 303)}
                                        />

                                        <span></span>
                                      </label>

                                      <span className="help-block">Прозвоны</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="block">
                            <div className="block-title">
                                <h2>Просроченные задачи</h2>
                            </div>

                            <div className="list-group">
                                {this.getTaskList(overdue)}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="block">
                            <div className="block-title">
                                <h2>Задачи на сегодня</h2>
                            </div>

                            <div className="list-group">
                                {this.getTaskList(today)}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="block">
                            <div className="block-title">
                                <h2>Следующие задачи</h2>
                            </div>

                            <div className="list-group">
                                {this.getTaskList(income)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.user_info.data && state.user_info.data.id,
        tasks : state.notes.tasks.data
    };
}

function mapDispatchToProps (dispatch) {
    return {
        fetchTasks: bindActionCreators(fetchTasks, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
