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
import Multicontact from 'generic/components/Form/Multicontact';
import DropField from 'generic/components/Form/DropField';
import Datepicker from 'generic/components/Form/Datepicker';
import AddressFieldset from 'generic/components/Form/Fieldset/AddressFieldset';
import ContactFieldset from 'generic/components/Form/Fieldset/ContactFieldset';
import dictionaries from 'generic/dictionaries';
import getName from 'generic/helpers/get-name';
import findCheck from 'generic/helpers/find-check';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';
import viewLot from 'modules/property/lots/actions/view.js';
import post from 'modules/property/lots/actions/post.js';
import put from 'modules/property/lots/actions/put.js';

class LotEdit extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        const
            id = this.props.params.id;

        if(id !== 'new')
            this.props.viewLot(id);

        this.setState({entity: 'lots'});
    }

    render() {
        const
            {item, params, post, put} = this.props,
            {entity} = this.state,

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
            } = item || {};

        return (
            <div>
                <div className="content-header">
                    <div className="header-section">
                        <h1>
                            <i className="gi gi-table"></i>
                            {params.id === 'new' ? 'Новый участок' : `${name} (участок)`}
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
                            contacts      : 'isRequired',
                            city_fias_id  : 'isRequired',
                            district      : 'isRequired',
                            house_fias_id : 'isRequired',
                            source        : 'isRequired',
                            street_fias_id: 'isRequired',
                            price         : 'isRequired',
                            type          : 'isRequired',
                            ground_area   : 'isRequired'
                        }}
                    >
                        {/* Management */}
                        <ContactFieldset data={item} />

                        {/* Type */}
                        <fieldset>
                            <legend>Тип</legend>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-2">
                                        <Select
                                            name='type'
                                            value={type}
                                            options={dictionaries.house_types}
                                            passInt={true}
                                            required={true}
                                            placeholder='Выберите тип участка'
                                            title='Тип'
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <Input
                                            defaultValue={ground_area}
                                            name='ground_area'
                                            required={true}
                                            title="Площадь (сот)"
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <Input
                                            defaultValue={measurement_x}
                                            name='measurement_x'
                                            title="Длина участка"
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <Input
                                            defaultValue={measurement_y}
                                            name='measurement_y'
                                            title="Ширина участка"
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <Datepicker
                                            defaultDate={moment(completed_at)}
                                            name='completed_at'
                                            title="Дата сдачи"
                                            validations='isLength:1'
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <Select
                                            name='right_type_land'
                                            value={right_type_land}
                                            options={dictionaries.land_right_types}
                                            passInt={true}
                                            placeholder='Выберите вид права'
                                            title='Вид права'
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <CollapsableBlock
                                                title='Правовые документы на землю'
                                                uniqueId={`land-legal-docs-lots-${id}`}
                                            >
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldland_contract_of_sale}
                                                            name='ldland_contract_of_sale'

                                                            options={[
                                                                {label: 'Не установлено'    , value: 0},
                                                                {label: 'Да'     , value: 1},
                                                                {label: 'Нет'  , value: 2}
                                                            ]}

                                                            title='Договор купли-продажи'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldland_certificate_of_inheritance}
                                                            name='ldland_certificate_of_inheritance'

                                                            options={[
                                                                {label: 'Не установлено'    , value: 0},
                                                                {label: 'Да'     , value: 1},
                                                                {label: 'Нет'  , value: 2}
                                                            ]}

                                                            title='Свидетельство о наследовании'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldland_protocols_auction}
                                                            name='ldland_protocols_auction'

                                                            options={[
                                                                {label: 'Не установлено'    , value: 0},
                                                                {label: 'Да'     , value: 1},
                                                                {label: 'Нет'  , value: 2}
                                                            ]}

                                                            title='Протоколы торгов аукциона'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldland_contract_of_gift}
                                                            name='ldland_contract_of_gift'

                                                            options={[
                                                                {label: 'Не установлено'    , value: 0},
                                                                {label: 'Да'     , value: 1},
                                                                {label: 'Нет'  , value: 2}
                                                            ]}

                                                            title='Договор дарения'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldland_agreement_sharing_property}
                                                            name='ldland_agreement_sharing_property'

                                                            options={[
                                                                {label: 'Не установлено'    , value: 0},
                                                                {label: 'Да'     , value: 1},
                                                                {label: 'Нет'  , value: 2}
                                                            ]}

                                                            title='Соглашение о разделе совместно нажитого имущества'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldland_agreement_compensation}
                                                            name='ldland_agreement_compensation'

                                                            options={[
                                                                {label: 'Не установлено'    , value: 0},
                                                                {label: 'Да'     , value: 1},
                                                                {label: 'Нет'  , value: 2}
                                                            ]}

                                                            title='Договор об отступном'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldland_barter_contract}
                                                            name='ldland_barter_contract'

                                                            options={[
                                                                {label: 'Не установлено'    , value: 0},
                                                                {label: 'Да'     , value: 1},
                                                                {label: 'Нет'  , value: 2}
                                                            ]}

                                                            title='Договор мены'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldland_agreemen_alloc_owner_interest}
                                                            name='ldland_agreemen_alloc_owner_interest'

                                                            options={[
                                                                {label: 'Не установлено'    , value: 0},
                                                                {label: 'Да'     , value: 1},
                                                                {label: 'Нет'  , value: 2}
                                                            ]}

                                                            title='Соглашение о выделении доли в праве собственности'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldland_court_dec_amicable_agr}
                                                            name='ldland_court_dec_amicable_agr'

                                                            options={[
                                                                {label: 'Не установлено'    , value: 0},
                                                                {label: 'Да'     , value: 1},
                                                                {label: 'Нет'  , value: 2}
                                                            ]}

                                                            title='Решение суда или мировое соглашение'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldland_decree_local_administration}
                                                            name='ldland_decree_local_administration'

                                                            options={[
                                                                {label: 'Не установлено'    , value: 0},
                                                                {label: 'Да'     , value: 1},
                                                                {label: 'Нет'  , value: 2}
                                                            ]}

                                                            title='Постановление местной администрации'
                                                        />
                                                    </div>
                                                </div>
                                            </CollapsableBlock>
                                        </div>
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
                                    <div className="col-md-1">
                                        <Input
                                            defaultValue={price}
                                            name='price'
                                            title="Цена"
                                            required={true}
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-1">
                                        <Input
                                            defaultValue={special_price}
                                            name='special_price'
                                            title="Специальная цена"
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <Input
                                            defaultValue={terms}
                                            name='terms'
                                            title="Условия"
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <Radio
                                            checked={net_sale}
                                            name='net_sale'

                                            options={[
                                                {label: 'Не установлено', value: 0},
                                                {label: 'Да'            , value: 1},
                                                {label: 'Нет'           , value: 2}
                                            ]}

                                            title='Чистая продажа'
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <CollapsableBlock
                                                title='Оплаченные коммуникации'
                                                uniqueId={`lots-payment-for-${id}`}
                                            >
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Radio
                                                            checked={payment_for_water}
                                                            name='payment_for_water'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Оплачена вода'
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Radio
                                                            checked={payment_for_electricity}
                                                            name='payment_for_electricity'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Оплачено электричество'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Radio
                                                            checked={payment_for_gas}
                                                            name='payment_for_gas'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Оплачен газ'
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Radio
                                                            checked={payment_for_canalization}
                                                            name='payment_for_canalization'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Оплачена канализация'
                                                        />
                                                    </div>
                                                </div>
                                            </CollapsableBlock>
                                        </div>
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
                                            <div className="col-md-3">
                                                <Select
                                                    name='entrance_type'
                                                    value={entrance_type}
                                                    options={dictionaries.entrance_road_types}
                                                    passInt={true}
                                                    placeholder='Выберите подъезд к участку'
                                                    title='Подъезд к участку'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Select
                                                    name='land_position'
                                                    value={land_position}
                                                    options={dictionaries.placement}
                                                    passInt={true}
                                                    placeholder='Выберите расположение участка'
                                                    title='Расположение'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Select
                                                    name='relief'
                                                    value={relief}
                                                    options={dictionaries.relief_types}
                                                    passInt={true}
                                                    placeholder='Выберите тип рельефа'
                                                    title='Рельеф'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={distance_to_stations}
                                                    name='distance_to_stations'
                                                    title="Расстояние до остановок"
                                                    validations='isInt'
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={facade_width}
                                                    name='facade_width'
                                                    title="Ширина фасада"
                                                    validations='isInt'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={roadway_width}
                                                    name='roadway_width'
                                                    title="Ширина проезжей части"
                                                    validations='isInt'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={land_location}
                                                    name='land_location'
                                                    title="Местонахождение земельного участка"
                                                    note="Местонахождение домовладения (земельного участка) -
                                                        расстояние от города до дома или участка.
                                                        Если 0, то дом или участок в городе"
                                                    validations='isInt'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={exit_to_pond}
                                                    name='exit_to_pond'

                                                    options={[
                                                        {label: 'Не установлено', value: 0},
                                                        {label: 'Да'            , value: 1},
                                                        {label: 'Нет'           , value: 2}
                                                    ]}

                                                    title='Выход к водоему'
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <Radio
                                                    checked={surveying}
                                                    name='surveying'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Межевание'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={elite}
                                                    name='elite'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Элитное жилье'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={is_garden}
                                                    name='is_garden'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Садоводческий участок'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={has_adjoining_territory}
                                                    name='has_adjoining_territory'
                                                    options={dictionaries.defaultRadioOptions}
                                                    title='Наличие прилегающей к участку территории'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <CollapsableBlock
                                            title='Коммуникации'
                                            uniqueId={`communic-lots-${id}`}
                                        >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Select
                                                        name='communic_gas'
                                                        value={communic_gas}
                                                        options={dictionaries.communic_gas}
                                                        passInt={true}
                                                        placeholder='Укажите проведен ли газ'
                                                        title='Газ'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Select
                                                        name='communic_phone'
                                                        value={communic_phone}
                                                        options={dictionaries.communic_phone}
                                                        passInt={true}
                                                        placeholder='Укажите проведен ли телефон'
                                                        title='Телефон'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Select
                                                        name='communic_water'
                                                        value={communic_water}
                                                        options={dictionaries.communic_water}
                                                        passInt={true}
                                                        placeholder='Укажите проведена ли вода'
                                                        title='Вода'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Select
                                                        name='communic_canalisation'
                                                        value={communic_canalisation}
                                                        options={dictionaries.communic_canalisation}
                                                        passInt={true}
                                                        placeholder='Укажите проведена ли канализация'
                                                        title='Канализация'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Select
                                                        name='communic_electricity'
                                                        value={communic_electricity}
                                                        options={dictionaries.communic_electricity}
                                                        passInt={true}
                                                        placeholder='Укажите проведено ли электричество'
                                                        title='Электричество'
                                                    />
                                                </div>
                                            </div>
                                        </CollapsableBlock>
                                    </div>

                                    <div className="col-md-12">
                                        <CollapsableBlock
                                            title='Инфраструктура'
                                            uniqueId={`infrastructure-lots-${id}`}
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
                                                        checked={has_educational}
                                                        name='has_educational'
                                                        options={dictionaries.defaultRadioOptions}
                                                        title='Образовательные учреждения'
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
                                            title="Текст на сайт"
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
        item          : state.property.lots.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        viewLot       : bindActionCreators(viewLot, dispatch),
        post          : bindActionCreators(post, dispatch),
        put           : bindActionCreators(put, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LotEdit);
