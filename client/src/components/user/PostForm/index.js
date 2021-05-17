//  Begin Date: 2020/05/25 Mon

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getRootCategoriesAct } from "../../../actions/categoryActs";
import { createPostAct } from "../../../actions/postActs";

import CategoryList from "../../layouts/CategoryList";
class PostForm extends Component {
    constructor() {
        super();
        this.state = {
            title:      "",
            category:   "",
            parent :    "",
            tags:        "",
            content:    "",
            errors:     {}
        }
        this.createPost = this.createPost.bind(this);
    }
    componentWillMount() {
        this.props.getRootCategoriesAct();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if(nextProps.category.categoryInfo.hasOwnProperty("_id")===true) {
            this.setState({
                category:   nextProps.category.categoryInfo.name,
                parent:     nextProps.category.categoryInfo._id
            })
        } 
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    createPost = e => {
        e.preventDefault();
        var data = {
            title:      this.state.title,
            tags:       this.state.tags,
            parent:     this.state.parent,
            content:    this.state.content,
            user:       this.props.auth.user.id,
            pageSize:   this.props.post.pageSize,
            currentPage:this.props.post.currentPage,
        }
        this.props.createPostAct(data, this.props.history);
    }
    render() {
        return (
            <div className="main">
                <section className="page-top">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h2 className="font_Gulim">Write blog</h2>
							</div>
						</div>
					</div>
				</section>

                <div className="container">
                    <div className="row">
                        {/* List */}
                        <div className="col-md-3">
                            <CategoryList pageName="PostForm" />
                        </div>
                        <div className="col-md-6">
                            <form className="font_Gulim">
                                <div className="row">
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <label>Title(*):</label>
                                            <input 
                                                type="text"
                                                className="form-control" 
                                                name="title" 
                                                onChange={this.onChange}
                                                value={this.state.title} />
                                            { 
                                                this.state.errors.postTitle ? 
                                                <p className="alert alert-danger">
                                                    {this.state.errors.postTitle}
                                                </p> : ""
                                            }
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <label>List(*):</label>
                                            <input 
                                                type="text"
                                                className="form-control" 
                                                value={this.state.category}
                                                placeholder="Select in the left list."
                                                disabled />
                                            { 
                                                this.state.errors.parent ? 
                                                <p className="alert alert-danger">
                                                    {this.state.errors.parent}
                                                </p> : ""
                                            }
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <label>Tag:</label>
                                            <input 
                                                type="text"
                                                className="form-control" 
                                                name="tags" 
                                                onChange={this.onChange}
                                                value={this.state.tags} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <label>Content:</label>
                                            <textarea 
                                                className="form-control"
                                                name="content"
                                                rows="15"
                                                onChange={this.onChange}
                                                value={this.state.content} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3">
                                            <button className="btn btn-default w-100">
                                                <i className="icon icon-mail-reply" /> Back
                                            </button>
                                        </div>
                                        <div className="col-md-3">
                                            <button 
                                                className="btn btn-primary w-100" 
                                                onClick={this.createPost}>
                                                Write <i className="icon icon-location-arrow" />
                                            </button>
                                        </div>
                                        <div className="col-md-3"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

PostForm.propTypes = {
    getRootCategoriesAct:   PropTypes.func.isRequired
}

var mapStateToProps = state => ({
    auth:       state.auth,
    category:   state.category,
    post:       state.post,
    errors:     state.errors
});

export default connect(mapStateToProps, { getRootCategoriesAct, createPostAct })(PostForm);