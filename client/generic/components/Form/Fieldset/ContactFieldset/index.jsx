import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ContactField from 'generic/components/Form/ContactField';
import ContactPicker from 'generic/components/Form/Fieldset/ContactFieldset/ClientPicker';
import Select from 'generic/components/Form/Select';
import Radio from 'generic/components/Form/Radio';
import fetchUsers from 'modules/users/actions/fetch.js';
import fetchSources from 'modules/property/sources/actions/fetch.js';
import getName from 'generic/helpers/get-name';
import findCheck from 'generic/helpers/find-check';
import dictionaries from 'generic/dictionaries';

class ContactFieldset extends React.Component {
  constructor() {
    super();
    this.state = {data   : {}};
  }

  static contextTypes = {
    passValueToParent: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchSources();
  }

  handlePassedValue = (name, value) => {
    let
      {data} = this.state;

    data[name] = value;
    this.context.passValueToParent(name, value);

    this.setState({data: data});
  }

  render() {
    const
      {data} = this.state,
      {users, sources} = this.props,
      formData = this.props.data || {};

    return (
      <fieldset>
        <legend>Контакты</legend>

        <div className="container-fluid">
          <ContactPicker
            name='contacts'
            data={formData.contacts}
          />

          <div className="row">
            <div className="col-md-2">
              <ContactField
                name='agent'
                required={true}
                title="Менеджер"
                value={getName(findCheck(users, formData.agent))}
              />
            </div>

            <div className="col-md-2">
              <Select
                name='moderation_status'
                value={formData.moderation_status}
                options={dictionaries.moderation_status_types}
                passInt={true}
                placeholder='Укажите статус модерации'
                title='Статус модерации'
              />
            </div>

            <div className="col-md-2">
              {!_.isNull(sources) && <Select
                name='source'
                value={formData.source ? formData.source.id : null}
                options={sources}
                placeholder='Выберите источник информации'
                required={true}
                title='Источник'
              />}
            </div>

            <div className="col-md-2">
              <Radio
                checked={formData.exclusive}
                name='exclusive'
                options={dictionaries.defaultRadioOptions}
                title='Эксклюзивность'
              />
            </div>

            <div className="col-md-2">
              <Radio
                checked={formData.open_sale}
                name='open_sale'
                options={dictionaries.defaultRadioOptions}
                title='Открытая продажа'
              />
            </div>

            <div className="col-md-2">
              <Radio
                checked={formData.from_firm}
                name='from_firm'
                options={dictionaries.defaultRadioOptions}
                title='Информация от организации'
              />
            </div>
          </div>
        </div>
      </fieldset>
    )
  }
}

function mapStateToProps(state) {
  return {
    users  : state.users.data,
    sources: state.property.sources.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers  : bindActionCreators(fetchUsers, dispatch),
    fetchSources: bindActionCreators(fetchSources, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactFieldset);
