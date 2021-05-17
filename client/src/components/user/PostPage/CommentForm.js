//  Begin Date: 2020/05/26  Tue

import React, { Component } from "react";
// import PropTypes            from "prop-types";
// import { Link }             from "react-router-dom";
import { connect }          from "react-redux";

import { sendCommentAct } from "../../../actions/commentActs"
class CommentForm extends Component {
    constructor() {
        super();
        this.state = {
            content:    ""
        }
        this.sendComment = this.sendComment.bind(this);
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    sendComment() {
        var data = {
            content:    this.state.content,
            post:       this.props.postId,
            user:       this.props.userId
        }
        this.props.sendCommentAct(data);
    }
    render() {
        return (
            <div className="post-block post-leave-comment font_Gulim">
                <h3><i className="icon icon-pencil" />Give answer</h3>
                <div>
                    <div className="row">
                        <div className="form-group">
                            <div className="col-md-12">
                                <textarea 
                                    placeholder="Write answer here." 
                                    maxLength="5000" 
                                    rows="10" 
                                    className="form-control" 
                                    name="content" 
                                    value={this.state.content}
                                    onChange={this.onChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button 
                                className="btn btn-primary pull-right"
                                onClick={this.sendComment}
                            >Send <i className="icon icon-location-arrow" /></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

var mapStateToProps = state => ({});

export default connect(mapStateToProps, {sendCommentAct})(CommentForm);