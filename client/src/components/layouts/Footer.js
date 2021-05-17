//  Begin Date: 2020/05/21  Thu
import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <footer id="footer">
                <div className="container">
                    <div className="row">
                        <div className="footer-ribon">
                            <span className="font_Gulim">Contact</span>
                        </div>
                        <div className="col-md-3">
                            <div className="newsletter font_Gulim">
                                <h4>Opinion</h4>
                                <p>We'd appreciate opinions for our site.</p>

                                <div className="alert alert-success hidden" id="newsletterSuccess">
                                    <strong>Sent!</strong>We accept your opinon.
                                </div>

                                <div className="alert alert-danger hidden" id="newsletterError"></div>

                                <form>
                                    <div className="input-group">
                                        <input 
                                            className="form-control" 
                                            placeholder="Input your opinion." 
                                            type="text"
                                        />
                                        <span className="input-group-btn">
                                            <button 
                                                className="btn btn-default" 
                                                type="submit"
                                            >Send</button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-3 font_Gulim">
                            <h4>Recent opinions</h4>
                            <div id="tweet" className="twitter" data-account-id="">
                                <p>Wait a minute.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contact-details">
                                <h4 className="font_Gulim">Contact info</h4>
                                <ul className="contact">
                                    <li>
                                        <p className="font_Gulim">
                                            <i className="icon icon-map-marker"></i> 
                                            <strong>Address:</strong> sportigo1120@gmail.com
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <i className="icon icon-phone"></i> 
                                            <strong className="font_Gulim">Phone:</strong> (123) 456-7890
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <i className="icon icon-envelope"></i> 
                                            <strong className="font_Gulim">Email:</strong> 
                                            <a href="mailto:mail@example.com">fog@steel.com</a>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 font_Gulim">
                            <h4>Other sites</h4>
                            <div className="social-icons">
                                <ul className="social-icons">
                                    <li className="facebook"><a href="http://www.facebook.com/" data-placement="bottom" rel="tooltip" title="Facebook">Facebook</a></li>
                                    <li className="twitter"><a href="http://www.twitter.com/" data-placement="bottom" rel="tooltip" title="Twitter">Twitter</a></li>
                                    <li className="linkedin"><a href="http://www.linkedin.com/" data-placement="bottom" rel="tooltip" title="Linkedin">Linkedin</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1">
                                <a href="index.html" className="logo">
                                    <img alt="Porto Website Template" className="img-responsive" src="img/logo-footer.png" />
                                </a>
                            </div>
                            <div className="col-md-7">
                                <p>© Chatting.</p>
                            </div>
                            <div className="col-md-4">
                                <nav id="sub-menu">
                                    <ul>
                                        <li><a href="page-faq.html">FAQ's</a></li>
                                        <li><a href="sitemap.html">Sitemap</a></li>
                                        <li><a href="contact-us.html">Contact</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;