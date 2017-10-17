import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map, TileLayer} from 'react-leaflet'
import Input from 'generic/components/Form/Input';
import CityAutocomplete from 'generic/components/Form/Fieldset/AddressFieldset/CityAutocomplete';
import HouseAutocomplete from 'generic/components/Form/Fieldset/AddressFieldset/HouseAutocomplete';
import StreetAutocomplete from 'generic/components/Form/Fieldset/AddressFieldset/StreetAutocomplete';
import fetchAddress from 'modules/property/address/address_by_id/actions/fetch.js';
import Select from 'generic/components/Form/Select';
import dictionaries from 'generic/dictionaries';

class AddressFieldset extends React.Component {
	constructor() {
		super();
		this.state = {data: {}};
	}

	static contextTypes = {
				errors           : PropTypes.object,
        passValueToParent: PropTypes.func.isRequired
    }

		componentWillReceiveProps(nextProps) {
			let
				data           = this.state.data,
				newData        = nextProps.data,
				passedData     = this.props.data;

			if (nextProps.data &&
					(this.props.address == null ||
						this.props.address.suggestions[0].data.street_fias_id != nextProps.data.street_fias_id)) {
							this.props.fetchAddress(nextProps.data.street_fias_id);
						}

			if(!_.isEqual(newData, passedData)) this.setState({data: Object.assign(data, newData)})
		}

	handlePassedValue = (name, value) => {
				const
					hierarchy = ['city_fias_id', 'district', 'street_fias_id', 'house_fias_id', 'house_number'];
        let
        	newValue = value && value.value,
            {data} = this.state,
            {geo_lat, geo_lon, zoom} = value || {};

				if (name != 'house_fias_id' ||
						name != 'house_number') {
					for (let i = _.indexOf(hierarchy, name) + 1; i < hierarchy.length; ++i) {
						data[hierarchy[i]] = null;
						this.context.passValueToParent(data[hierarchy[i]], null);
					}
				}

        data[name] = newValue;
        this.context.passValueToParent(name, newValue)

        if(geo_lat && geo_lon && zoom) {
        	this.setState({
	    		data   : data,
	    		geo_lat: geo_lat,
	    		geo_lon: geo_lon,
	    		zoom   : zoom
	        });
        } else {
        	this.setState({data: data});
        }
    }

	render() {
		const
			{
				data,
				geo_lat = this.props.address ? this.props.address.suggestions[0].data.geo_lat : 48.1129,
				geo_lon = this.props.address ? this.props.address.suggestions[0].data.geo_lon : 41.7041,
				zoom = this.props.address ? 14 : 6
			} = this.state,

			formData = this.props.data || {},
			isApartment = (this.props.entity === 'apartments_sell' || this.props.entity === 'apartments_rent'),

			city = this.props.address &&
				this.props.address.suggestions[0].data.city_fias_id == formData.city_fias_id ?

				{
						label  : this.props.address.suggestions[0].data.city,
						value  : this.props.address.suggestions[0].data.city_fias_id,
						geo_lat: geo_lat,
						geo_lon: geo_lon
				} :

				undefined,

			street = this.props.address &&
				this.props.address.suggestions[0].data.street_fias_id == formData.street_fias_id ?

				{
						label  : this.props.address.suggestions[0].data.street,
						value  : this.props.address.suggestions[0].data.street_fias_id,
						geo_lat: geo_lat,
						geo_lon: geo_lon
				} :

				undefined,

			house = formData ? {
					label: formData.house_number,
					value: formData.house_fias_id,
					geo_lat: geo_lat,
					geo_lon: geo_lon
				} :

				undefined;

		return (
			<fieldset>
				<legend>Адрес</legend>

				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<div className="row">
								<div className="col-md-5">
									<CityAutocomplete
										defaultErrorMessage='Это обязательное поле'
										errors={this.context.errors}
										name='city_fias_id'
										defaultValue={city}
										passValueToParent={this.handlePassedValue}
										placeholder='Выберите город'
										required={true}
										title='Город'
									/>
								</div>

								<div className="col-md-7">
									<StreetAutocomplete
										defaultErrorMessage='Это обязательное поле'
										cityId={data.city_fias_id}
										disabled={!data.city_fias_id}
										errors={this.context.errors}
										name='street_fias_id'
										defaultValue={street}
										passValueToParent={this.handlePassedValue}
										placeholder='Выберите улицу'
										required={true}
										title='Улица'
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-md-5">
									<Select
										defaultErrorMessage='Это обязательное поле'
										disabled={!data.city_fias_id ||
											!dictionaries.districts[data.city_fias_id]}
										errors={this.context.errors}
										name='district'
										value={data.district}
										options={dictionaries.districts[data.city_fias_id] || []}
										passInt={true}
										placeholder='Выберите район'
										required={true}
										title='Район'
									/>
								</div>

								<div className="col-md-3">
									<HouseAutocomplete
										defaultErrorMessage='Это обязательное поле'
										streetId={data.street_fias_id}
										disabled={!data.street_fias_id}
										errors={this.context.errors}
										name='house_fias_id'
										defaultValue={house}
										passValueToParent={this.handlePassedValue}
										placeholder='Выберите дом'
										required={true}
										title='Дом'
									/>
								</div>

								<div className="col-md-2">
									{isApartment && <Input
										defaultValue={formData.block}
										name='block'
										title="Корпус"
									/>}
								</div>

								<div className="col-md-2">
									{isApartment && <Input
										defaultValue={formData.apartment}
										errors={this.context.errors}
										name='apartment'
										required={true}
										title="Квартира"
										validations='isLength:1'
									/>}
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<Map
								center={[parseFloat(geo_lat), parseFloat(geo_lon)]}
								style={{height: '170px', width: '100%'}}
								zoom={zoom}
							>
								<TileLayer
									url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
								/>
							</Map>
						</div>
					</div>
				</div>
			</fieldset>
		)
	}
}

export default connect(
	state => ({address: state.property.address.addressById.data}),
	dispatch => ({fetchAddress: bindActionCreators(fetchAddress, dispatch)})
)(AddressFieldset);
