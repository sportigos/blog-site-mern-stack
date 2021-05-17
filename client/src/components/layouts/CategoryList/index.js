//  Begin Date: 2020/05/24  Sun

import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import CListItem from "./CListItem";

import { 
    getPostsAct, 
    setCategoryIdOfPostsAct,
    setPostSearchFlagAct,
    setPostSearchKeyAct
} from "../../../actions/postActs";

class CategoryList extends Component {
    constructor() {
        super();
        this.getAllPosts = this.getAllPosts.bind(this);
    }
    async getAllPosts() {
        var data = {
            currentPage:1,
            pageSize:   this.props.post.pageSize,
            postsTitle: "All Blogs"
        }
        await this.props.setPostSearchFlagAct(0);
        await this.props.setPostSearchKeyAct("");
        await this.props.setCategoryIdOfPostsAct("");
        await this.props.getPostsAct(data);
    }
    render() {
        var { categories } = this.props.category,
            categoryList;
        if(categories.length > 0) {
            categoryList = categories.map((category) => (
                <CListItem key={category._id} catg = {category} pageName={this.props.pageName} />
            ));
        }
        return (
            <div>
                <h4 className="font_Gulim">List</h4>
                <hr />
                <ul className="nav nav-list primary push-bottom h_700 font_Gulim">
                    { 
                        this.props.pageName!=="PostForm" ? 
                        <li>
                            <a onClick={this.getAllPosts}><b>All blogs</b></a>
                        </li> : 
                        "" 
                    }
                    { categories.length>0 ? categoryList : "" }
                </ul>
            </div>
        );
    }
}
var mapStateToProps = state => ({
    category:   state.category,
    post:       state.post
});
export default connect(
    mapStateToProps, 
    { 
        getPostsAct,
        setCategoryIdOfPostsAct,
        setPostSearchFlagAct,
        setPostSearchKeyAct
    }
)(CategoryList);