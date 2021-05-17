//  Begin Date: 2020/05/24  Sun
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signInAct } from "../../../actions/authActs";

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email:      "",
            password:   "",
            errors:     {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    signIn = e => {
        e.preventDefault();
        var data = {
            email:      this.state.email,
            password:   this.state.password
        }        
        this.props.signInAct(data, this.props.history);
    }

    render() {
        return (
            <div className="main">
                <section className="page-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="font_Gulim">Login</h2>
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
                                            <h4 className="font_Gulim">Login</h4>
                                            <form>
                                                <div className="row">
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
                                                        <div className="col-md-3"></div>
                                                        <div className="col-md-3">
                                                            <Link className="btn btn-default w-100 font_Gulim col-xs-12" to="/">
                                                                <i className="icon icon-mail-reply" /> Back
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <button 
                                                                className="btn btn-primary col-xs-12 font_Gulim"
                                                                onClick={this.signIn}>
                                                                Login <i className="icon icon-sign-in" /> 
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

SignIn.propTypes = {
    signInAct:  PropTypes.func.isRequired,
}

var mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { signInAct })(SignIn);
