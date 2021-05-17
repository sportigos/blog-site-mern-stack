//  Begin Date: 2020/05/26  Tue
import React, { Component } from "react";
// import PropTypes            from "prop-types";
// import { Link }             from "react-router-dom";
import { connect }          from "react-redux";

import { 
    sendCommentAct,
    setCommentLikerAct,
    setCommentDislikerAct
} from "../../../actions/commentActs";
class CommentItem extends Component {
    constructor() {
        super();
        this.state = {
            content:    "",
            space:      { "marginLeft": 0+"em" }
        }
        this.setCommentLiker = this.setCommentLiker.bind(this);
        this.setCommentDisliker = this.setCommentDisliker.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }
    componentWillMount() {
        this.setState({ space: { "marginLeft": this.props.commentItem.ancestors.length*8+"em" } })
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.comment.commentSearchFlag) {
            if(nextProps.comment.commentSearchFlag === 1) {
                this.setState({ space: { "marginLeft": 0+"em" } });
            } else {
                this.setState({ space: { "marginLeft": this.props.commentItem.ancestors.length*8+"em" } })
            }
        }
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    async setCommentLiker() {
        var data = {
            _id:    this.props.commentItem._id,
            liker:  this.props.auth.user.id,
            post:   this.props.postId
        }
        await this.props.setCommentLikerAct(data);
    }
    async setCommentDisliker() {
        var data = {
            _id:        this.props.commentItem._id,
            disliker:   this.props.auth.user.id,
            post:       this.props.postId
        }
        await this.props.setCommentDislikerAct(data);
    }
    sendComment() {
        var data = {
            content:    this.state.content,
            parent:     this.props.commentItem._id,
            post:       this.props.postId,
            user:       this.props.auth.user.id
        }
        this.props.sendCommentAct(data);
    }
    render() {
        var voteButtons = 
            <span>
                <button 
                    className="btn btn-info mt_1em" 
                    onClick={this.setCommentLiker}
                    disabled={
                        this.props.commentItem.likers ?  
                        this.props.commentItem.likers.find(liker => liker._id === this.props.auth.user.id) ? 
                        true : false : false 
                    }>
                    <i className="icon icon-thumbs-up"></i>
                </button>
                <button 
                    className="btn btn-danger mt_1em"
                    onClick={this.setCommentDisliker}
                    disabled={
                        this.props.commentItem.dislikers ?  
                        this.props.commentItem.dislikers.find(disliker => disliker._id === this.props.auth.user.id) ? 
                        true : false : false 
                    }>
                    <i className="icon icon-thumbs-down"></i>
                </button>
            </span>;
        var reply = 
            <span>
                <a 
                    data-toggle="modal" 
                    data-target={"#"+this.props.commentItem._id}
                    className="cursor_pointer"
                ><i className="icon icon-reply"></i> Anser</a>
                {/* Modal */}
                <div 
                    id={this.props.commentItem._id} 
                    className="modal fade" 
                    role="dialog"
                >
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button 
                                    type="button" 
                                    className="close" 
                                    data-dismiss="modal"
                                >&times;</button>
                                <h4 className="modal-title ff_Gulim">
                                    <b>{this.props.commentItem.user.name}Anser to guest's answer</b>
                                </h4>
                            </div>

                            <div className="modal-body">
                                <textarea 
                                    placeholder="Write answer here." 
                                    maxLength="5000" 
                                    rows="10" 
                                    className="form-control" 
                                    name="content" 
                                    value={ this.state.content }
                                    onChange={ this.onChange }
                                ></textarea>
                            </div>

                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-default ff_Gulim" 
                                    data-dismiss="modal"
                                ><i className="icon icon-ban mr_1em" />Cancel</button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary ff_Gulim" 
                                    data-dismiss="modal"
                                    onClick={ this.sendComment }
                                ><i className="icon icon-location-arrow mr_1em" />Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </span>;
        var originDate = this.props.commentItem.createdAt.slice(0, 16);
        return (
            <li style={this.state.space}>
                <div className="img-thumbnail">
                    <img className="avatar" src="../img/empty_avatar.png" alt="" />
                </div>
                <div className="comment-block">
                    <div className="comment-arrow"></div>
                    <span className="comment-by">
                        <strong>{this.props.commentItem.user.name}</strong>
                        <span className="pull-right">
                            {
                                this.props.commentItem.user && this.props.auth.isAuthenticated===true ?
                                this.props.auth.user.id !== this.props.commentItem.user._id  ? 
                                reply : "" : ""
                            }
                        </span>
                    </span>
                    <p>{ this.props.commentItem.content }</p>
                    {
                        this.props.commentItem.user && this.props.auth.isAuthenticated===true ?
                        this.props.auth.user.id !== this.props.commentItem.user._id  ? 
                        voteButtons : "" : ""
                    }
                    <span className="pull-right">
                        <span className="pull-right mr_1em">
                            <i className="icon icon-thumbs-down"></i>: 
                            { this.props.commentItem.dislikers.length }
                        </span>
                        <span className="pull-right mr_1em">
                            <i className="icon icon-thumbs-up"></i>: 
                            { this.props.commentItem.likers.length }
                        </span>
                    </span>
                    <span className="date pull-right mr_1em">
                        { originDate.split("T")[0] } { originDate.split("T")[1] }
                    </span>
                </div>
            </li>
        )
    }
}

var mapStateToProps = state => ({
    auth:       state.auth,
    comment:    state.comment
});

export default connect(
    mapStateToProps, 
    { 
        sendCommentAct,
        setCommentLikerAct,
        setCommentDislikerAct
    }
)(CommentItem);