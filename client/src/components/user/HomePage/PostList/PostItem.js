//  Begin Date: 2020/05/26  Tue

import React, { Component } from "react";
// import PropTypes            from "prop-types";
import { Link }             from "react-router-dom";
import { connect }          from "react-redux";

import { getCommentsQuantAct } from "../../../../actions/commentActs";

class PostItem extends Component {
    constructor() {
        super();
        this.state = {
            commentsQuant: 0
        }
    }
    async componentWillMount() {
        await this.props.getCommentsQuantAct(this.props.post._id);
        await this.setState({ commentsQuant: this.props.comment.commentsQuant });
    }
    render() {
        var originDate = this.props.post.createdAt.slice(0, 16);
        return (
            <article className="post post-medium font_Gulim" key={this.props.post._id}>
                <div className="row">
                    <div className="col-md-5">
                        <div className="post-image">
                            <div>
                                <div className="img-thumbnail">
                                    <img className="img-responsive" src="img/blog/blog-image-1.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="post-content">
                            <h3>
                                <Link to={"post/"+this.props.post._id}>
                                    { this.props.post.title }
                                </Link>
                            </h3>
                            <p>{ this.props.post.content }</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="post-meta">
                            <span>
                                <i className="icon icon-calendar"></i> 
                                <span className="text-porto">
                                    { originDate.split("T")[0] } { originDate.split("T")[1] }
                                </span>
                            </span>
                            <span>
                                <i className="icon icon-user"></i> 
                                Writer: 
                                <a href="#">
                                    {
                                        this.props.post.user ? 
                                        this.props.post.user.name : ""
                                    }
                                </a> 
                            </span>
                            <span>
                                <i className="icon icon-tag"></i> 
                                { this.props.post.tags.map((tag, index) => (
                                    <span key={tag._id} className="text-porto">
                                        {tag.tag.name}
                                        { index+1 !== this.props.post.tags.length ? ", " : "" } 
                                    </span>
                                )) }
                            </span>
                            <span>
                                <i className="icon icon-comments"></i> 
                                Replies: 
                                <span className="text-porto">
                                    { this.state.commentsQuant }
                                </span>
                            </span>
                            <span>
                                <i className="icon icon-thumbs-up"></i> 
                                Like: 
                                <span className="text-porto">
                                    { this.props.post.likers.length }
                                </span>
                            </span>
                            <span>
                                <i className="icon icon-thumbs-down"></i> 
                                Dislike: 
                                <span className="text-porto">
                                    { this.props.post.dislikers.length }
                                </span>
                            </span>
                            <Link 
                                className="btn btn-xs btn-primary pull-right"
                                to={"post/"+this.props.post._id}
                            >Details</Link>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

var mapStateToProps = state => ({
    comment: state.comment
});

export default connect(mapStateToProps, { getCommentsQuantAct })(PostItem);