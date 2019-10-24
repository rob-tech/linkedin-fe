import React, { Component } from 'react';

class Register extends Component {
  constructor(params) {
    super(params);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",

      users: [],
      values: null,
      errMess: ""
    };
  }

  handleSubmit = async user => {
    this.setState({
      user: user
    });

    try {
      user = {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      }
      var response = await fetch(
        "http://localhost:3000/users/register",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.ok) {
        var allUsers = this.state.users
        allUsers.push(user)
        this.setState({
          errMess: "",
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",

        })
      } else {
        var error = await response.json();
        this.setState({
          errMess: error.message,
        });
      }
    } catch (ex) {
      console.log(ex);
      this.setState({
        errMess: ex.message,
      });
    }

  };

  render() {
    return (
      <>
  
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body registerCard">
              <h1 className="text-center mb-3">
                <i className="fa fa-user-plus fa-1x" aria-hidden="true" ></i> Register
                 </h1>

              <div className="form-group">
                <label id="registerLabel" for="username">Username</label>
                <input id="registerInput" type="text" value={this.state.username} onChange={(val) => this.setState({ username: val.currentTarget.value })} />
              </div>
              <div className="form-group">
                <label id="registerLabel" for="name">Name</label>
                <input id="registerInput" type="text" value={this.state.firstName} onChange={(val) => this.setState({ firstName: val.currentTarget.value })} />
              </div>
              <div className="form-group">
                <label id="registerLabel" for="surname">Surname</label>
                <input id="registerInput" type="text" value={this.state.lastName} onChange={(val) => this.setState({ lastName: val.currentTarget.value })} />
              </div>
              <div className="form-group">
                <label id="registerLabel" for="email">Email</label>
                <input id="registerInput" type="email" value={this.state.email} onChange={(val) => this.setState({ email: val.currentTarget.value })} />
              </div>
              <div className="form-group">
                <label id="registerLabel" for="password">Password</label>
                <input id="registerInput" type="password" value={this.state.password} onChange={(val) => this.setState({ password: val.currentTarget.value })} />
              </div>

              <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>
                Register
        </button>

              <p className="lead mt-4">Have An Account? <a href="/">Login</a></p>
            </div>
          </div>
        </div>

      </>
    )
  }

  componentDidMount = async () => {
    await this.fetchUsers()
  }

  fetchUsers = async () => {
    var res = await fetch("http://localhost:3000/users");
    var allUsers = await res.json();
    this.setState({ users: allUsers });
  }

}

export default Register;