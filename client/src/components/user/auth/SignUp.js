//  Begin Date: 2020/05/23  Sat
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signUpAct } from "../../../actions/authActs";
class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            name:           "",
            email:          "",
            password:       "",
            passwordConf:   "",
            errors:         {}
        }
        // this.signUp = this.signUp.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    signUp = e => {
        e.preventDefault();
        var data = {
            name:           this.state.name,
            email:          this.state.email,
            password:       this.state.password,
            passwordConf:   this.state.passwordConf
        }
        this.props.signUpAct(data, this.props.history);
    }
    render() {
        return (
            <div className="main">
                <section className="page-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="font_Gulim">Register</h2>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row featured-boxes login">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="featured-box featured-box-secundary default info-content">
                                        <div className="box-content">
                                            <h4 className="font_Gulim">Register</h4>
                                            <form>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col-md-12">
                                                            <label className="font_Gulim">
                                                                Name(*)
                                                            </label>
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChange}/>
                                                            { this.state.errors.name ? <p className="alert alert-danger font_Gulim">{this.state.errors.name}</p> : "" }
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="col-md-12">
                                                            <label className="font_Gulim">
                                                                Email(*)
                                                            </label>
                                                            <input 
                                                                type="text" 
                                                                className="form-control"
                                                                name="email" 
                                                                placeholder="Ex: sin@gmail.com"
                                                                value={this.state.email}
                                                                onChange={this.onChange}/>
                                                            { this.state.errors.email ? <p className="alert alert-danger font_Gulim">{this.state.errors.email}</p> : "" }
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="col-md-12">
                                                            <label className="font_Gulim">
                                                                Password(*)
                                                            </label>
                                                            <input 
                                                                type="password" 
                                                                className="form-control" 
                                                                name="password"
                                                                value={this.state.password}
                                                                onChange={this.onChange}/>
                                                            { this.state.errors.password ? <p className="alert alert-danger font_Gulim">{this.state.errors.password}</p> : "" }
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="col-md-12">
                                                            <label className="font_Gulim">
                                                                Confirm(*)
                                                            </label>
                                                            <input  
                                                                type="password" 
                                                                className="form-control" 
                                                                name="passwordConf"
                                                                value={this.state.passwordConf}
                                                                onChange={this.onChange} />
                                                            { this.state.errors.passwordConf ? <p className="alert alert-danger font_Gulim">{this.state.errors.passwordConf}</p> : "" }
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="col-md-3"></div>
                                                        <div className="col-md-3">
                                                            <Link className="btn btn-default w-100 font_Gulim col-xs-12" to="/">
                                                                <i className="icon icon-mail-reply" /> Back
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <button 
                                                                className="btn btn-primary col-xs-12 font_Gulim"
                                                                onClick={this.signUp}>
                                                                <i className="icon icon-check" /> Save
                                                            </button>
                                                        </div>
                                                        <div className="col-md-3"></div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SignUp.propTypes = {
    signUpAct:  PropTypes.func.isRequired,
}

var mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { signUpAct })(SignUp);