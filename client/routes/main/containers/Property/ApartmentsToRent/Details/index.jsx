import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Select from 'generic/components/Form/Select';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import ClientBlock from 'routes/main/components/ClientBlock';
import viewApartmentToRent from 'modules/property/apartments_rent/actions/view';
import fetchAddress from 'modules/property/address/address_by_id/actions/fetch.js';
import fetchUsers from 'modules/users/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import findOrNone from 'generic/helpers/find-or-none';
import getName from 'generic/helpers/get-name';
import orNone from 'generic/helpers/or-none';
import yesOrNoOrNone from 'generic/helpers/yes-or-no-or-none';
import formatMoney from 'generic/helpers/format-money';
import yesOrNo from 'generic/helpers/yes-or-no';
import dictionaries from 'generic/dictionaries';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';

class ApartmentToRentDetails extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.props.viewApartmentToRent(this.props.params.id);
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
                agent,
                apartment,
                balcony,
                bathroom,
                block,
                city_fias_id,
                comment,
                commodities,
                concierge,
                condition,
                contacts,
                contracts_cooperation,
                contracts_exclusive,
                contracts_view,
                created_at,
                district,
                elite,
                entrance,
                exclusive,
                floor,
                floors,
                from_firm,
                furniture,
                has_boiler,
                has_dish_washer,
                has_fridge,
                has_microwave,
                has_parking,
                has_phone,
                has_split_system,
                has_tv,
                has_vacuum_cleaner,
                has_washing_machine,
                house_fias_id,
                house_number,
                housing_stock,
                id,
                kitchen_sq,
                lastСalled,
                latitude,
                living_sq,
                location,
                loggia,
                longitude,
                metal_plast_windows,
                moderation_at,
                moderation_status,
                net_sale,
                open_sale,
                passenger_lift,
                pledge,
                pref_animals,
                pref_young_children,
                prepay,
                price,
                price_include_electricity,
                price_include_gas,
                price_include_internet,
                price_include_phone,
                price_include_t_v,
                price_include_water,
                related,
                rent_type_all,
                rent_type_day,
                rent_type_for_office,
                rooms,
                service_lift,
                small_household_appliances,
                source,
                special_price,
                street_fias_id,
                terms,
                text_on_the_site,
                total_sq,
                type,
                updated_at,
                wooden_windows,
                wooden_windows_eur,
                yard
            } = item || {},

            windows_materials = [
                {id: 1, val: wooden_windows},
                {id: 2, val: metal_plast_windows},
                {id: 3, val: wooden_windows_eur}
            ],

            rent_types = [
                {id: 1, val: rent_type_all},
                {id: 2, val: rent_type_for_office},
                {id: 3, val: rent_type_day}
            ];

        return (
            <div>
                <div className="content-header content-header-media">
                    <div className="header-section">
                        <h1>
                            {id}
                            <br></br>
                            <small>Квартира (аренда)</small>
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
                                    <Link to={`/apartments_rent/${id}/edit`} className="btn btn-default btn-alt btn-sm" title="Редактировать">
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
                                        <td style={{width: '40%'}}><strong>Удобства</strong></td>
                                        <td>{findOrNone(dictionaries.commodities, commodities)}</td>
                                    </tr>

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
                                        <td style={{width: '40%'}}><strong>Этаж</strong></td>
                                        <td>{`${floor} из ${floors}`}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Тип</strong></td>
                                        <td>{findOrNone(dictionaries.apt_types, type)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Материал окон</strong></td>
                                        <td>
                                            {orNone(
                                                matchArrEqualObjProps(
                                                    _.filter(windows_materials, x => x.val == 1),
                                                    dictionaries.windows_materials,
                                                    true
                                                )
                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Въезд</strong></td>
                                        <td>{findOrNone(dictionaries.entrance_types, entrance)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Мебель</strong></td>
                                        <td>{findOrNone(dictionaries.furniture, furniture)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Телефон</strong></td>
                                        <td>{yesOrNoOrNone(has_phone)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Количество комнат</strong></td>
                                        <td>{orNone(rooms)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Двор</strong></td>
                                        <td>{findOrNone(dictionaries.yard_types, yard)}</td>
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
                                        <td style={{width: '40%'}}><strong>Тип аренды</strong></td>
                                        <td>
                                            {orNone(
                                                matchArrEqualObjProps(
                                                    _.filter(rent_types, x => x.val == 1),
                                                    dictionaries.rent_types,
                                                    true
                                                )
                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Цена</strong></td>
                                        <td>{price ? formatMoney(price) : orNone(price)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width: '40%'}}><strong>Предоплата</strong></td>
                                        <td>{prepay ? formatMoney(prepay) : orNone(prepay)}</td>
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
        item   : state.property.apartments_rent.view,
        users  : state.users.data,
        street : state.property.address.addressById.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers         : bindActionCreators(fetchUsers, dispatch),
        fetchAddress       : bindActionCreators(fetchAddress, dispatch),
        setMainPageData    : bindActionCreators(setMainPageData, dispatch),
        viewApartmentToRent: bindActionCreators(viewApartmentToRent, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentToRentDetails);
