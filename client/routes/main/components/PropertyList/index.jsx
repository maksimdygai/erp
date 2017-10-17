import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchAddressById from 'modules/property/address/address_by_id/actions/fetch.js';
import filter from 'modules/filter/actions/fetch.js';
import formatMoney from 'generic/helpers/format-money';
import findOrNone from 'generic/helpers/find-or-none';
import dictionaries from 'generic/dictionaries';

class PropertyList extends React.Component {
    constructor() {
        super();

        this.state = {
          addresses: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const
            items       = this.props.items,
            newItems    = nextProps.items,
            entity      = nextProps.entity,
            property    = entity && _.get(this.props.property, entity),
            newProperty = entity && _.get(nextProps.property, entity);

        if (!_.isEqual(items, newItems) && newItems) {
            let
                filterQuery = {
                    id: {
                       value   : [],
                       operator: '='
                    }
                }

            _.map(newItems, I => filterQuery.id.value.push(I.id));

            this.props.filter({
                entity: entity,
                query : filterQuery
            });
        }

        let
    			nextAddress = nextProps.address !== null ?
    						_.findIndex(this.state.addresses, x => {
    							return x.val == nextProps.address.suggestions[0].data.street_fias_id;
    						}) :
    						-1;

        if (!_.isEqual(property, newProperty)) {
            for (let i = 0; i < newProperty.length; ++i) {
                let
                    newAddresses = this.state.addresses;

                newAddresses.push({
                    id : newProperty[i].id,
                    val: newProperty[i].street_fias_id
                });

                this.setState({addresses: newAddresses});
                this.props.fetchAddressById(newProperty[i].street_fias_id);
            }
        } else if (nextAddress != -1) {
            let
                newAddresses = this.state.addresses;

            newAddresses[nextAddress].val = nextProps.address.suggestions[0].value;
            this.setState({addresses: newAddresses});
        }
    }

    render() {
        const
            addresses = this.state.addresses,
            entity    = this.props.entity,
            property  = entity && _.get(this.props.property, entity);

        return (
            <div className="list-group">
                {_.map(property, P => {
                    const
                        address = addresses.length > 0 ?
                                  _.find(addresses, x => x.id == P.id).val :
                                  null;

                    return (
                        <div className="list-group-item">
                            <h4 className="list-group-item-heading">
                                {address}
                            </h4>
                            <p className="list-group-item-text">
                                {`${findOrNone(dictionaries.districts, P.district)} ${P.price ? formatMoney(P.price) : ''}`}
                            </p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
      address : state.property.address.addressById.data,
      property: state.filter.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchAddressById: bindActionCreators(fetchAddressById, dispatch),
      filter          : bindActionCreators(filter, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
