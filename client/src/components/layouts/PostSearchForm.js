//  Begin Date:     2020/05/27  Wed
import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import { 
    setPostSearchFlagAct,
    searchPostsAct ,
    setPostSearchKeyAct
} from "../../actions/postActs";

class PostSearchForm extends Component {
    constructor() {
        super();
        this.state = {
            searchKey: ""
        }
        this.searchPosts = this.searchPosts.bind(this);
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    async searchPosts(e) {
        e.preventDefault();
        var data = {
            searchKey:      this.state.searchKey,
            pageSize:       this.props.post.pageSize,
            currentPage:    1,
            postsTitle:     "Searched articles"
        }
        await this.props.setPostSearchFlagAct(1);
        await this.props.setPostSearchKeyAct(this.state.searchKey);
        await this.props.searchPostsAct(data);
    }
    render() {
        return (
            <form>
                <div className="input-group font_Gulim">
                    <input 
                        className="form-control" 
                        placeholder="Search article" 
                        name="searchKey" 
                        type="text" 
                        onChange={this.onChange}
                        value={this.state.searchKey}/>
                    <span className="input-group-btn">
                        <button 
                            className="btn btn-primary btn-lg"
                            onClick={this.searchPosts}>
                            <i className="icon icon-search"></i>
                        </button>
                    </span>
                </div>
            </form>
        );
    }
}

var mapStateToProps = state => ({
    post: state.post
});

export default connect(
    mapStateToProps,
    {   
        setPostSearchFlagAct,
        searchPostsAct,
        setPostSearchKeyAct
    }
)(PostSearchForm);
