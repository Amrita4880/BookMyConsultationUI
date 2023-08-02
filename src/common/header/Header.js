import {
    Button,
    Tabs,
    Tab,
    Card,
    CardHeader,
    CardContent,
    Typography
} from "@material-ui/core";
import "./Header.css";
import Modal from "react-modal";
import React, { Component } from "react";
import Register from "../../screens/register/Register";
import Login from "../../screens/login/Login";

var logo = require("../../assets/logo.jpeg");

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "0"
    },
};


class Header extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: (sessionStorage.getItem("access-token") != 'undefined' && sessionStorage.getItem("access-token") != null) ? true : false,
            // loggedIn : false
        };
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
        });
    };

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
        this.setState({ loggedIn: (sessionStorage.getItem("access-token") != 'undefined' && sessionStorage.getItem("access-token") != null) ? true : false});
    };

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    };

    logoutClickHandler = (e) => {
        fetch("http://localhost:8080/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("access-token")
            }
        })
        .then((data) => this.logoutHandler(e))
    }

    logoutHandler = (e) => {
        // Remove access-token from the browser session storage
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("user-first-name");
        sessionStorage.removeItem("user-last-name");
        sessionStorage.removeItem("user-email");

        this.setState({
            loggedIn: false,
        });
    };


    render() {
        return (
            <div>
                <header className="header">
                    <div className="header-left-container">
                        <img src={logo} alt="logo" className="app-logo" />
                        <Typography variant="headline" component="h3" className="header-logo-text" >
                            Doctor Finder
                        </Typography>
                    </div>
                    <div className="header-right-container">
                        {!this.state.loggedIn ? (
                            <div className="login-button">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.openModalHandler}
                                >
                                    Login
                                </Button>
                            </div>
                        ) : (
                            <div className="login-button">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.logoutClickHandler}
                                >Logout</Button>
                            </div>
                        )}
                    </div>
                </header>

                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <Card className="cardStyle" >
                        <CardHeader className="authentication-header"
                            title="Authentication">
                        </CardHeader>
                        <CardContent className="authentication-card-content">
                            {/* // two tabs for login and register */}
                            <Tabs
                                className="tabs"
                                value={this.state.value}
                                onChange={this.tabChangeHandler}
                            >
                                <Tab label="Login" />
                                <Tab label="Register" />
                            </Tabs>

                            {/* Login Tab */}
                            {this.state.value === 0 && (
                                <Login closeModal={this.closeModalHandler}></Login>
                            )}

                            {/* Register tab */}
                            {this.state.value === 1 && (
                                <Register ></Register>
                            )}
                        </CardContent>
                    </Card>
                </Modal>
            </div>
        );
    }
}

export default Header;