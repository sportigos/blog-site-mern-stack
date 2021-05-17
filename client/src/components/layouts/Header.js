//  Begin Date: 2020/05/21  Thu
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOutAct } from "../../actions/authActs";

class Header extends Component {
	constructor() {
		super();
		this.signOut = this.signOut.bind(this);
	}
	signOut(e) {
		e.preventDefault();
        this.props.signOutAct();
	}
    render() {
		const { isAuthenticated } = this.props.auth;
		var beforeAuth = (
			<ul className="nav nav-pills nav-top">
				<li>
					<Link to="/signIn" className="font_Gulim">
						<i className="icon icon-user"></i>Login
					</Link>
				</li>
				<li>
					<Link to="/signUp" className="font_Gulim">
						<i className="icon icon-plus-circle"></i>Register
					</Link>
				</li>
				<li className="phone">
					<span><i className="icon icon-phone"></i>(123) 456-7890</span>
				</li>
			</ul>
		);
		var afterAuth = (
			<ul className="nav nav-pills nav-top">
				<li>
					<Link to="/editUser">
						<i className="icon icon-user" /> {this.props.auth.user.name}Guest
					</Link>
				</li>
				<li>
					<Link to="/" onClick={this.signOut} className="font_Gulim">
						<i className="icon icon-sign-out"></i> Logout
					</Link>
				</li>
				<li className="phone">
					<span><i className="icon icon-phone"></i>(123) 456-7890</span>
				</li>
			</ul>
		);
        return (
            <header>
				<div className="container">
					<h1 className="logo">
						<Link to="/">
							<img alt="Porto" width="111" height="54" data-sticky-width="82" data-sticky-height="40" src="img/logo.png" />
						</Link>
					</h1>
					<div className="search">
						<form id="searchForm" action="page-search-results.html" method="get">
							<div className="input-group">
								<input type="text" className="form-control search" name="q" id="q" placeholder="Search..." />
								<span className="input-group-btn">
									<button className="btn btn-default" type="submit"><i className="icon icon-search"></i></button>
								</span>
							</div>
						</form>
					</div>
					<nav>
						{ isAuthenticated===true ? afterAuth : beforeAuth }
					</nav>
					<button className="btn btn-responsive-nav btn-inverse" data-toggle="collapse" data-target=".nav-main-collapse">
						<i className="icon icon-bars"></i>
					</button>
				</div>
				<div className="navbar-collapse nav-main-collapse collapse">
					<div className="container">
						<div className="social-icons">
							<ul className="social-icons">
								<li className="facebook"><a href="http://www.facebook.com/" title="Facebook">Facebook</a></li>
								<li className="twitter"><a href="http://www.twitter.com/" title="Twitter">Twitter</a></li>
								<li className="linkedin"><a href="http://www.linkedin.com/" title="Linkedin">Linkedin</a></li>
							</ul>
						</div>
						<nav className="nav-main mega-menu font_Gulim">
							<ul className="nav nav-pills nav-main" id="mainMenu">
								<li className="active">
                                    <Link to="/">First page</Link>
                                </li>
                                <li><Link to="/createPost">Article</Link></li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
        );
    }
}

var mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {signOutAct})(Header);
