//  Begin Date: 2020/05/28  Thu

import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

// import { getAllTagsAct } from "../../../actions/tagActs";

class TabBox extends Component {
    // async componentWillMount() {
    //     await this.props.getAllTagsAct();
    // }
    render() {
        return (
            <div className="tabs">
                <ul className="nav nav-tabs">
                    <li className="active">
                        <a href="#popularPosts" data-toggle="tab">
                            <i className="icon icon-star" /> Favourite
                        </a>
                    </li>
                    <li>
                        <a href="#tags" data-toggle="tab">
                            <i className="icon icon-tag" /> Tag
                        </a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane active" id="popularPosts">

                    </div>
                    <div className="tab-pane" id="tags">

                    </div>
                </div>
            </div>
        );
    }
}

var mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    {

    }
)(TabBox);