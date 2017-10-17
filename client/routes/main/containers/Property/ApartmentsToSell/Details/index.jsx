import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Select from 'generic/components/Form/Select';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import ClientBlock from 'routes/main/components/ClientBlock';
import viewApartmentToSell from 'modules/property/apartments_sell/actions/view';
import fetchAddress from 'modules/property/address/address_by_id/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import findOrNone from 'generic/helpers/find-or-none';
import getName from 'generic/helpers/get-name';
import orNone from 'generic/helpers/or-none';
import formatMoney from 'generic/helpers/format-money';
import yesOrNoOrNone from 'generic/helpers/yes-or-no-or-none';
import dictionaries from 'generic/dictionaries';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

class ApartmentToSellDetails extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.props.viewApartmentToSell(this.props.params.id);
        this.props.fetchUsers();
        this.props.setMainPageData({activePage: "client"});
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
                access_control,
                agent,
                apartment,
                appart_on_floor,
                backup_power_system,
                balcony,
                bathroom,
                block,
                building_year,
                ceiling_height,
                city_fias_id,
                comment,
                commodities,
                completed,
                completed_at,
                concierge,
                condition,
                contacts,
                contracts_cooperation,
                contracts_exclusive,
                contracts_view,
                created_at,
                distance_to_stations,
                district,
                elite,
                exclusive,
                floor,
                floor_type,
                floors,
                for_rent,
                from_firm,
                guardrail,
                has_cafes,
                has_cinemas,
                has_dedic_parking,
                has_educational,
                has_hospitals,
                heating,
                hot_water,
                house_fias_id,
                house_number,
                house_territory,
                housing_stock,
                id,
                kitchen_sq,
                lastСalled,
                latitude,
                ldapsale_agreemen_alloc_owner_interest,
                ldapsale_agreement_compensation,
                ldapsale_agreement_sharing_property,
                ldapsale_barter_contract,
                ldapsale_certificate_of_inheritance,
                ldapsale_certificate_of_payment,
                ldapsale_contract_of_gift,
                ldapsale_contract_of_sale,
                ldapsale_court_dec_amicable_agr,
                ldapsale_decree_local_administration,
                ldapsale_investment_contract,
                ldapsale_privatization_contract,
                ldapsale_rent_contract,
                ldapsale_share_contract,
                lift_parking_connect,
                living_sq,
                location,
                loggia,
                longitude,
                material,
                metal_plast_windows,
                moderation_at,
                moderation_status,
                mortgage,
                net_sale,
                open_sale,
                owners_num,
                parking_num,
                passenger_lift,
                placement,
                price,
                purchase_year,
                redevelopment,
                related,
                secure_parking,
                service_lift,
                source,
                special_price,
                street_fias_id,
                terms,
                text_on_the_site,
                total_sq,
                type,
                underage_owners_num,
                unfinished,
                updated_at,
                urgent_sell,
                video_surv_system,
                windows_to_street,
                windows_to_yard,
                wooden_windows,
                wooden_windows_eur
            } = item || {},

            lifts = [
                {id: 1, val: passenger_lift},
                {id: 2, val: service_lift}
            ],

            infrastructure = [
                {id: 1, val: has_cafes},
                {id: 2, val: has_cinemas},
                {id: 3, val: has_hospitals},
                {id: 4, val: has_educational}
            ],

            windows_direction = [
                {id: 1, val: windows_to_yard},
                {id: 2, val: windows_to_street}
            ],

            windows_material = [
                {id: 1, val: wooden_windows},
                {id: 2, val: metal_plast_windows},
                {id: 3, val: wooden_windows_eur}
            ];

        return (
            <div>
                <div className="content-header content-header-media">
                    <div className="header-section">
                        <h1>
                            {id}
                            <br></br>
                            <small>Квартира (продажа)</small>
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
                                    <Link to={`/apartments_sell/${id}/edit`} className="btn btn-default btn-alt btn-sm" title="Редактировать">
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
                                        <td>{`д. ${house_number}, ${block ? `корп. ${block},` : ''} кв. ${apartment}`}</td>
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

                            <h4 className="sub-header">Дом</h4>

                            <table className="table table-borderless table-striped">
                                <tbody>
                                    <tr>
                                        <td style={{width: '40%'}}><strong>Балкон</strong></td>
                                        <td>{findOrNone(dictionaries.balcony_types, balcony)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Сан. узел</strong></td>
                                        <td>{findOrNone(dictionaries.bathroom_types, bathroom)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Удобства</strong></td>
                                        <td>{findOrNone(dictionaries.commodities, commodities)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Дом сдан</strong></td>
                                        <td>{yesOrNoOrNone(completed)}</td>
                                    </tr>

                                    {completed && (<tr>
                                        <td style={{width: '40%'}}><strong>Дата сдачи дома</strong></td>
                                        <td>{moment(completed_at).format('DD.MM.YYYY')}</td>
                                    </tr>)}

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Состояние</strong></td>
                                        <td>{findOrNone(dictionaries.apt_condition_types, condition)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Описание</strong></td>
                                        <td>{orNone(comment)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Расстояние до остановки</strong></td>
                                        <td>{orNone(distance_to_stations)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Район</strong></td>
                                        <td>{findOrNone(dictionaries.districts, district)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Элитное жилье</strong></td>
                                        <td>{yesOrNoOrNone(elite)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Этаж</strong></td>
                                        <td>{`${floor} из ${floors}`}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Полы</strong></td>
                                        <td>{findOrNone(dictionaries.floor_types, floor_type)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Лифт</strong></td>
                                        <td>
                                            {orNone(
                                                matchArrEqualObjProps(
                                                    _.filter(lifts, x => x.val == 1),
                                                    dictionaries.lift_types,
                                                    true
                                                )
                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Отопление</strong></td>
                                        <td>{findOrNone(dictionaries.heating_types, heating)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Горячая вода</strong></td>
                                        <td>{findOrNone(dictionaries.hot_water, hot_water)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Фонд</strong></td>
                                        <td>{findOrNone(dictionaries.housing_stock, housing_stock)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Инфраструктура</strong></td>
                                        <td>
                                            {orNone(
                                                matchArrEqualObjProps(
                                                    _.filter(infrastructure, x => x.val == 1),
                                                    dictionaries.infrastructure,
                                                    true
                                                )
                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Лоджия</strong></td>
                                        <td>{findOrNone(dictionaries.loggia, loggia)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Материал стен дома</strong></td>
                                        <td>{findOrNone(dictionaries.building_wall_materials, material)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Расположение в доме</strong></td>
                                        <td>{findOrNone(dictionaries.placement, placement)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Тип</strong></td>
                                        <td>{findOrNone(dictionaries.apt_types, type)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Стройвариант</strong></td>
                                        <td>{yesOrNoOrNone(unfinished)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Выход окон</strong></td>
                                        <td>
                                            {orNone(
                                                matchArrEqualObjProps(
                                                    _.filter(windows_direction, x => x.val == 1),
                                                    dictionaries.windows_directions,
                                                    true
                                                )
                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Материал окон</strong></td>
                                        <td>
                                            {orNone(
                                                matchArrEqualObjProps(
                                                    _.filter(windows_material, x => x.val == 1),
                                                    dictionaries.windows_materials,
                                                    true
                                                )
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <h4 className="sub-header">Площадь, м<sup>2</sup></h4>

                            <table className="table table-borderless table-striped">
                                <tbody>
                                    <tr>
                                        <td style={{width: '40%'}}><strong>Общая</strong></td>
                                        <td>{orNone(total_sq)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Жилая</strong></td>
                                        <td>{orNone(living_sq)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Кухня</strong></td>
                                        <td>{orNone(kitchen_sq)}</td>
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

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Срочная продажа</strong></td>
                                        <td>{yesOrNoOrNone(urgent_sell)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Возможность купить в ипотеку</strong></td>
                                        <td>{yesOrNoOrNone(mortgage)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Сдается в аренду</strong></td>
                                        <td>{yesOrNoOrNone(for_rent)}</td>
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
        users : state.users.data,
        street: state.property.address.addressById.data,
        item  : state.property.apartments_sell.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers         : bindActionCreators(fetchUsers, dispatch),
        fetchAddress       : bindActionCreators(fetchAddress, dispatch),
        setMainPageData    : bindActionCreators(setMainPageData, dispatch),
        viewApartmentToSell: bindActionCreators(viewApartmentToSell, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentToSellDetails);
