import React from 'react';
import fetch from 'isomorphic-fetch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchLoginData from 'modules/login_page/actions/fetch.js';
import setModal from 'modules/login_page/actions/set_modal.js';
import classNames from 'classnames/bind';
import styles from './styles.css';

const
    cx = classNames.bind(styles);

class Modal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            selected:{
                middle_name: "",
                first_name: "",
                last_name: "",
                email: "",
                birthday: "",
                internal_phone: "",
                mobile_phone: "",
                home_phone: "",
                podrazdel: "",
                office: "",
                otdel: "",
                dolznost: "",
                category: "",
                part: "",
                password: "",
                passwordConfim: ""
            }
        }

    }
    
    handleChange = (e, name) => {
        var newState = Object.assign({}, this.state);
        newState.selected[name] = e.target.value;
        this.setState(newState);
    }
    
    handleChangeSelect = (e, name) => {
        var newState = Object.assign({}, this.state);
        newState.selected[name] = e.target.value;
        this.setState(newState);
    }
    
    handleOk = (e) => {
        e.preventDefault();
        fetch('/api/adduser',{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.selected)
        })
    }

    handleModal = (e) => {
        e.preventDefault;
        this.props.setModal("enter");
    }
    
    render() {
        var formRegClass = classNames({
                "form-horizontal": true,
                "form-bordered": true,
                "form-control-borderless": true,
                "display-none": this.props.modalData != "register"
            })
        return (
            <div>
                <form action="login.html#register" method="post" id="form-register" className={formRegClass}>
                            <div className="form-group">
                                <div className="col-xs-6">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-user"></i></span>
                                        <input type="text" id="register-firstname" name="register-firstname" className="form-control input-lg" value={this.state.selected.first_name} onChange={(e) => this.handleChange(e, "first_name")} placeholder="Имя"></input>
                                    </div>
                                </div>
                                <div className="col-xs-6">
                                    <input type="text" id="register-lastname" name="register-lastname" className="form-control input-lg" value={this.state.selected.last_name} onChange={(e) => this.handleChange(e, "last_name")} placeholder="Фамилия"></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <input type="text" id="register-email" name="register-surname" className="form-control input-lg" value={this.state.selected.middle_name} onChange={(e) => this.handleChange(e, "middle_name")} placeholder="Отчество"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <input type="text" id="register-email" name="register-email" className="form-control input-lg" value={this.state.selected.email} onChange={(e) => this.handleChange(e, "email")} placeholder="Email"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <input type="text" id="register-date" name="register-surname" className="form-control input-lg" value={this.state.selected.birthday} onChange={(e) => this.handleChange(e, "birthday")} placeholder="Дата рождения"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <input type="text" id="register-phoneinside" name="register-surname" className="form-control input-lg" value={this.state.selected.internal_phone} onChange={(e) => this.handleChange(e, "internal_phone")} placeholder="Телефон(внутр)"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <input type="text" id="register-phone" name="register-surname" className="form-control input-lg" value={this.state.selected.mobile_phone} onChange={(e) => this.handleChange(e, "mobile_phone")} placeholder="Телефон(сот)"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <select className="form-control" value={this.state.selected.podrazdel} onChange={(e) => this.handleChangeSelect(e, "podrazdel")}>
                                            <option>(Подразделение)</option>
                                            <option>Test</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <select className="form-control" value={this.state.selected.office} onChange={(e) => this.handleChangeSelect(e, "office")}>
                                            <option>(Офис)</option>
                                            <option>Test</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <select className="form-control" value={this.state.selected.otdel} onChange={(e) => this.handleChangeSelect(e, "otdel")}>
                                            <option>(Отдел)</option>
                                            <option>Test</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <select className="form-control" value={this.state.selected.dolznost} onChange={(e) => this.handleChangeSelect(e, "dolznost")}>
                                            <option>(Должность)</option>
                                            <option>Test</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <select className="form-control" value={this.state.selected.category} onChange={(e) => this.handleChangeSelect(e, "category")}>
                                            <option>(Категория)</option>
                                            <option>Test</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <select className="form-control" value={this.state.selected.part} onChange={(e) => this.handleChangeSelect(e, "part")}>
                                            <option>(Роль)</option>
                                            <option>Test</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-asterisk"></i></span>
                                        <input type="password" id="register-password" name="register-password" className="form-control input-lg" value={this.state.selected.password} onChange={(e) => this.handleChange(e, "password")} placeholder="Пароль"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-asterisk"></i></span>
                                        <input type="password" id="register-password-verify" name="register-password-verify" className="form-control input-lg" value={this.state.selected.passwordConfim} onChange={(e) => this.handleChange(e, "passwordConfim")} placeholder="Подтверждение пароля"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-actions">
                                <div className="col-xs-6">
                                    <a href="#modal-terms" data-toggle="modal" className="register-terms">Terms</a>
                                    <label className="switch switch-primary" data-toggle="tooltip" title="Agree to the terms">
                                        <input type="checkbox" id="register-terms" name="register-terms"></input>
                                        <span></span>
                                    </label>
                                </div>
                                <div className="col-xs-6 text-right">
                                    <button type="submit" className="btn btn-sm btn-success" onClick={this.handleOk}><i className="fa fa-plus"></i> Зарегистрироваться</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12 text-center">
                                    <small>У вас уже есть аккаунт?</small> <a href="#" onClick={this.handleModal} id="link-register"><small>Войти</small></a>
                                </div>
                            </div>
                        </form>
            </div>
        );
    }
}

Modal.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        modalData: state.login_page.modal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setModal: bindActionCreators(setModal, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);