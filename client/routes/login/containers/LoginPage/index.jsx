import React from 'react';
import fetch from 'isomorphic-fetch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import fetchLoginData from 'modules/login_page/actions/fetch.js';
import Modal from '../../components/Modal';
import setModal from 'modules/login_page/actions/set_modal.js';
import setUserData from 'modules/user/actions/set_user_data.js';
import config from 'modules/config.js';
import classNames from 'classnames';

class LoginPage extends React.Component {
    constructor(props){
        super();

        this.state = {
            user: "",
            pass: "",
            userError: false,
            passError: false,
            checkbox: false
        }

        this.handleChange = ::this.handleChange;
        this.handleChangePass = ::this.handleChangePass;
    }

    componentWillMount() {
        
    }
    
    handleChange(e) {
        this.setState({
            user: e.target.value,
            userError: false,
            passError: false
        });
    }

    handleChangePass(e) {
        this.setState({
            pass: e.target.value,
            userError: false,
            passError: false
        });
    }

    handleCheckbox = (e) => {
        if(this.state.checkbox == true){
            this.setState({
                checkbox: false
            })
        } else {
            this.setState({
                checkbox: true
            })
        }
    }

    handleEnter = (e) => {
        e.preventDefault();

        var this_ = this;
        
        var
            url = '/api/login',
            rememberValue = 0,
            params;

        if(this.state.checkbox == true){
            rememberValue = 1;
        } else {
            rememberValue = 0;
        }

        params = {
            email: this.state.user,
            password: this.state.pass,
            remember_me: rememberValue
        };

        fetch(url, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(params)
        }).then(function(response){
            return response.json()
        }).then(function(json){
            if(json.authorize == true){
                this_.props.setUserData(json);
                browserHistory.push('/');
            }
            if(json.error != undefined){
                this_.setState({
                    userError: true,
                    passError: true
                })
            }
        });
    }

    handleModal = (e) => {
    	e.preventDefault();
        this.props.setModal("enter");
    }

    handleModalReg = (e) => {
        e.preventDefault();
        this.props.setModal("register");
    }

    handleModalRemid = (e) => {
        e.preventDefault();
        this.props.setModal("remid");
    }

    render() {
        var 
            loginClass = classNames({
                "form-group": true,
                "has-error": this.state.userError == true
            }),
            passwordClass = classNames({
                "form-group": true,
                "has-error": this.state.passError == true
            }),
            formEnterClass = classNames({
                "form-horizontal": true,
                "form-bordered": true,
                "form-control-borderless": true,
                "display-none": this.props.modalData != "enter"
            }),
            formRemindClass = classNames({
                "form-horizontal": true,
                "form-bordered": true,
                "form-control-borderless": true,
                "display-none": this.props.modalData != "remid"
            })

        return (
            <div>


                <div id="login-background">
                    <img src="../../../../assets/images/headers/login_header.jpg" alt="Login Background" className="animation-pulseSlow"></img>
                </div>

                <div id="login-container" className="animation-fadeIn">
                    <div className="login-title text-center">
                        <h1><i className="gi gi-flash"></i> <strong>Company</strong><br></br><small>Пожалуйста, <strong>Войдите</strong> или <strong>Зарегистрируйтесь</strong></small></h1>
                    </div>

                    <div className="block push-bit">
                        <form action="index.html" method="post" id="form-login" className={formEnterClass}>
                            <div className={loginClass}>
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <input type="text" id="login-email" name="login-email" className="form-control input-lg" placeholder="Email" onChange={this.handleChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className={passwordClass}>
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-asterisk"></i></span>
                                        <input type="password" id="login-password" name="login-password" className="form-control input-lg" placeholder="Password" onChange={this.handleChangePass}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-actions">
                                <div className="col-xs-6">
                                    <label className="switch switch-primary switch-padding" data-toggle="tooltip" title="Remember Me?">
                                        <input type="checkbox" id="login-remember-me" name="login-remember-me" checked={this.state.checkbox} onChange={this.handleCheckbox}></input>
                                        <span></span>
                                    </label>
                                    Запомнить меня
                                </div>
                                <div className="col-xs-6 text-right">
                                    <button type="submit" className="btn btn-sm btn-primary" onClick={this.handleEnter}><i className="fa fa-angle-right"></i> Войти в панель управления</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12 text-center">
                                    <a href="" id="link-reminder-login"  onClick={this.handleModalRemid}><small>Забыли пароль?</small></a>&nbsp;-&nbsp;
                                    <a href="" id="link-register-login" onClick={this.handleModalReg}><small>Создать новый аккаунт</small></a>
                                </div>
                            </div>
                        </form>

                        <Modal width="600" />

                        <form action="login.html#reminder" method="post" id="form-reminder" className={formRemindClass}>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="gi gi-envelope"></i></span>
                                        <input type="text" id="reminder-email" name="reminder-email" className="form-control input-lg" placeholder="Email"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-actions">
                                <div className="col-xs-12 text-right">
                                    <button type="submit" className="btn btn-sm btn-primary"><i className="fa fa-angle-right"></i> Сбросить пароль</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12 text-center">
                                    <small>Did you remember your password?</small> <a href="#" onClick={this.handleModal} id="link-reminder"><small>Войти</small></a>
                                </div>
                            </div>
                        </form>

                    </div>

                    <footer className="text-muted text-center">
                        <small>&copy; Company 2017</small>
                    </footer>
                </div>
            </div>
        );
    }
}


LoginPage.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        loginData: state.login_page.data,
        modalData: state.login_page.modal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLoginData: bindActionCreators(fetchLoginData, dispatch),
        setModal      : bindActionCreators(setModal, dispatch),
        setUserData   : bindActionCreators(setUserData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
