//  Begin Date: 2020/05/24  Sun
import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getRootCategoriesAct } from "../../../actions/categoryActs";
import { 
    getPostsAct, 
    setPostSearchFlagAct,
    setPostSearchKeyAct
}   from "../../../actions/postActs";

import CategoryList from "../../layouts/CategoryList";
import Pagination   from "./Pagination";
import PostList     from "./PostList";
// import TabBox       from "../../layouts/TabBox";

class HomePage extends Component {
    async componentWillMount() {
        await this.props.getRootCategoriesAct();
        var data = {
            pageSize:   this.props.post.pageSize,
            currentPage:this.props.post.currentPage,
            postsTitle: "All blogs"
        }
        await this.props.setPostSearchFlagAct(0);
        await this.props.setPostSearchKeyAct("");
        await this.props.getPostsAct(data);
    }
    render() {
        
        return (
            <div className="main">
                <section className="page-top">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h2 className="font-family">Blog</h2>
							</div>
						</div>
					</div>
				</section>

                <div className="container">
                    <div className="row">
                        {/* List */}
                        <div className="col-md-3">
                            <aside className="sidebar font_Gulim">
                                {/* <TabBox /> */}
                                <CategoryList pageName="HomePage" />
                            </aside>
                        </div>

                        <div className="col-md-9">
                            <PostList />
                            <Pagination />
                        </div>
                    </div>
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
        getRootCategoriesAct,
        getPostsAct,
        setPostSearchFlagAct,
        setPostSearchKeyAct
    }
)(HomePage);