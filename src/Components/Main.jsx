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
            username: "",
            token: null
        }
    }


    setUser = (username, token) => {
        this.setState({
            username: username,
            token: token
        })
        this.refreshToken(token)
    }


    render() {
        return (
            <Provider store={configureStore()}>
                <Router>
                    <NavBar username={this.state.username} />
                    <Switch>
                        <Route path="/profile/:username" component={Sections} />
                        <Route path="/login" render={props => (<Login {...props} setUser={this.setUser} />)} />
                        <Route path="/feed" render={props => (<Feeds {...props} username={this.state.username} token={this.state.token}/>)} />
                    </Switch>
                    <Route path="/chat" exact component={Chat} />
                    <Route path="/register" exact component={Register} />
                </Router>
            </Provider>
        );
    }


    refreshToken = async (token) => {
        // var token = localStorage.getItem("accessToken");
        if (token) {
            var res = await fetch("http://localhost:3000/users/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            })
            if (res.ok) {
                var tokenJson = await res.json();
                localStorage.setItem("accessToken", tokenJson.token)

            }

            // localStorage.removeItem("accessToken")
        }
    }
}

export default Main;