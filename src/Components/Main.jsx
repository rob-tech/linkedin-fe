import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Sections from "./Sections";
import Chat from "./Chat";
import Feeds from "./Feeds";
import { Provider } from "react-redux";
import configureStore from "../Stores";
import Register from "./Register";
import Login from "./Login"

class Main extends Component {

    constructor() {
        super()

        this.state = {
            loggedInState: "not logged in",
            user: {}
        }
    }

 

    render() {
        return (
            <Provider store={configureStore()}>
                <Router>
                    <NavBar />
                    <Switch>
                        <Route path="/profile/:username"  component={Sections} />
                        <Route path="/" render={props => (<Login {...props} />)} exact component={Login} />
                    </Switch>
                    <Route path="/feed" exact component={Feeds} />
                    <Route path="/chat" exact component={Chat} />
                    <Route path="/register" exact component={Register} />
                </Router>
            </Provider>
        );
    }
}

export default Main;