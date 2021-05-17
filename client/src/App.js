//  Begin Date: 2020/05/25 Mon
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUserAct } from "./actions/authActs";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import SignIn from "./components/user/auth/SignIn";
import SignUp from "./components/user/auth/SignUp";
import HomePage from "./components/user/HomePage";
import PostForm from "./components/user/PostForm";
import PostPage from "./components/user/PostPage";

if (localStorage.jwtToken) {

    //Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    
    //Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
  
    //Set user and isAuthenticated
    store.dispatch(setCurrentUserAct(decoded));
  
    // Check for expired token
    // const currentTime = Date.now() / 1000;
  
    // if (decoded.exp < currentTime) {
    //   // Logout user
    //   store.dispatch(logoutUser());
  
    //   //TODO: Clear current Profile
    //   store.dispatch(clearCurrentProfile());
  
    //   // Redirect to login
    //   window.location.href = "./";
    // }
}
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header />
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route exact path="/signIn" component={SignIn} />
                            <Route exact path="/signUp" component={SignUp} />
                            <PrivateRoute exact path="/createPost" component={PostForm} />
                            <Route exact path="/post/:_id" component={PostPage} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;