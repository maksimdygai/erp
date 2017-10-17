import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Timeline from 'routes/main/components/Timeline';
import Form from 'generic/components/Form';
import Datepicker from 'generic/components/Form/Datepicker';
import ContactField from 'generic/components/Form/ContactField';
import Textarea from 'generic/components/Form/Textarea';
import Select from 'generic/components/Form/Select';
import fetch from 'modules/clients/actions/view.js';
import fetchDeals from 'modules/deals/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import getName from 'generic/helpers/get-name';
import findCheck from 'generic/helpers/find-check';
import orNone from 'generic/helpers/or-none';
import dictionaries from 'generic/dictionaries';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

class Client extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentWillMount() {
        this.props.fetch(this.props.params.id);
        this.props.fetchDeals();
        this.props.fetchUsers();
        this.props.setMainPageData({activePage: "client"});
    }

    render() {
        const
            {clients, users} = this.props,
            data = _.find(clients, C => C.id == this.props.params.id),
            {deals, email, id, manager, mobile_phone, work_phone, notes} = data || {};

        return (
            <div className="row">
                <div className="col-md-5 col-lg-5">
                    <div className="block">
                        <div className="block-title">
                            <h2>Информация</h2>

                            <div className="block-options pull-right">
                                <Link to={`/clients/${id}/edit`} className="btn btn-default btn-alt btn-sm" title="Редактировать">
                                    <i className="fa fa-pencil"></i>
                                </Link>
                            </div>
                        </div>

                        <table className="table table-borderless table-striped">
                            <tbody>
                                <tr>
                                    <td style={{width: '40%'}}><strong>ФИО</strong></td>
                                    <td>{getName(data)}</td>
                                </tr>

                                <tr>
                                    <td style={{width: '40%'}}><strong>Email</strong></td>
                                    <td>{email}</td>
                                </tr>

                                <tr>
                                    <td style={{width: '40%'}}><strong>Мобильный</strong></td>
                                    <td>{mobile_phone}</td>
                                </tr>

                                <tr>
                                    <td style={{width: '40%'}}><strong>Рабочий телефон</strong></td>
                                    <td>{orNone(work_phone)}</td>
                                </tr>

                                <tr>
                                    <td style={{width: '40%'}}><strong>Менеджер</strong></td>
                                    <td>{getName(_.find(users, {'id': (manager || {}).id}))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="block">
                        <div className="block-title">
                            <h2>Сделки</h2>
                        </div>

                            {
                                (deals || []).length && this.props.deals ?
                                    (<div className="row">
                                        {matchArrEqualObjProps(deals, this.props.deals).map(D => (
                                            <div key={D.id} className="col-lg-12">
                                                <div className="block">
                                                    <div className="block-title">
                                                        <h2>
                                                            <Link
                                                                to={`/deals/${D.id}`}
                                                                className="text-danger"
                                                            >
                                                                {D.name}
                                                            </Link>
                                                        </h2>

                                                        <div className="block-options pull-right">
                                                            <Link
                                                                to={`/deals/${D.id}`}
                                                                className="btn btn-default btn-alt btn-sm"
                                                            >
                                                                <i className="fa fa-search"></i>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <table className="table table-borderless table-striped">
                                                        <tbody>
                                                            <tr>
                                                                <td style={{width: '40%'}}><strong>Менеджер</strong></td>
                                                                <td>{getName(_.find(this.props.users, {'id': D.manager.id}))}</td>
                                                            </tr>

                                                            <tr>
                                                                <td style={{width: '40%'}}><strong>Статус</strong></td>
                                                                <td>{_.find(dictionaries.deal_statuses, {'id': D.status}).value}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                    </div>)

                                    : (<p>Сделки еще не добавлены</p>)
                            }
                    </div>
                </div>

                <div className="col-md-7 col-lg-7">
                    <Timeline entity={{name: 'client', params: {id: id}}} isEditable={true} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        clients: state.clients.view,
        deals  : state.deals.data,
        users  : state.users.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch          : bindActionCreators(fetch, dispatch),
        fetchDeals     : bindActionCreators(fetchDeals, dispatch),
        fetchUsers     : bindActionCreators(fetchUsers, dispatch),
        setMainPageData: bindActionCreators(setMainPageData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);
