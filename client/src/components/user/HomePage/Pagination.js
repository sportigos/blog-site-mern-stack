//  Begin Date: 2020/05/26  Tue
import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { 
    getPostsAct, 
    getPostsOfCategoryAct,
    searchPostsAct
} from "../../../actions/postActs";

class Pagination extends Component {
    constructor() {
        super();
        this.state = {
            pageSize:           4,
            currentPage:        1,
            pageCount:          1,
        }
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.setPageSize = this.setPageSize.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.post.pageSize) {
            if(nextProps.post.pageSize !== this.state.pageSize) {
                this.setState({ pageSize: nextProps.post.pageSize });
            }
        }
        if(nextProps.post.currentPage) {
            if(nextProps.post.currentPage !== this.state.currentPage) {
                this.setState({ currentPage: nextProps.post.currentPage });
            }
        }
    }
    async setPageSize(e) {
        await this.setState({ pageSize: Number(e.target.value) });
        if(this.props.post.postSearchFlag === 1) {
            var data_1 = {
                pageSize:   this.state.pageSize,
                currentPage:1,
                postsTitle: this.props.post.postsTitle,
                searchKey:  this.props.post.postSearchKey
            }
            await this.props.searchPostsAct(data_1);
        } else {
            if(this.props.post.categoryIdOfPosts === "") {
                var data_2 = {
                    pageSize:   this.state.pageSize,
                    currentPage:1,
                    postsTitle: this.props.post.postsTitle
                }
                await this.props.getPostsAct(data_2);
            } else {
                var data_3 = {
                    pageSize:   this.state.pageSize,
                    currentPage:1,
                    postsTitle: this.props.post.postsTitle,
                    categoryId: this.props.post.categoryIdOfPosts
                }
                await this.props.getPostsOfCategoryAct(data_3);
            }
        }
    }
    async setCurrentPage(page) {
        await this.setState({ currentPage: Number(page) });
        if(this.props.post.postSearchFlag === 1) {
            var data_4 = {
                pageSize:   this.state.pageSize,
                currentPage:this.state.currentPage,
                postsTitle: this.props.post.postsTitle,
                searchKey:  this.props.post.postSearchKey
            }
            await this.props.searchPostsAct(data_4);
        } else {
            if(this.props.post.categoryIdOfPosts === "") {
                var data_5 = {
                    pageSize:   this.state.pageSize,
                    currentPage:this.state.currentPage,
                    postsTitle: this.props.post.postsTitle
                }
                await this.props.getPostsAct(data_5);
            } else {
                var data_6 = {
                    pageSize:       this.state.pageSize,
                    currentPage:    this.state.currentPage,
                    categoryName:   this.props.post.postsTitle,
                    categoryId:     this.props.post.categoryIdOfPosts
                }
                await this.props.getPostsOfCategoryAct(data_6);
            }
        }
        
    }
    render() {
        // console.log(this.props.post.pageCount);
        var pageButtons_1 = '',
            pageButtons_2 = '',
            pageButtons_3 = '',
            pageButtons_4 = '',
            pageNumbers = [];

        if(this.props.post.pageCount >= 1) {
            for(let i=1; i<=this.props.post.pageCount; i++) {
                pageNumbers.push(i);
            }
            
            pageButtons_1 = pageNumbers.map(i => (
                <span key={i}>
                    <button 
                        className={this.state.currentPage === i ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, i)}
                    >{i}</button>
                </span>
            ));

            pageButtons_2 = 
                <span>
                    <button 
                        className={this.state.currentPage === 1 ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, 1)}
                    >1</button>
                    <button 
                        className={this.state.currentPage === 2 ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, 2)}
                    >2</button>
                    <button 
                        className={this.state.currentPage === 3 ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, 3)}
                    >3</button>
                    <button 
                        className={this.state.currentPage === 4 ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, 4)}
                    >4</button>
                    <span>...</span>
                    <button 
                        className={this.state.currentPage === this.props.post.pageCount ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, this.props.post.pageCount)}
                    >{this.props.post.pageCount}</button>
                </span>

            pageButtons_3 = 
                <span>
                    <button
                        className={this.state.currentPage === 1 ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, 1)}
                    >1</button>
                    <span>...</span>
                    <button
                        className={this.state.currentPage === this.state.currentPage-1 ? "btn btn-primary" : "btn btn-default"}
                        onClick={this.setCurrentPage.bind(this, this.state.currentPage-1)}
                    >{this.state.currentPage-1}</button>
                    <button
                        className={this.state.currentPage ? "btn btn-primary" : "btn btn-default"}
                        onClick={this.setCurrentPage.bind(this, this.state.currentPage)}
                    >{this.state.currentPage}</button>
                    <button
                        className={this.state.currentPage === this.state.currentPage+1 ? "btn btn-primary" : "btn btn-default"}
                        onClick={this.setCurrentPage.bind(this, this.state.currentPage+1)}
                    >{this.state.currentPage+1}</button>
                    <span>...</span>
                    <button
                        className={this.state.currentPage === this.props.post.pageCount ? "btn btn-primary" : "btn btn-default"}
                        onClick={this.setCurrentPage.bind(this, this.props.post.pageCount)}
                    >{this.props.post.pageCount}</button>              
                </span>

            pageButtons_4 = 
                <span>
                    <button
                        className={this.state.currentPage === 1 ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, 1)}
                    >1</button>
                    <span>...</span>
                    <button
                        className={this.state.currentPage === this.props.post.pageCount-3 ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, this.props.post.pageCount-3)}
                    >{this.props.post.pageCount-3}</button>
                    <button
                        className={this.state.currentPage === this.props.post.pageCount-2 ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, this.props.post.pageCount-2)}
                    >{this.props.post.pageCount-2}</button>
                    <button
                        className={this.state.currentPage === this.props.post.pageCount-1 ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, this.props.post.pageCount-1)}
                    >{this.props.post.pageCount-1}</button>
                    <button
                        className={this.state.currentPage === this.props.post.pageCount ? "btn btn-primary" : "btn btn-default"} 
                        onClick={this.setCurrentPage.bind(this, this.props.post.pageCount)}
                    >{this.props.post.pageCount}</button>
                </span>
            
            var prevButton = 
                    <span>
                        <button
                            className="btn btn-primary font_Gulim"
                            onClick={this.setCurrentPage.bind(this, this.state.currentPage-1)}
                        ><i className="icon icon-chevron-left" /> Prev</button>
                    </span>
                
            var nextButton = 
                <span>
                    <button
                        className="btn btn-primary font_Gulim"
                        onClick={this.setCurrentPage.bind(this, this.state.currentPage+1)}
                    >Next <i className="icon icon-chevron-right" /></button>
                </span>
        }

        return (
            <div className="row">
                <div className="col-md-2">
                    {
                        this.props.post.pageCount >= 1 ? 
                        <select 
                            className="form-control pull-left font_Gulim"
                            onChange={this.setPageSize}
                            value={this.state.pageSize}>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                        </select> : ""
                    }
                </div>
                <div className="col-md-8">
                    { 
                        this.props.post.pageCount >= 1 ? 
                        <span className="pull-right">
                            { this.state.currentPage !== 1 && this.props.post.pageCount !== 0 ? prevButton : '' }
                            { 
                                this.props.post.pageCount > 0 && this.props.post.pageCount <= 5 ? pageButtons_1 :
                                this.props.post.pageCount > 5 && this.state.currentPage < 4 ? pageButtons_2 : 
                                this.props.post.pageCount > 5 && this.state.currentPage >= 4 && this.state.currentPage < this.props.post.pageCount-2 ? pageButtons_3 : pageButtons_4
                            }
                            { this.state.currentPage !== this.props.post.pageCount && this.props.post.pageCount !== 0 ? nextButton : '' }
                        </span> : ""
                    }
                </div>
            </div>
        )
    }
}

var mapStateToProps = state => ({
    post: state.post
});

export default connect(
    mapStateToProps, 
    { 
        getPostsAct,
        getPostsOfCategoryAct,
        searchPostsAct
    }
)(Pagination)