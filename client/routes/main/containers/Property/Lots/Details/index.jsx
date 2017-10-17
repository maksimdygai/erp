import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Select from 'generic/components/Form/Select';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import ClientBlock from 'routes/main/components/ClientBlock';
import viewLot from 'modules/property/lots/actions/view';
import fetchAddress from 'modules/property/address/address_by_id/actions/fetch.js';
import fetchClients from 'modules/clients/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import findOrNone from 'generic/helpers/find-or-none';
import getName from 'generic/helpers/get-name';
import orNone from 'generic/helpers/or-none';
import formatMoney from 'generic/helpers/format-money';
import yesOrNo from 'generic/helpers/yes-or-no';
import dictionaries from 'generic/dictionaries';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

class LotDetails extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.props.viewLot(this.props.params.id);
        this.props.fetchUsers();
        this.props.setMainPageData({activePage: "lot"});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.item &&
            (this.props.street == null ||
             this.props.street.suggestions[0].data.street_fias_id != nextProps.item.street_fias_id)) {
                this.props.fetchAddress(nextProps.item.street_fias_id);
        }
    }

    render() {
        const
            {users, item} = this.props,

            {
                agent,
                block,
                city_fias_id,
                comment,
                communic_canalisation,
                communic_electricity,
                communic_gas,
                communic_phone,
                communic_water,
                completed_at,
                contacts,
                contracts_cooperation,
                contracts_exclusive,
                contracts_view,
                created_at,
                distance_to_stations,
                district,
                elite,
                entrance_type,
                exclusive,
                exit_to_pond,
                facade_width,
                from_firm,
                ground_area,
                has_adjoining_territory,
                has_cafes,
                has_cinemas,
                has_educational,
                has_hospitals,
                house_fias_id,
                house_number,
                id,
                is_garden,
                land_location,
                land_position,
                lastСalled,
                latitude,
                ldland_agreemen_alloc_owner_interest,
                ldland_agreement_compensation,
                ldland_agreement_sharing_property,
                ldland_barter_contract,
                ldland_certificate_of_inheritance,
                ldland_contract_of_gift,
                ldland_contract_of_sale,
                ldland_court_dec_amicable_agr,
                ldland_decree_local_administration,
                ldland_protocols_auction,
                location,
                longitude,
                measurement_x,
                measurement_y,
                moderation_at,
                moderation_status,
                net_sale,
                open_sale,
                payment_for_canalization,
                payment_for_electricity,
                payment_for_gas,
                payment_for_water,
                price,
                relief,
                right_type_land,
                roadway_width,
                source,
                special_price,
                street_fias_id,
                surveying,
                terms,
                text_on_the_site,
                type,
                updated_at
            } = item || {},

            communications = [
                {id: 1, val: communic_water},
                {id: 2, val: communic_gas},
                {id: 3, val: communic_electricity},
                {id: 4, val: communic_phone},
                {id: 5, val: communic_canalisation}
            ];

        return (
            <div>
                <div className="content-header content-header-media">
                    <div className="header-section">
                        <h1>
                            {id}
                            <br></br>
                            <small>Участок</small>
                        </h1>
                    </div>

                    <img
                        alt="header image"
                        className="animation-pulseSlow"
                        src="../../../../../../assets/images/headers/header_apt.jpg"
                    ></img>
                </div>

                <div className="row">
                    <div className="col-md-6 col-lg-6">
                        <div className="block">
                            <div className="block-title">
                                <h2>Основная информация</h2>

                                <div className="block-options pull-right">
                                    <Link to={`/lots/${id}/edit`} className="btn btn-default btn-alt btn-sm" title="Редактировать">
                                        <i className="fa fa-pencil"></i>
                                    </Link>
                                </div>
                            </div>

                            <table className="table table-borderless table-striped">
                                <tbody>
                                    <tr>
                                        <td style={{width: '40%'}}><strong>Номер</strong></td>
                                        <td>{id}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Эксклюзив</strong></td>
                                        <td>{findOrNone(dictionaries.exclusive, exclusive)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Дата создания</strong></td>
                                        <td>{moment(created_at).format('DD.MM.YYYY, HH:MM')}</td>
                                    </tr>

                                    {updated_at && (<tr>
                                        <td style={{width: '40%'}}><strong>Дата редактирования</strong></td>
                                        <td>{moment(updated_at).format('DD.MM.YYYY, HH:MM')}</td>
                                    </tr>)}

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Улица</strong></td>
                                        <td>{orNone(this.props.street ? this.props.street.suggestions[0].value : '')}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Дом</strong></td>
                                        <td>{`д. ${house_number}`}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="block">
                            <div className="block-title">
                                <h2>Контакты</h2>
                            </div>

                            <div className="row">
              								{
              									contacts && contacts.length ?
                                _.map(contacts, C => (
                                  <ClientBlock key={C.id} clientId={C.id} />
                                ))

                                : (<p>Контакты еще не добавлены</p>)
              								}
              							</div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-6">
                        <div className="block">
                            <div className="block-title">
                                <h2>Подробности</h2>
                            </div>

                            <h4 className="sub-header">Участок</h4>

                            <table className="table table-borderless table-striped">
                                <tbody>
                                    <tr>
                                        <td style={{width: '40%'}}><strong>Описание</strong></td>
                                        <td>{orNone(comment)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Элитное жилье</strong></td>
                                        <td>{yesOrNo(elite)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Садоводческий участок</strong></td>
                                        <td>{yesOrNo(is_garden)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Въезд</strong></td>
                                        <td>{findOrNone(dictionaries.entrance_road_types, entrance_type)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Проведено</strong></td>

                                        <td>
                                            {orNone(
                                                matchArrEqualObjProps(
                                                    _.filter(communications, x => x.val > 2),
                                                    dictionaries.utilities,
                                                    true
                                                )
                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Возможно провести</strong></td>

                                        <td>
                                            {orNone(
                                                matchArrEqualObjProps(
                                                    _.filter(communications, x => x.val == 2),
                                                    dictionaries.utilities,
                                                    true
                                                )
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <h4 className="sub-header">Площадь</h4>

                            <table className="table table-borderless table-striped">
                                <tbody>
                                    <tr>
                                        <td style={{width: '40%'}}><strong>Участок</strong></td>
                                        <td>{`${orNone(measurement_y)}/${orNone(measurement_x)}`}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Земельный участок</strong></td>
                                        <td>{orNone(ground_area)}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h4 className="sub-header">Цена</h4>

                            <table className="table table-borderless table-striped">
                                <tbody>
                                    <tr>
                                        <td style={{width: '40%'}}><strong>Цена</strong></td>
                                        <td>{price ? formatMoney(price) : orNone(price)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Спец. цена</strong></td>
                                        <td>{special_price ? formatMoney(special_price) : orNone(special_price)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Условия</strong></td>
                                        <td>{orNone(terms)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users  : state.users.data,
        street : state.property.address.addressById.data,
        item   : state.property.lots.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers     : bindActionCreators(fetchUsers, dispatch),
        fetchAddress   : bindActionCreators(fetchAddress, dispatch),
        setMainPageData: bindActionCreators(setMainPageData, dispatch),
        viewLot        : bindActionCreators(viewLot, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LotDetails);
