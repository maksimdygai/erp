import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CollapsableBlock from 'generic/components/CollapsableBlock';
import Form from 'generic/components/Form';
import Input from 'generic/components/Form/Input';
import Radio from 'generic/components/Form/Radio';
import Select from 'generic/components/Form/Select';
import Textarea from 'generic/components/Form/Textarea';
import ContactField from 'generic/components/Form/ContactField';
import Datepicker from 'generic/components/Form/Datepicker';
import Multicontact from 'generic/components/Form/Multicontact';
import DropField from 'generic/components/Form/DropField';
import AddressFieldset from 'generic/components/Form/Fieldset/AddressFieldset';
import ContactFieldset from 'generic/components/Form/Fieldset/ContactFieldset';
import viewCommercial from 'modules/property/commercial/actions/view';
import post from 'modules/property/commercial/actions/post.js';
import put from 'modules/property/commercial/actions/put.js';
import findCheck from 'generic/helpers/find-check';
import getName from 'generic/helpers/get-name';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';
import dictionaries from 'generic/dictionaries';

class CommercialPropEdit extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        const
            id = this.props.params.id;

        if(id != 'new')
            this.props.viewCommercial(this.props.params.id);

        this.setState({entity: 'commercial_property'});
    }

    render() {
        const
            {data, item, params, post, put} = this.props,
            {entity} = this.state,

            {
                agent,
                basement_sq,
                block,
                building_year,
                ceiling_height,
                city_fias_id,
                comment,
                completed_at,
                condition,
                contacts,
                contracts_cooperation,
                contracts_exclusive,
                contracts_view,
                created_at,
                dedicated_line,
                distance_to_stations,
                district,
                exclusive,
                first_floor_sq,
                floor_type,
                free_pairs,
                from_firm,
                gates_num,
                hall_sq,
                has220v,
                has380v,
                has_autotransfer,
                has_cafes,
                has_canalisation,
                has_cinemas,
                has_crane_beam,
                has_dedic_parking,
                has_educational,
                has_elevator,
                has_escalator,
                has_gantry_crane,
                has_gas_supply,
                has_hospitals,
                has_lift_truck,
                has_lyada,
                has_optical_fiber,
                has_overhead_crane,
                has_phone,
                has_railway,
                has_ramp,
                has_refrigeration,
                has_telpher,
                has_tower_crane,
                has_water_supply,
                heating,
                house_fias_id,
                id,
                land_sq,
                lastСalled,
                latitude,
                level,
                lift_tonnage,
                location,
                longitude,
                metal_plast_windows,
                moderation_at,
                moderation_status,
                monthly_income,
                mortgage,
                net_sale,
                open_sale,
                ownership_type,
                passenger_lift,
                payback_period,
                phone_numbers,
                phone_station,
                price_include_communal,
                price_include_electricity,
                price_include_n_d_s,
                price_include_phone,
                price_include_repairs,
                price_sq_meter,
                profile_auto_service,
                profile_barbershop,
                profile_cafe,
                profile_canteen,
                profile_catering,
                profile_garage,
                profile_hotel,
                profile_industrial_base,
                profile_office,
                profile_production,
                profile_recreation_center,
                profile_sauna,
                profile_site,
                profile_stock,
                profile_store,
                profile_workshop,
                ready_business,
                remaining_sq,
                rent_price,
                rent_price_sq_meter,
                rent_sq,
                right_type_object,
                security,
                selling_price,
                service_lift,
                socle_sq,
                source,
                street_fias_id,
                text_on_the_site,
                total_sq,
                unfinished,
                updated_at,
                urgent_sell,
                wooden_windows,
                wooden_windows_eur
            } = params.id === 'new' ? {} : (item || {});

        return (
            <div>
                <div className="content-header">
                    <div className="header-section">
                        <h1>
                            <i className="gi gi-table"></i>

                            {params.id === 'new' ?
                                'Новый объект коммерческой недвижимости'
                                : `${id} (коммерческий объект)`
                            }

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

                        schema={{
                            agent         : 'isRequired',
                            condition     : 'isRequired',
                            contacts      : 'isRequired',
                            city_fias_id  : 'isRequired',
                            district      : 'isRequired',
                            heating       : 'isRequired',
                            house_fias_id : 'isRequired',
                            source        : 'isRequired',
                            street_fias_id: 'isRequired',
                            total_sq      : 'isFloat'
                        }}
                    >
                        {/* Management */}
                        <ContactFieldset data={item} />

                        {/* Type */}
                        <fieldset>
                            <legend>Тип</legend>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-3">
                                        <Input
                                            defaultValue={total_sq}
                                            name='total_sq'
                                            required={true}
                                            title="Общая площадь"
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <Input
                                            defaultValue={building_year}
                                            name='building_year'
                                            title="Год постройки"
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <Datepicker
                                            defaultDate={moment(completed_at)}
                                            name='completed_at'
                                            title="Дата сдачи"
                                            validations='isLength:1'
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <Radio
                                            checked={unfinished}
                                            name='unfinished'

                                            options={[
                                                {label: 'Не уст.', value: 0},
                                                {label: 'Да'     , value: 1},
                                                {label: 'Нет'    , value: 2}
                                            ]}

                                            title='Стройвариант'
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <CollapsableBlock
                                            title='Площадь'
                                            uniqueId={`square-comprop-${id}`}
                                        >
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <Input
                                                        defaultValue={socle_sq}
                                                        name='socle_sq'
                                                        title="Площадь цоколя"
                                                        validations='isInt'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Input
                                                        defaultValue={rent_sq}
                                                        name='rent_sq'
                                                        title="Площадь аренды"
                                                        validations='isInt'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Input
                                                        defaultValue={first_floor_sq}
                                                        name='first_floor_sq'
                                                        title="Площадь первого этажа"
                                                        validations='isInt'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Input
                                                        defaultValue={hall_sq}
                                                        name='hall_sq'
                                                        title="Площадь зала"
                                                        validations='isInt'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-3">
                                                    <Input
                                                        defaultValue={basement_sq}
                                                        name='basement_sq'
                                                        title="Площадь подвала"
                                                        validations='isInt'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Input
                                                        defaultValue={remaining_sq}
                                                        name='remaining_sq'
                                                        title="Площадь остальных этажей"
                                                        validations='isInt'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Input
                                                        defaultValue={land_sq}
                                                        name='land_sq'
                                                        title="Площадь участка"
                                                        validations='isInt'
                                                    />
                                                </div>
                                            </div>
                                        </CollapsableBlock>
                                    </div>

                                    <div className="col-md-12">
                                        <CollapsableBlock
                                            title='Профиль'
                                            uniqueId={`profile-comprop-${id}`}
                                        >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_auto_service}
                                                        name='profile_auto_service'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Автосервис'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_recreation_center}
                                                        name='profile_recreation_center'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='База отдыха'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_garage}
                                                        name='profile_garage'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Гараж'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_hotel}
                                                        name='profile_hotel'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Гостиница'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_canteen}
                                                        name='profile_canteen'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Столовая'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_catering}
                                                        name='profile_catering'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Общепит'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_cafe}
                                                        name='profile_cafe'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Кафе'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_store}
                                                        name='profile_store'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Магазин'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_workshop}
                                                        name='profile_workshop'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Цех'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_office}
                                                        name='profile_office'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Офис'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_barbershop}
                                                        name='profile_barbershop'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Парикмахерская'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_site}
                                                        name='profile_site'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Участок'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_industrial_base}
                                                        name='profile_industrial_base'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Пром. база'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_production}
                                                        name='profile_production'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Производство'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_sauna}
                                                        name='profile_sauna'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Сауна'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={profile_stock}
                                                        name='profile_stock'

                                                        options={[
                                                            {label: 'Не установлено', value: 0},
                                                            {label: 'Да'            , value: 1},
                                                            {label: 'Нет'           , value: 2}
                                                        ]}

                                                        title='Склад'
                                                    />
                                                </div>
                                            </div>
                                        </CollapsableBlock>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <AddressFieldset data={item} entity={entity} />

                        {/* Price */}
                        <fieldset>
                            <legend>Цена, р.</legend>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-3">
                                        <Input
                                            defaultValue={selling_price}
                                            name='selling_price'
                                            title="Цена продажи"
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <Input
                                            defaultValue={rent_price}
                                            name='rent_price'
                                            title="Цена аренды"
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <Input
                                            defaultValue={payback_period}
                                            name='payback_period'
                                            title="Срок окупаемости"
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <Radio
                                            checked={urgent_sell}
                                            name='urgent_sell'
                                            options={dictionaries.defaultRadioOptions}
                                            title='Срочная продажа'
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <Input
                                            defaultValue={price_sq_meter}
                                            name='price_sq_meter'
                                            title="Цена продажи за м. кв."
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <Input
                                            defaultValue={rent_price_sq_meter}
                                            name='rent_price_sq_meter'
                                            title="Цена аренды за м. кв."
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <Radio
                                            checked={mortgage}
                                            name='mortgage'
                                            options={dictionaries.defaultRadioOptions}
                                            title='Ипотека'
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <Radio
                                            checked={net_sale}
                                            name='net_sale'
                                            options={dictionaries.defaultRadioOptions}
                                            title='Чистая продажа'
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <CollapsableBlock
                                                title='В стоимость входит'
                                                uniqueId={`price-include-comprop-${id}`}
                                            >
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <Radio
                                                            checked={price_include_n_d_s}
                                                            name='price_include_n_d_s'
                                                            options={dictionaries.defaultRadioOptions}
                                                            title='В стоимость входит НДС'
                                                        />
                                                    </div>

                                                    <div className="col-md-3">
                                                        <Radio
                                                            checked={price_include_electricity}
                                                            name='price_include_electricity'
                                                            options={dictionaries.defaultRadioOptions}
                                                            title='В стоимость входит электроэнергия'
                                                        />
                                                    </div>

                                                    <div className="col-md-3">
                                                        <Radio
                                                            checked={price_include_communal}
                                                            name='price_include_communal'
                                                            options={dictionaries.defaultRadioOptions}
                                                            title='В стоимость входят коммунальные платежи'
                                                        />
                                                    </div>

                                                    <div className="col-md-3">
                                                        <Radio
                                                            checked={price_include_repairs}
                                                            name='price_include_repairs'
                                                            options={dictionaries.defaultRadioOptions}
                                                            title='В стоимость входит ремонт'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <Radio
                                                            checked={price_include_phone}
                                                            name='price_include_phone'
                                                            options={dictionaries.defaultRadioOptions}
                                                            title='В стоимость входит телефон'
                                                        />
                                                    </div>
                                                </div>
                                            </CollapsableBlock>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        {/* Photos */}
                        <fieldset>
                            <legend>Фото</legend>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12">

                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        {/* Additional */}
                        <fieldset>
                            <legend>Дополнительно</legend>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-4">
                                        <DropField name='photos' />
                                    </div>

                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Select
                                                    name='condition'
                                                    value={condition}
                                                    options={dictionaries.apt_condition_types}
                                                    passInt={true}
                                                    placeholder='Выберите состояние объекта'
                                                    required={true}
                                                    title='Состояние'
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Select
                                                    name='heating'
                                                    value={heating}
                                                    options={dictionaries.heating_types}
                                                    passInt={true}
                                                    placeholder='Выберите тип отопительной системы'
                                                    required={true}
                                                    title='Отопление'
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Select
                                                    name='security'
                                                    value={security}
                                                    options={dictionaries.security_types}
                                                    passInt={true}
                                                    placeholder='Выберите тип охраны'
                                                    title='Охрана'
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Select
                                                    name='right_type_object'
                                                    value={right_type_object}
                                                    options={dictionaries.object_right_types}
                                                    passInt={true}
                                                    placeholder='Выберите вид права'
                                                    title='Вид права'
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Select
                                                    name='phone_station'
                                                    value={phone_station}
                                                    options={dictionaries.phone_stations}
                                                    passInt={true}
                                                    placeholder='Выберите тип телефонной станции'
                                                    title='Телефонная станция'
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Select
                                                    name='ownership_type'
                                                    value={ownership_type}
                                                    options={dictionaries.property_types}
                                                    passInt={true}
                                                    placeholder='Выберите вид собственности'
                                                    title='Вид собственности'
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-2">
                                                <Select
                                                    name='level'
                                                    value={level}
                                                    options={dictionaries.level_types}
                                                    passInt={true}
                                                    placeholder='Выберите этажность объекта'
                                                    title='Этажность'
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Input
                                                    defaultValue={gates_num}
                                                    name='gates_num'
                                                    title="Количество ворот"
                                                    validations='isInt'
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Input
                                                    defaultValue={phone_numbers}
                                                    name='phone_numbers'
                                                    title="Кол-во телефонных номеров"
                                                    validations='isInt'
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Input
                                                    defaultValue={distance_to_stations}
                                                    name='distance_to_stations'
                                                    title="Расстояние до остановок"
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Input
                                                    defaultValue={lift_tonnage}
                                                    name='lift_tonnage'
                                                    title="Лифт, тоннаж"
                                                    validations='isInt'
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Input
                                                    defaultValue={free_pairs}
                                                    name='free_pairs'
                                                    title="Свободных пар"
                                                    validations='isInt'
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <Select
                                                    name='floor_type'
                                                    value={floor_type}
                                                    options={dictionaries.floor_types}
                                                    passInt={true}
                                                    placeholder='Выберите тип полов'
                                                    title='Полы'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={ceiling_height}
                                                    name='ceiling_height'
                                                    title="Высота потолков"
                                                    validations='isInt'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={monthly_income}
                                                    name='monthly_income'
                                                    title="Ежемесячный доход"
                                                    validations='isInt'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={has_escalator}
                                                    name='has_escalator'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Эскалатор'
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <Radio
                                                    checked={wooden_windows}
                                                    name='wooden_windows'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Деревянные окна'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={dedicated_line}
                                                    name='dedicated_line'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Выделенная линия'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={has_ramp}
                                                    name='has_ramp'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Наличие пандуса'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={wooden_windows_eur}
                                                    name='wooden_windows_eur'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Деревянные евроокна'
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <Radio
                                                    checked={has_dedic_parking}
                                                    name='has_dedic_parking'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Наличие выделенных парковочных мест'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={has_refrigeration}
                                                    name='has_refrigeration'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Холодильные камеры'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={ready_business}
                                                    name='ready_business'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Готовый бизнес'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={metal_plast_windows}
                                                    name='metal_plast_windows'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Металлопластиковые окна'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <CollapsableBlock
                                            title='Коммуникации'
                                            uniqueId={`communic-comprop-${id}`}
                                        >
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_autotransfer}
                                                        name='has_autotransfer'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Автоподъезд'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_railway}
                                                        name='has_railway'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Ж/д'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has220v}
                                                        name='has220v'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Линия 220В'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_water_supply}
                                                        name='has_water_supply'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Водоснабжение'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_canalisation}
                                                        name='has_canalisation'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Канализация'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has380v}
                                                        name='has380v'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Линия 380В'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_gas_supply}
                                                        name='has_gas_supply'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Газоснабжение'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_phone}
                                                        name='has_phone'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Телефон'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_optical_fiber}
                                                        name='has_optical_fiber'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Оптоволокно'
                                                    />
                                                </div>
                                            </div>
                                        </CollapsableBlock>
                                    </div>

                                    <div className="col-md-12">
                                        <CollapsableBlock
                                            title='Подъемные средства'
                                            uniqueId={`lifts-comporp-${id}`}
                                        >
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_lift_truck}
                                                        name='has_lift_truck'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Автопогрузчик'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={passenger_lift}
                                                        name='passenger_lift'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Пассажирский лифт'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_tower_crane}
                                                        name='has_tower_crane'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Башенный кран'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_gantry_crane}
                                                        name='has_gantry_crane'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Козловой кран'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={service_lift}
                                                        name='service_lift'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Грузовой лифт'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_crane_beam}
                                                        name='has_crane_beam'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Кранбалка'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_lyada}
                                                        name='has_lyada'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Ляда'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_overhead_crane}
                                                        name='has_overhead_crane'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Мостовой кран'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_elevator}
                                                        name='has_elevator'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Подъемник'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_telpher}
                                                        name='has_telpher'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Тельфер'
                                                    />
                                                </div>
                                            </div>
                                        </CollapsableBlock>
                                    </div>

                                    <div className="col-md-12">
                                        <CollapsableBlock
                                            title='Инфраструктура'
                                            uniqueId={`infrastructure-comprop-${id}`}
                                        >
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_cafes}
                                                        name='has_cafes'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Бары и кафе'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_cinemas}
                                                        name='has_cinemas'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Кинотеатры'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_educational}
                                                        name='has_educational'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Образовательные учреждения'
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <Radio
                                                        checked={has_hospitals}
                                                        name='has_hospitals'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Больницы и диагностические центры'
                                                    />
                                                </div>
                                            </div>
                                        </CollapsableBlock>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Textarea
                                            defaultValue={comment}
                                            name='comment'
                                            rows={5}
                                            title="Комментарий"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <Textarea
                                            defaultValue={text_on_the_site}
                                            name='text_on_the_site'
                                            rows={5}
                                            title="Текст для объявления"
                                        />
                                    </div>
                                </div>
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
        item       : state.property.commercial.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        post          : bindActionCreators(post, dispatch),
        put           : bindActionCreators(put, dispatch),
        viewCommercial: bindActionCreators(viewCommercial, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommercialPropEdit);
