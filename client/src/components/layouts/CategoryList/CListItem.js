//  Begin Date: 2020/05/25  Mon

import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import { 
    getSubCategoriesAct, 
    removeSubCategoriesAct,  
    setCategoryInfoAct 
}    from "../../../actions/categoryActs";
import { 
    getPostsOfCategoryAct, 
    setCategoryIdOfPostsAct,
    setPostSearchFlagAct,
    setPostSearchKeyAct
}    from "../../../actions/postActs";

class CListItem extends Component {
    componentWillMount() {
        this.setState({ space: { "marginLeft": this.props.catg.ancestors.length+"em" } })
    }
    getSubCategories(_id) {
        this.props.getSubCategoriesAct(_id);
    }
    removeSubCategories(_id) {
        this.props.removeSubCategoriesAct(_id);
    }
    setCategoryInfo(data) {
        this.props.setCategoryInfoAct(data);
    }
    async getPostsOfCategory(data){
        var reqData = {
            categoryId:         data._id,
            categoryName:       data.name,
            pageSize:           this.props.post.pageSize,
            currentPage:        1
        }
        await this.props.setPostSearchFlagAct(0);
        await this.props.setPostSearchKeyAct("");
        await this.props.setCategoryIdOfPostsAct(data._id);
        await this.props.getPostsOfCategoryAct(reqData);
    }
    render() {
        var { categories } = this.props.category;
        return (
            <li style={this.state.space}>
                { 
                    categories.find(catg => catg.parent === this.props.catg._id) ? 
                    <i 
                        className="icon icon-angle-down cursor_pointer" 
                        onClick={this.removeSubCategories.bind(this, this.props.catg._id)} 
                    /> :
                    <i 
                        className="icon icon-angle-right cursor_pointer" 
                        onClick={this.getSubCategories.bind(this, this.props.catg._id)} 
                    />
                }
                <a 
                    onClick={ 
                        this.props.pageName==="PostForm" ? 
                        this.setCategoryInfo.bind(this, { 
                            _id:    this.props.catg._id, 
                            name:   this.props.catg.name }) : 
                        this.getPostsOfCategory.bind(this, {
                            _id:    this.props.catg._id, 
                            name:   this.props.catg.name
                        }) }
                >{this.props.catg.name}</a>
            </li>
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
        getSubCategoriesAct, 
        removeSubCategoriesAct, 
        setCategoryInfoAct,
        getPostsOfCategoryAct,
        setCategoryIdOfPostsAct,
        setPostSearchFlagAct,
        setPostSearchKeyAct
    }
)(CListItem);
