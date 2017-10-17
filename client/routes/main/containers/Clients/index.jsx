import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import fetchClients from 'modules/clients/actions/fetch.js';
import fetchSystemNotes from 'modules/notes/system_notes/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import ClientsTable from '../../components/ClientsTable'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import remove from 'modules/clients/actions/remove.js';
import getName from 'generic/helpers/get-name';
import parseUrl from 'generic/helpers/parse-url';

class CallFilter extends React.Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.isFiltered = this.isFiltered.bind(this);
  }

  componentDidMount() {
    this.filter(null);
  }

  filter(event) {
    this.props.filterHandler({ callback: this.isFiltered });
  }

  isFiltered(targetValue) {
    const
      filterValue = this.refs.filterSelect.value;

    return filterValue == 'true' ? true : targetValue[filterValue] > 0;
  }

  render() {
    const
      {defaultValue} = this.props;

    return (
      <div>
        <select
          ref='filterSelect'
          className={`filter select-filter form-control ${defaultValue ? '' : 'placeholder-selected'}`}
          onChange={ this.filter }
          defaultValue={defaultValue}
        >
          <option value>Тип звонков</option>
          <option value="in">Входящие</option>
          <option value="out">Исходящие</option>
          <option value="missed">Пропущенные</option>
        </select>
      </div>
    );
  }
}

CallFilter.propTypes = {
  filterHandler: React.PropTypes.func.isRequired,
  defaultValue : React.PropTypes.string
}

function getCustomFilter(filterHandler, customFilterParameters) {
  console.log(customFilterParameters);
  return (
    <CallFilter filterHandler={ filterHandler } defaultValue={ customFilterParameters.defaultValue } />
  );
}

class Clients extends React.Component {
    constructor () {
      super();

      this.state = {defaultFilter: parseUrl(location.href)};
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.props.fetch();
        this.props.fetchSystemNotes();

        this.props.setMainPageData({
            activePage: "clients"
        });
    }

    handleRemove = (e, id) => {
        e.preventDefault();
        this.props.remove(id);
    }

    getCalls = id => {
        const
          clientSNotes = _.filter(this.props.systemNotes, S => S.client && S.client.id == id);

        return {
          in    : _.filter(clientSNotes, S => S.type == 1).length,
          out   : _.filter(clientSNotes, S => S.type == 2).length,
          missed: _.filter(clientSNotes, S => S.type == 3).length
        };
    }

    render() {
        const
          { systemNotes, clients } = this.props,
          { defaultFilter } = this.state;

        let
          data = _.map(clients, C => {
            C.calls = this.getCalls(C.id);
            return C;
          });

        return (
            <div>
                <div className="content-header">
                    <div className="header-section">
                        <h1>
                            <Link to='/clients/new/edit' className="btn btn-default pull-right">Добавить</Link>
                            Клиенты
                            <br></br>
                            <small>Таблица всех клиентов</small>
                        </h1>
                    </div>
                </div>

                <div className="block">
                  <BootstrapTable
                    data={data}
                    selectRow={{mode: 'checkbox'}}
                  >
                    <TableHeaderColumn
                      isKey={true}
                      dataField='id'
                      dataFormat={(cell, row) => (<Link to={`/clients/${cell}`} title="Подробности">{getName(row)}</Link>)}
                      thStyle={{width: '23%'}}
        							tdStyle={{width: '23%'}}
                    >
                      Имя
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      dataField='email'
                      thStyle={{width: '23%'}}
        							tdStyle={{width: '23%'}}
                    >
                      Email
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      dataField='mobile_phone'
                      thStyle={{width: '23%'}}
        							tdStyle={{width: '23%'}}
                    >
                      Мобильный телефон
                    </TableHeaderColumn>

                    <TableHeaderColumn
        							dataField='calls'
        							dataFormat={(cell, row) => `${cell.in}/${cell.out}/${cell.missed}`}
                      filter={{
                        type: 'CustomFilter',
                        getElement: getCustomFilter,
                        customFilterParameters: {defaultValue: defaultFilter.calls}
                      }}
                      thStyle={{width: '23%'}}
        							tdStyle={{width: '23%'}}
        						>
        							Звонки (В/И/П)
        						</TableHeaderColumn>

                    <TableHeaderColumn
                      dataField='id'
                      dataAlign='center'
                      dataFormat={(cell, row) => (
                        <div className="text-center">
        									<div className="btn-group btn-group-xs">
        										<Link to={`/clients/${cell}/edit`} className="btn btn-default" title="Редактировать">
        												<i className="fa fa-pencil"></i>
        										</Link>

        										<button className="btn btn-danger" onClick={e => this.handleRemove(e, cell)} title="Удалить">
        												<i className="fa fa-times"></i>
        										</button>
        									</div>
        								</div>
                      )}
                    >
                      Действия
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        clients    : state.clients.data,
        systemNotes: state.notes.system_notes.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch           : bindActionCreators(fetchClients, dispatch),
        fetchSystemNotes: bindActionCreators(fetchSystemNotes, dispatch),
        remove          : bindActionCreators(remove, dispatch),
        setMainPageData : bindActionCreators(setMainPageData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
