import {
    Button,
    Input,
    FormHelperText,
    FormControl,
    InputLabel,
    Typography,
    Card,
} from "@material-ui/core";
import React, { Component } from "react";
import TabContainer from "../../common/tabContainer/TabContainer";

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
        };
    }

    componentDidMount() {
        this.openModalHandler();
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
        });
    }

    closeModalHandler = () => {
        
        // this.setState({ modalIsOpen: false });
    };

    setLoggedInUser = (data) => {
        sessionStorage.setItem("uuid", data.id);
        sessionStorage.setItem("access-token", data.accessToken);  //  Setting the access-token in session so that can be used in various pages
        sessionStorage.setItem("user-first-name", data.firstName);
        sessionStorage.setItem("user-last-name", data.lastName);
        sessionStorage.setItem("user-email", data.emailAddress);
        this.setState({
            loggedIn: true,
        });
    }

    loginClickHandler = () => {
        this.state.username === ""
            ? this.setState({ usernameRequired: "dispBlock" })
            : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === ""
            ? this.setState({ loginPasswordRequired: "dispBlock" })
            : this.setState({ loginPasswordRequired: "dispNone" });

        fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword)
            }
        }).then((response) => response.json())
        .then((data) => this.setLoggedInUser(data))
        .then(this.props.closeModal());

    };

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    };

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    };

    validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };
    
    render() {
        return (<TabContainer>
            <FormControl required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                    id="username"
                    type="text"
                    username={this.state.username}
                    onChange={this.inputUsernameChangeHandler}
                    onInvalid="Please fill"/>
                {this.state.username !== "" && !this.validateEmail(this.state.username) && (
                  <FormHelperText error>Enter a valid Email</FormHelperText>
                )}
                {this.state.username === "" && !this.validateEmail(this.state.username) && (
                  <FormHelperText>
                    <Card
                      raised
                      style={{
                        backgroundColor: "#333333",
                        color: "white",
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      Please fill out this field
                    </Card>
                  </FormHelperText>
                )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
                <InputLabel htmlFor="loginpassword">Password</InputLabel>
                <Input
                    id="loginpassword"
                    type="password"
                    loginpassword={this.state.loginPassword}
                    onChange={this.inputLoginPasswordChangeHandler}
                />
                {this.state.loginPassword === "" && (
                  <FormHelperText>
                    <Card
                      raised
                      style={{
                        backgroundColor: "#333333",
                        color: "white",
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      Please fill out this field
                    </Card>
                  </FormHelperText>
                  )}
            </FormControl>
            <br />
            <br />
            {this.state.loggedIn === true && (
                <FormControl>
                    <span className="successText">Login Successful!</span>
                </FormControl>
            )}
            <br />
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
            >
                LOGIN
            </Button>
        </TabContainer>
        )
    }
}

export default Login;