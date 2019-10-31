import React, { Component } from 'react';
import { Alert } from "reactstrap";
import Feeds from "./Feeds";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            token: null,
            username: "",
            password: "",
            errMess: ""       
        }
    }

    render() {
        return (
            <>

                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <div className="card card-body loginCard">
                            <h1 className="text-center mb-3"> Login</h1>
                            <div className="form-group" >
                                <input id="loginInput" type="text" value={this.state.username} placeholder=" username" onChange={(val) => this.setState({ username: val.currentTarget.value })} />
                            </div>
                            <div className="form-group">
                                <input id="loginInput" type="text" value={this.state.password} placeholder=" password" onChange={(val) => this.setState({ password: val.currentTarget.value })} />
                            </div>
                            <button className="btn btn-primary btn-block" onClick={this.login} value="login">Login</button>
                            {this.state.errMess && (
                                <Alert className="loginAlert" color="info">{this.state.errMess}</Alert>
                            )}
                            <p className="lead mt-4">
                                No Account? <a href="/register">Register</a>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    login = async () => {

        var res = await fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (res.ok) {
            var tokenJson = await res.json()
            this.setState({
                user: tokenJson.user,
                token: tokenJson.token,
                username: "",
                password: "",
                errMess: "",
   
            })

            localStorage.setItem("accessToken", tokenJson.token)
           
            this.props.history.push("/profile/" + tokenJson.user.username)
            
        }
        else {
            // var error = await res.json();
            var custMess = "We do not have your details. Click on register below and become a member!"
            this.setState({
                errMess: custMess,
            })
        }

    }
}

    // componentDidMount = async () => {
    //     var token = localStorage.getItem("accessToken")
    //     if (token) {
    //         var res = await fetch("http://localhost:3000/users/refresh", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer" + token
    //             }
    //         })
    //         if (res.ok) {
    //             var tokenJson = await res.json()
    //             this.setState({
    //                 user: tokenJson.user,
    //                 token: tokenJson.token
    //             })
    //             localStorage.setItem("accessToken", tokenJson.token)
    //         }
    //         else {
    //             localStorage.removeItem("accessToken")
    //         }
    //     }
    // }

export default Login;