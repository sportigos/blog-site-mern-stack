//  Begin Date: 2020/05/26  Tue

import React, { Component } from "react";
// import PropTypes            from "prop-types";
// import { Link }             from "react-router-dom";
import { connect }          from "react-redux";

import { getPostsAct } from "../../../../actions/postActs";

import PostItem from "./PostItem";
import PostSearchForm from "../../../layouts/PostSearchForm";

class PostList extends Component {
    constructor() {
        super();
        this.state = {
            postsTitle: "All blogs"
        }
    }
    async componentWillReceiveProps(nextProps) {
        if(nextProps.post.postsTitle) {
            await this.setState({ postsTitle: nextProps.post.postsTitle });
        }
    }
    render() {
        return (
            <div className="row">
                <div className="blog-posts">
                    <div className="row">
                        <div className="col-md-8">
                            <h3 className="font_Gulim">
                                <b>{ this.props.post.postsTitle }</b>
                            </h3>
                        </div>
                        <div className="col-md-4">
                            <PostSearchForm  />
                        </div>
                    </div>
                    <hr />
                    
                    { 
                        this.props.post.posts !== undefined ?
                        this.props.post.posts.length>0 ?  
                        this.props.post.posts.map(post => <PostItem post={post} key={post._id} />) : 
                        "" : "" 
                    }
                </div>
            </div>
        );
    }
}

var mapStateToProps = state => ({
    post:   state.post
});

export default connect(
    mapStateToProps, 
    { 
        getPostsAct
    }
)(PostList);