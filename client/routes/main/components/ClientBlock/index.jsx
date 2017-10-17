import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import viewClient from 'modules/clients/actions/view';
import putClient from 'modules/clients/actions/put';
import getName from 'generic/helpers/get-name';
import orNone from 'generic/helpers/or-none';

class ClientBlock extends React.Component {
  constructor() {
    super();

    this.state = {
      data        : {},
      editingField: null,
      isValid     : true
    };
  }

  componentWillMount() {
    const
      id = this.props.clientId;

    if (id) {
      const
        client = _.find(this.props.data, C => C.id == id);

      if (client)
        this.setState({data: client});
      else
        this.props.viewClient(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const
      clientId = this.props.clientId,
      newClientId = nextProps.clientId,
      data = this.state.data,
      newData = _.find(nextProps.data, C => C.id == clientId);

    if (clientId != newClientId) {
      this.props.viewClient(newClientId);
    }
    if (newData && !_.isEqual(data, newData)) {
      this.setState({data: newData});
    }
  }

  editField(e, name) {
    if (this.state.isValid)
      this.setState({editingField: name});
  }

  getInput(name) {
    return (
      <div className="col-md-10">
        <div className={`form-group ${this.state.isValid ? '' : 'has-error'}`}>
            <div className="input-group">
              <input
                type='text'
                className="form-control"
                autoFocus={true}
                defaultValue={name == 'name' ? getName(this.state.data) : this.state.data[name]}
                onBlur={e => this.putChanges(e, name)}
                ref={(input) => {this.field = input;}}
              />

              <span className="input-group-addon" onClick={e => this.cancelEdit(e)}>
                <i className="fa fa-times"></i>
              </span>
            </div>

            {!this.state.isValid &&
              <span className="help-block">
                Некорректный ввод
              </span>
            }
          </div>
        </div>
    );
  }

  cancelEdit(e) {
    this.setState({
      editingField: null,
      isValid     : true
    })
  }

  validate(name, value) {
    let
      re;
    switch (name) {
      case "name":
        const
          names = value.split(' ');

        if (names.length == 2) {
          return {
            first_name: names[0],
            last_name : names[1]
          };
        } else {
          return false;
        }
        break;
      case "email":
        re = /^\w+@\w+\.\w{2,3}$/i;

        if (re.exec(value))
          return {[name]: value};
        else
          return false;

        break;
      case "mobile_phone":
      case "work_phone":
        re = /\+\d{1}\s\d{3}\s\d{3}\-\d{2}\-\d{2}/i;

        if (re.exec(value))
          return {[name]: value};
        else
          return false;
        break;
      default:
        return false;
    }
  }

  putChanges(e, name) {
    let
      data = this.state.data,
      value = this.field.value;

    value = this.validate(name, value);

    if (value) {
      data = Object.assign({}, data, value);
      this.props.putClient(data, true);

      this.setState({
        data: data,
        editingField: null,
        isValid: true
      });
    }
    else {
      this.setState({isValid: false});
    }
  }

  render() {
    const
      {
        editingField,
        data
      } = this.state;

    if (data == {})
      return null;

    return (
      <div className="col-lg-12">
        <div className="block">
          <div className="block-title">
            {editingField == 'name' ?
              this.getInput('name') :
              <h2 onClick={e => this.editField(e, 'name')}>{getName(data)}</h2>}

            <div className="block-options pull-right">
                <Link to={`/clients/${data.id}`} className="btn btn-default btn-alt btn-sm">
                    <i className="fa fa-search"></i>
                </Link>
            </div>
          </div>

          <table className="table table-borderless table-striped">
            <tbody>
              <tr>
                <td style={{width: '40%'}}><strong>Email</strong></td>
                <td>
                  {editingField == 'email' ?
                  this.getInput('email') :
                  <div onClick={e => this.editField(e, 'email')}>{data.email}</div>}
                </td>
              </tr>

              <tr>
                <td style={{width: '40%'}}><strong>Мобильный</strong></td>
                <td>
                  {editingField == 'mobile_phone' ?
                  this.getInput('mobile_phone') :
                  <div onClick={e => this.editField(e, 'mobile_phone')}>{data.mobile_phone}</div>}
                </td>
              </tr>

              <tr>
                <td style={{width: '40%'}}><strong>Рабочий телефон</strong></td>
                <td>
                  {editingField == 'work_phone' ?
                  this.getInput('work_phone') :
                  <div onClick={e => this.editField(e, 'work_phone')}>{data.work_phone}</div>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.clients.view
  };
}

function mapDispatchToProps(dispatch) {
  return {
    viewClient: bindActionCreators(viewClient, dispatch),
    putClient : bindActionCreators(putClient, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientBlock);
