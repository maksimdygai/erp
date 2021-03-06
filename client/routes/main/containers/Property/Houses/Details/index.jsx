import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Select from 'generic/components/Form/Select';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import ClientBlock from 'routes/main/components/ClientBlock';
import viewHouse from 'modules/property/houses/actions/view';
import fetchAddress from 'modules/property/address/address_by_id/actions/fetch.js';
import fetchClients from 'modules/clients/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import findOrNone from 'generic/helpers/find-or-none';
import getName from 'generic/helpers/get-name';
import orNone from 'generic/helpers/or-none';
import formatMoney from 'generic/helpers/format-money';
import yesOrNoOrNone from 'generic/helpers/yes-or-no';
import dictionaries from 'generic/dictionaries';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

class HouseDetails extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.props.viewHouse(this.props.params.id);
        this.props.fetchUsers();
        this.props.setMainPageData({activePage: "apartment_to_rent"});
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
                access_control_system,
                agent,
                air_conditioning_system,
                automatic_watering_land,
                backup_power_system,
                bathroom,
                block,
                building_year,
                ceiling_height,
                central_dust_extraction_system,
                city_fias_id,
                comb_ventilation_system,
                comment,
                commodities,
                communic_canalisation,
                communic_electricity,
                communic_gas,
                communic_phone,
                communic_water,
                completed_at,
                condition,
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
                floor_type,
                floors,
                from_firm,
                garage,
                ground_area,
                has_bathhouse,
                has_cafes,
                has_cinemas,
                has_educational,
                has_garden,
                has_hospitals,
                has_kitchen_garden,
                has_landscaping,
                has_paving,
                has_pool,
                has_yard,
                heating,
                home_fire_alarm,
                home_security_alarm,
                hot_water,
                house_fias_id,
                house_number,
                house_location,
                id,
                kitchen_sq,
                land_location,
                land_security_alarm,
                lastСalled,
                latitude,
                ldh_act_of_accep_house,
                ldh_agreemen_alloc_owner_interest,
                ldh_agreement_compensation,
                ldh_agreement_sharing_property,
                ldh_barter_contract,
                ldh_certificate_of_inheritance,
                ldh_contract_of_gift,
                ldh_contract_of_sale,
                ldh_court_dec_amicable_agr,
                ldh_declaration_dacha_amnesty,
                ldh_rent_contract,
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
                living_sq,
                local_street_cooling_system,
                location,
                longitude,
                material,
                metal_plast_windows,
                moderation_at,
                moderation_status,
                net_sale,
                open_sale,
                owners_num,
                payment_for_canalization,
                payment_for_electricity,
                payment_for_gas,
                payment_for_water,
                price,
                relief,
                right_type_land,
                right_type_object,
                roadway_width,
                roof_heating_system,
                roof_type,
                rooms,
                source,
                special_price,
                street_fias_id,
                surveying,
                terms,
                text_on_the_site,
                total_sq,
                type,
                underage_owners_num,
                updated_at,
                video_surv_system,
                voltage_stab_system,
                walkway_heating_system,
                water_purification_system,
                wooden_windows,
                wooden_windows_eur,
                yard
            } = item || {},

            windows_material = [
                {id: 1, val: wooden_windows},
                {id: 2, val: metal_plast_windows},
                {id: 3, val: wooden_windows_eur}
            ],

            communications = [
                {id: 1, val: communic_water},
                {id: 2, val: communic_gas},
                {id: 3, val: communic_electricity},
                {id: 4, val: communic_phone},
                {id: 5, val: communic_canalisation}
            ],

            infrastructure = [
                {id: 1, val: has_cafes},
                {id: 2, val: has_cinemas},
                {id: 3, val: has_hospitals},
                {id: 4, val: has_educational}
            ];

        return (
            <div>
                <div className="content-header content-header-media">
                    <div className="header-section">
                        <h1>
                            {id}
                            <br></br>
                            <small>Дом</small>
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
                                    <Link to={`/houses/${id}/edit`} className="btn btn-default btn-alt btn-sm" title="Редактировать">
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

                            <h4 className="sub-header">Дом</h4>

                            <table className="table table-borderless table-striped">
                                <tbody>
                                    <tr>
                                        <td style={{width: '40%'}}><strong>Состояние</strong></td>
                                        <td>{findOrNone(dictionaries.apt_condition_types, condition)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Описание</strong></td>
                                        <td>{orNone(comment)}</td>
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
                                        <td style={{width: '40%'}}><strong>Этажность</strong></td>
                                        <td>{orNone(floors)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Отопление</strong></td>
                                        <td>{findOrNone(dictionaries.heating_types, heating)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Тип</strong></td>
                                        <td>{findOrNone(dictionaries.house_types, type)}</td>
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

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Въезд</strong></td>
                                        <td>{findOrNone(dictionaries.entrance_road_types, entrance_type)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Количество комнат</strong></td>
                                        <td>{orNone(rooms)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Двор</strong></td>
                                        <td>{findOrNone(dictionaries.yard_types, yard)}</td>
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

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Санузел</strong></td>
                                        <td>{findOrNone(dictionaries.bathroom_types, bathroom)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Сдан</strong></td>
                                        <td>{moment(completed_at).format('DD.MM.YYYY, HH:MM')}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Расстояние до остановки</strong></td>
                                        <td>{orNone(distance_to_stations)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Полы</strong></td>
                                        <td>{findOrNone(dictionaries.floor_types, floor_type)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Гараж</strong></td>
                                        <td>{yesOrNoOrNone(garage)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Земельный участок (сот)</strong></td>
                                        <td>{orNone(ground_area)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Горячая вода</strong></td>
                                        <td>{findOrNone(dictionaries.hot_water, hot_water)}</td>
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
                                        <td style={{width: '40%'}}><strong>Материал</strong></td>
                                        <td>{findOrNone(dictionaries.house_wall_materials, material)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Крыша</strong></td>
                                        <td>{findOrNone(dictionaries.roof_types, roof_type)}</td>
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
        item   : state.property.houses.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers     : bindActionCreators(fetchUsers, dispatch),
        fetchAddress   : bindActionCreators(fetchAddress, dispatch),
        setMainPageData: bindActionCreators(setMainPageData, dispatch),
        viewHouse      : bindActionCreators(viewHouse, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseDetails);
