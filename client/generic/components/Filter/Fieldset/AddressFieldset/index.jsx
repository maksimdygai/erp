import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Input from 'generic/components/Form/Input';
import CityMulticomplete from 'generic/components/Filter/Fieldset/AddressFieldset/CityMulticomplete';
import StreetMulticomplete from 'generic/components/Filter/Fieldset/AddressFieldset/StreetMulticomplete';
import FilterMulticomplete from 'generic/components/Filter/FilterMulticomplete';
import FilterInput from 'generic/components/Filter/FilterInput';
import dictionaries from 'generic/dictionaries';

class AddressFieldset extends React.Component {
	constructor() {
		super();
		this.state = {data: {}};
	}

	handlePassedValue = (name, value) => {
		let
			{data} = this.state;

		data[name] = value;
		this.setState({data: data});
	}

	render() {
		const
			{data} = this.state,
			isApartment = (this.props.entity === 'apartments_sell' || this.props.entity === 'apartments_rent');

		return (
			<div className="row">
				<fieldset>
					<legend>Адрес</legend>

					<div className="col-md-4">
						<CityMulticomplete
							name='city_fias_id'
							passToParent={this.handlePassedValue}
							title='Город'
						/>
					</div>

					<div className="col-md-4">
						<FilterMulticomplete
							disabled={_.isUndefined(data.city_fias_id) || 
								_.isUndefined(dictionaries.districts[data.city_fias_id])
							}

							name='district'
							data={dictionaries.districts[data.city_fias_id] || []}
							title='Район'
						/>
					</div>

					<div className="col-md-4">
						<StreetMulticomplete
							cityId={data.city_fias_id}
							disabled={_.isUndefined(data.city_fias_id)}
							name='street_fias_id'
							passToParent={this.handlePassedValue}
							title='Улица'
						/>
					</div>
				</fieldset>
			</div>
		)
	}
}

export default AddressFieldset;
