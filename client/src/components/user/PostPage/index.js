//  Begin Date: 2020/05/26  Tue

import React, { Component } from "react";
// import PropTypes            from "prop-types";
// import { Link }             from "react-router-dom";
import { connect }          from "react-redux";

import { 
    getPostAct,
    setPostLikerAct,
    setPostDislikerAct 
}           from "../../../actions/postActs";
import { searchCommentsAct }    from "../../../actions/commentActs";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

class PostPage extends Component {
    constructor() {
        super();
        this.state = {
            post:           {},
            comments:       {},
            commentsTitle:  "Answer",
            searchKey:      ""
        }
        this.setPostLiker = this.setPostLiker.bind(this);
        this.setPostDisliker = this.setPostDisliker.bind(this);
    }
    componentWillMount() {
        this.props.getPostAct(this.props.match.params._id);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.post.post) {
            this.setState({ post: nextProps.post.post });
        }
        if(nextProps.comment.comments) {
            this.setState({ comments: nextProps.comment.comments });
        }
        if(nextProps.comment.commentSearchFlag) {
            if(nextProps.comment.commentSearchFlag === 1) {
                this.setState({ commentsTitle: "Answers found" });
            } else {
                this.setState({ commentsTitle: "Answer" });
            }
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    async setPostLiker() {
        // e.currentTarget.disabled = true;
        var data = {
            _id:    this.props.post.post._id,
            liker:  this.props.auth.user.id
        }
        await this.props.setPostLikerAct(data);
    }
    async setPostDisliker() {
        var data = {
            _id:        this.props.post.post._id,
            disliker:   this.props.auth.user.id
        }
        await this.props.setPostDislikerAct(data);
    }
    searchComments = e => {
        e.preventDefault();
        var data = {
            key:    this.state.searchKey,
            post:   this.props.post.post._id
        }
        this.props.searchCommentsAct(data);
    }
    render() {
        var createdDate, createdDay, createdMonth;
        if(this.props.post.post.createdAt !== undefined) {
            createdDate = this.props.post.post.createdAt.slice(5, 10);
            createdDay = Number(createdDate.split("-")[1]);
            createdMonth = Number(createdDate.split("-")[0]);
        }

        var voteButtons = 
            <span>
                <button 
                    className="btn btn-danger pull-right"
                    onClick={this.setPostDisliker}
                    disabled={
                        this.props.post.post.dislikers ?  
                        this.props.post.post.dislikers.find(disliker => disliker._id === this.props.auth.user.id) ? 
                        true : false : false 
                    }>
                    <i className="icon icon-thumbs-down mr_1"></i> Dislike
                </button>
                <button 
                    className="btn btn-info pull-right" 
                    style={{"marginRight": 1+"em"}}
                    onClick={this.setPostLiker}
                    disabled={
                        this.props.post.post.likers ?  
                        this.props.post.post.likers.find(liker => liker._id === this.props.auth.user.id) ? 
                        true : false : false 
                    }>
                    <i className="icon icon-thumbs-up mr_1"></i> Like
                </button>
            </span>;
        return (
            <div className="main">
                <section className="page-top ff_Gulim">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="font_Gulim">Blogs</h2>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="blog-posts single-post">
                                <article className="post post-large blog-single-post">
                                    <div className="post-image">
                                        <div className="img-thumbnail">
                                            <img className="img-responsive" alt="" src="../img/blog/blog-image-1.jpg" />
                                        </div>
                                    </div>

                                    <div className="post-date">
                                        <span className="day">{ createdDay }</span>
                                        <span className="month font_Gulim">{ createdMonth }Month</span>
                                    </div>

                                    <div className="post-content font_Gulim">
                                        <h2>{ this.props.post.post.title }</h2>
                                        <div className="post-meta">
                                            <span>
                                                <i className="icon icon-user"></i> 
										        Writer: 
                                                <span className="text-porto">
                                                    { 
                                                        this.props.post.post.user ?   
                                                        this.props.post.post.user.name : ""
                                                    }
                                                </span> 
                                            </span>
                                            <span v-if="tags.length > 0">
                                                <i className="icon icon-tag"></i>
                                                Tag: 
                                                {
                                                    this.props.post.post.tags ?
                                                    this.props.post.post.tags.map((tag, index) => (
                                                        <span key={tag._id} className="text-porto">
                                                            {tag.tag.name}
                                                            { index+1 !== this.props.post.post.tags.length ? ", " : "" } 
                                                        </span>
                                                    )) : ""
                                                }
                                            </span>
                                            <span>
                                                <i className="icon icon-comments"></i> 
                                                Replies: 
                                                <span className="text-porto">
                                                    {this.props.comment.comments.length}
                                                </span>
                                            </span>
                                            <span>
                                                <i className="icon icon-thumbs-up"></i>
                                                Likes: 
                                                <span className="text-porto">
                                                    {
                                                        this.props.post.post.likers ?
                                                        this.props.post.post.likers.length : 0
                                                    }
                                                </span>
                                            </span>
                                            <span>
                                                <i className="icon icon-thumbs-down"></i>
                                                Dislikes:
                                                <span className="text-porto"> 
                                                    {
                                                        this.props.post.post.dislikers ?
                                                        this.props.post.post.dislikers.length : 0
                                                    }
                                                </span>
                                            </span>
                                        </div>
                                        <p>
                                            { this.props.post.post.content ? this.props.post.post.content : "" }
                                        </p>
                                        {
                                            this.props.post.post.user && this.props.auth.isAuthenticated===true ?
                                            this.props.auth.user.id !== this.props.post.post.user._id  ? 
                                            voteButtons : "" : ""
                                        }
                                        <div className="post-block post-comments clearfix" style={{"width": 100+"%"}}>
                                            <h3 className="font_Gulim">
                                                <i className="icon icon-comments"></i> 
                                                { this.state.commentsTitle } ({this.props.comment.comments.length})
                                            </h3>
                                            <div className="comment">
                                                <ul className="comments">
                                                    {
                                                        this.props.comment.comments.length>0 ? 
                                                        this.props.comment.comments.map(comment => (
                                                            <CommentItem 
                                                                postId={ this.props.post.post._id }
                                                                commentItem={comment} 
                                                                key={comment._id} />
                                                        )) : ""
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        {
                                            this.props.post.post.user && this.props.auth.isAuthenticated===true ?
                                            this.props.auth.user.id !== this.props.post.post.user._id  ? 
                                            <CommentForm 
                                                postId={ this.props.post.post._id }
                                                userId={ this.props.auth.user.id } 
                                            /> : "" : ""
                                        }
                                    </div>
                                </article>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <aside className="sidebar font_Gulim">
                                <form>
                                    <div className="input-group">
                                        <input 
                                            className="form-control" 
                                            placeholder="Search Answer" 
                                            name="searchKey" 
                                            type="text" 
                                            onChange={this.onChange}
                                            value={this.state.searchKey}/>
                                        <span className="input-group-btn">
                                            <button 
                                                className="btn btn-primary btn-lg"
                                                onClick={this.searchComments}>
                                                <i className="icon icon-search mr_0"></i>
                                            </button>
                                        </span>
                                    </div>
                                </form>
                                <hr />
                            </aside>           
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

var mapStateToProps = state => ({
    post:       state.post,
    comment:    state.comment,
    auth:       state.auth
});

export default connect(
    mapStateToProps, 
    {
        getPostAct,
        searchCommentsAct,
        setPostLikerAct,
        setPostDislikerAct
    }
)(PostPage);