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
import AddressFieldset from 'generic/components/Form/Fieldset/AddressFieldset';
import ContactFieldset from 'generic/components/Form/Fieldset/ContactFieldset';
import viewHouse from 'modules/property/houses/actions/view';
import post from 'modules/property/houses/actions/post.js';
import put from 'modules/property/houses/actions/put.js';
import findCheck from 'generic/helpers/find-check';
import getName from 'generic/helpers/get-name';
import matchArrEqualObjProps from 'generic/helpers/match-arr-equal-obj-proprs';
import dictionaries from 'generic/dictionaries';

class HouseEdit extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        const
            id = this.props.params.id;

        if(id != 'new')
            this.props.viewHouse(id);

        this.setState({entity: 'houses'});
    }

    render() {
        const
            {data, item, params, post, put} = this.props,
            {entity} = this.state,

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
            } = params.id === 'new' ? {} : (item || {});

        return (
            <div>
                <div className="content-header">
                    <div className="header-section">
                        <h1>
                            <i className="gi gi-table"></i>
                            {params.id === 'new' ? 'Новый дом' : `${id} (дом)`}
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
                            bathroom      : 'isRequired',
                            condition     : 'isRequired',
                            contacts      : 'isRequired',
                            city_fias_id  : 'isRequired',
                            district      : 'isRequired',
                            heating       : 'isRequired',
                            house_fias_id : 'isRequired',
                            kitchen_sq    : 'isFloat',
                            living_sq     : 'isFloat',
                            material      : 'isRequired',
                            price         : 'isFloat',
                            source        : 'isRequired',
                            total_sq      : 'isFloat',
                            street_fias_id: 'isRequired'
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
                                            placeholder='Выберите тип дома'
                                            title='Тип'
                                        />
                                    </div>

                                    <div className="col-md-1">
                                        <Input
                                            defaultValue={floors}
                                            name='floors'
                                            title="Этажность"
                                            validations='isLength:1'
                                        />
                                    </div>

                                    <div className="col-md-1">
                                        <Input
                                            defaultValue={ground_area}
                                            name='ground_area'
                                            title="Зем. участок (сот)"
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-1">
                                        <Input
                                            defaultValue={total_sq}
                                            name='total_sq'
                                            required={true}
                                            title="Пл. (общая, м. кв.)"
                                            validations='isFloat'
                                        />
                                    </div>

                                    <div className="col-md-1">
                                        <Input
                                            defaultValue={living_sq}
                                            name='living_sq'
                                            required={true}
                                            title="Пл. (жилая, м. кв.)"
                                            validations='isFloat'
                                        />
                                    </div>

                                    <div className="col-md-1">
                                        <Input
                                            defaultValue={kitchen_sq}
                                            name='kitchen_sq'
                                            required={true}
                                            title="Пл. (кухня, м. кв.)"
                                            validations='isFloat'
                                        />
                                    </div>

                                    <div className="col-md-1">
                                        <Input
                                            defaultValue={building_year}
                                            name='building_year'
                                            title="Год постройки"
                                            validations='isInt'
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <Select
                                            name='material'
                                            value={material}
                                            options={dictionaries.house_wall_materials}
                                            passInt={true}
                                            placeholder='Выберите материал стен дома'
                                            required={true}
                                            title='Материал стен'
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <Select
                                            name='yard'
                                            value={yard}
                                            options={dictionaries.yard_types}
                                            passInt={true}
                                            placeholder='Выберите тип двора'
                                            title='Двор'
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <Select
                                            name='right_type_land'
                                            value={right_type_land}
                                            options={dictionaries.land_right_types}
                                            passInt={true}
                                            placeholder='Выберите вид права на земельный участок'
                                            title='Вид права на земельный участок'
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <Select
                                            name='right_type_object'
                                            value={right_type_object}
                                            options={dictionaries.object_right_types}
                                            passInt={true}
                                            placeholder='Выберите вид права на дом'
                                            title='Вид права на дом'
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <Radio
                                            checked={elite}
                                            name='elite'

                                            options={[
                                                {label: 'Не установлено', value: 0},
                                                {label: 'Да'            , value: 1},
                                                {label: 'Нет'           , value: 2}
                                            ]}

                                            title='Элитное жильё'
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <CollapsableBlock
                                                title='Правовые документы на землю'
                                                uniqueId={`land-legal-docs-houses-${id}`}
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

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <CollapsableBlock
                                                title='Правовые документы на дом'
                                                uniqueId={`house-legal-docs-houses-${id}`}
                                            >
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldh_contract_of_sale}
                                                            name='ldh_contract_of_sale'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Договор купли-продажи'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldh_certificate_of_inheritance}
                                                            name='ldh_certificate_of_inheritance'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Свидетельство о наследовании'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldh_act_of_accep_house}
                                                            name='ldh_act_of_accep_house'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Акт о приемке дома в эксплуатацию'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldh_contract_of_gift}
                                                            name='ldh_contract_of_gift'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Договор дарения'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldh_agreement_sharing_property}
                                                            name='ldh_agreement_sharing_property'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Соглашение о разделе совместно нажитого имущества'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldh_declaration_dacha_amnesty}
                                                            name='ldh_declaration_dacha_amnesty'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Декларация по дачной амнистии'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldh_barter_contract}
                                                            name='ldh_barter_contract'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Договор мены'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldh_agreemen_alloc_owner_interest}
                                                            name='ldh_agreemen_alloc_owner_interest'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Соглашение о выделении доли в праве собственности'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldh_agreement_compensation}
                                                            name='ldh_agreement_compensation'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Договор об отступном'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldh_court_dec_amicable_agr}
                                                            name='ldh_court_dec_amicable_agr'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Решение суда или мировое соглашение'
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <Radio
                                                            checked={ldh_rent_contract}
                                                            name='ldh_rent_contract'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Договор ренты'
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
                                            required={true}
                                            title="Цена"
                                            validations='isFloat'
                                        />
                                    </div>

                                    <div className="col-md-1">
                                        <Input
                                            defaultValue={special_price}
                                            name='special_price'
                                            title="Спец. цена"
                                            validations='isLength:1'
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <Input
                                            defaultValue={terms}
                                            name='terms'
                                            note='Пример: “Продаётся 3-х комнатная, взамен нужна 2-х комнатная”'
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
                                                uniqueId={`houses-payment-for-${id}`}
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

                                                            title='Оплачено за воду'
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

                                                            title='Оплачено за канализацию'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Radio
                                                            checked={payment_for_electricity}
                                                            name='payment_for_electricity'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Оплачено за электричество'
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Radio
                                                            checked={payment_for_gas}
                                                            name='payment_for_gas'

                                                            options={[
                                                                {label: 'Не установлено', value: 0},
                                                                {label: 'Да'            , value: 1},
                                                                {label: 'Нет'           , value: 2}
                                                            ]}

                                                            title='Оплачено за газ'
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
                                            <div className="col-md-3">
                                                <Select
                                                    name='condition'
                                                    value={condition}
                                                    options={dictionaries.apt_condition_types}
                                                    passInt={true}
                                                    placeholder='Выберите состояние дома'
                                                    required={true}
                                                    title='Состояние'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Select
                                                    name='heating'
                                                    value={heating}
                                                    options={dictionaries.heating_types}
                                                    passInt={true}
                                                    placeholder='Выберите тип отопления'
                                                    required={true}
                                                    title='Отопление'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Select
                                                    name='bathroom'
                                                    value={bathroom}
                                                    options={dictionaries.bathroom_types}
                                                    passInt={true}
                                                    placeholder='Выберите тип санузла'
                                                    required={true}
                                                    title='Санузел'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Select
                                                    name='roof_type'
                                                    value={roof_type}
                                                    options={dictionaries.roof_types}
                                                    passInt={true}
                                                    placeholder='Выберите тип крыши'
                                                    title='Крыша'
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <Select
                                                    name='entrance_type'
                                                    value={entrance_type}
                                                    options={dictionaries.entrance_types}
                                                    passInt={true}
                                                    placeholder='Выберите тип въезда'
                                                    title='Въезд'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Select
                                                    name='land_location'
                                                    value={land_location}
                                                    options={dictionaries.placement}
                                                    passInt={true}
                                                    placeholder='Выберите расположение участка'
                                                    title='Расположение'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Select
                                                    name='hot_water'
                                                    value={hot_water}
                                                    options={dictionaries.hot_water}
                                                    passInt={true}
                                                    placeholder='Выберите тип нагрева воды'
                                                    title='Горячая вода'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Select
                                                    name='relief'
                                                    value={relief}
                                                    options={dictionaries.landform_types}
                                                    passInt={true}
                                                    placeholder='Выберите рельеф участка'
                                                    title='Рельеф участка'
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
                                                    defaultValue={owners_num}
                                                    name='owners_num'
                                                    title="Количество собственников"
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={underage_owners_num}
                                                    name='underage_owners_num'
                                                    title="Количество несовершеннолетних собственников"
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={house_location}
                                                    name='house_location'

                                                    note='Местонахождение домовладения (земельного участка) -
                                                        расстояние от города до дома или участка.
                                                        Если 0, то дом или участок в городе'

                                                    title="Расстояние от города"
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={roadway_width}
                                                    name='roadway_width'
                                                    title="Ширина проезжей части у въезда на участок (в метрах)"
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={ceiling_height}
                                                    name='ceiling_height'
                                                    title="Высота потолков"
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={distance_to_stations}
                                                    name='distance_to_stations'
                                                    title="Расстояние до остановок"
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Input
                                                    defaultValue={rooms}
                                                    name='rooms'
                                                    title="Количество комнат"
                                                    validations='isInt'
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <Radio
                                                    checked={wooden_windows}
                                                    name='wooden_windows'

                                                    options={[
                                                        {label: 'Не установлено', value: 0},
                                                        {label: 'Да'            , value: 1},
                                                        {label: 'Нет'           , value: 2}
                                                    ]}

                                                    title='Деревянные окна'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={metal_plast_windows}
                                                    name='metal_plast_windows'

                                                    options={[
                                                        {label: 'Не установлено', value: 0},
                                                        {label: 'Да'            , value: 1},
                                                        {label: 'Нет'           , value: 2}
                                                    ]}

                                                    title='Металлопластиковые окна'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={wooden_windows_eur}
                                                    name='wooden_windows_eur'

                                                    options={[
                                                        {label: 'Не установлено', value: 0},
                                                        {label: 'Да'            , value: 1},
                                                        {label: 'Нет'           , value: 2}
                                                    ]}

                                                    title='Деревянные евроокна'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={garage}
                                                    name='garage'

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
                                            <div className="col-md-3">
                                                <Radio
                                                    checked={surveying}
                                                    name='surveying'
                                                    title='Межевание'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={has_yard}
                                                    name='has_yard'

                                                    options={[
                                                        {label: 'Не установлено', value: 0},
                                                        {label: 'Да'            , value: 1},
                                                        {label: 'Нет'           , value: 2}
                                                    ]}

                                                    title='Наличие преддомовой территории'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={exit_to_pond}
                                                    name='exit_to_pond'
                                                    title='Выход к водоему'
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <Radio
                                                    checked={has_bathhouse}
                                                    name='has_bathhouse'
                                                    title='Баня'
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <Radio
                                                    checked={has_pool}
                                                    name='has_pool'
                                                    title='Бассейн'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <CollapsableBlock
                                            title='Инженерные системы дома'
                                            uniqueId={`house-utilities-houses-${id}`}
                                        >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={air_conditioning_system}
                                                        name='air_conditioning_system'
                                                        title='Система кондиционирования'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={access_control_system}
                                                        name='access_control_system'
                                                        title='Система контроля доступа'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={walkway_heating_system}
                                                        name='walkway_heating_system'
                                                        title='Система обогрева дорожек'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={comb_ventilation_system}
                                                        name='comb_ventilation_system'
                                                        title='Система приточно-вытяжной вентиляции'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={home_security_alarm}
                                                        name='home_security_alarm'
                                                        title='Охранная сигнализация'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={video_surv_system}
                                                        name='video_surv_system'
                                                        title='Система видеонаблюдения'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={voltage_stab_system}
                                                        name='voltage_stab_system'
                                                        title='Система стабилизации напряжения'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={automatic_watering_land}
                                                        name='automatic_watering_land'
                                                        title='Система автополива участка'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={land_security_alarm}
                                                        name='land_security_alarm'
                                                        title='Периметральная сигнализация участка'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={home_fire_alarm}
                                                        name='home_fire_alarm'
                                                        title='Пожарная сигнализация дома'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={backup_power_system}
                                                        name='backup_power_system'
                                                        title='Система резервного электроснабжения'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={water_purification_system}
                                                        name='water_purification_system'
                                                        title='Система очистки воды'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={central_dust_extraction_system}
                                                        name='central_dust_extraction_system'
                                                        title='Система центрального пылеудаления'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={local_street_cooling_system}
                                                        name='local_street_cooling_system'
                                                        title='Система локального охлаждения улицы'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={roof_heating_system}
                                                        name='roof_heating_system'
                                                        title='Система обогрева кровли'
                                                    />
                                                </div>
                                            </div>
                                        </CollapsableBlock>
                                    </div>

                                    <div className="col-md-12">
                                        <CollapsableBlock
                                            title='Коммуникации'
                                            uniqueId={`communic-houses-${id}`}
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
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <CollapsableBlock
                                            title='Инфраструктура'
                                            uniqueId={`infrastructure-houses-${id}`}
                                        >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={has_cafes}
                                                        name='has_cafes'
                                                        title='Бары и кафе'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={has_cinemas}
                                                        name='has_cinemas'
                                                        title='Кинотеатры'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={has_educational}
                                                        name='has_educational'
                                                        title='Образовательные учреждения'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={has_hospitals}
                                                        name='has_hospitals'
                                                        title='Больницы и диагностические центры'
                                                    />
                                                </div>
                                            </div>
                                        </CollapsableBlock>
                                    </div>

                                    <div className="col-md-12">
                                        <CollapsableBlock
                                            title='Благоустройство'
                                            uniqueId={`landscape-houses-${id}`}
                                        >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={has_paving}
                                                        name='has_paving'
                                                        title='Мощение'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={has_landscaping}
                                                        name='has_landscaping'
                                                        title='Ландшафтный дизайн'
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={has_garden}
                                                        name='has_garden'
                                                        title='Сад'
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Radio
                                                        checked={has_kitchen_garden}
                                                        name='has_kitchen_garden'
                                                        title='Огород'
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
        item       : state.property.houses.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        post        : bindActionCreators(post, dispatch),
        put         : bindActionCreators(put, dispatch),
        viewHouse   : bindActionCreators(viewHouse, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseEdit);
