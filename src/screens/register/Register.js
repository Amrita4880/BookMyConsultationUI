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

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispnone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            registrationSuccess: false,
        }

    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispnone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
        });
    }

    registerClickHandler = () => {
        this.state.firstname === ""
            ? this.setState({ firstnameRequired: "dispBlock" })
            : this.setState({ firstnameRequired: "dispNone" });
        this.state.lastname === ""
            ? this.setState({ lastnameRequired: "dispBlock" })
            : this.setState({ lastnameRequired: "dispNone" });
        this.state.email === ""
            ? this.setState({ emailRequired: "dispBlock" })
            : this.setState({ emailRequired: "dispNone" });
        this.state.registerPassword === ""
            ? this.setState({ registerPasswordRequired: "dispBlock" })
            : this.setState({ registerPasswordRequired: "dispNone" });
        this.state.contact === ""
            ? this.setState({ contactRequired: "dispBlock" })
            : this.setState({ contactRequired: "dispNone" });

        let dataSignup = JSON.stringify({
            emailId: this.state.email,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            mobile: this.state.contact,
            password: this.state.registerPassword,
        });

        fetch('http://localhost:8080/users/register', {
            method: 'POST',
            body: dataSignup,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Check the response from the API and handle successful registration
                if (data.success) {
                    // Perform any additional actions upon successful registration
                    // For example, you can update the UI or display a success message
                    console.log('Registration Successful');
                } else {
                    // Handle registration errors
                    // For example, you can display an error message
                    console.log('Registration Error:', data.message);
                }
            })
            .catch((error) => {
                // Handle any network errors or exceptions
                console.log('Registration Error:', error);
            });

    };

    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    };

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    };

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    };

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    };

    inputContactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    };

    validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    render() {
        return (
            <TabContainer>
                <FormControl required>
                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                    <Input
                        id="firstname"
                        type="text"
                        firstname={this.state.firstname}
                        onChange={this.inputFirstNameChangeHandler}
                    />
                    {this.state.firstname === "" && (
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
                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                    <Input
                        id="lastname"
                        type="text"
                        lastname={this.state.lastname}
                        onChange={this.inputLastNameChangeHandler}
                    />
                    {this.state.lastname === "" && (
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
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
                        type="text"
                        email={this.state.email}
                        onChange={this.inputEmailChangeHandler}
                    />
                    {this.state.email !== "" && !this.validateEmail(this.state.email) && (
                        <FormHelperText error>Enter a valid Email</FormHelperText>
                    )}
                    {this.state.email === "" && !this.validateEmail(this.state.email) && (
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
                    <InputLabel htmlFor="registerPassword">Password</InputLabel>
                    <Input
                        id="registerPassword"
                        type="password"
                        registerPassword={this.state.registerPassword}
                        onChange={this.inputRegisterPasswordChangeHandler}
                    />
                    {this.state.registerPassword === "" && (
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
                    <InputLabel htmlFor="contact">Contact No.</InputLabel>
                    <Input
                        id="contact"
                        type="text"
                        contact={this.state.contact}
                        onChange={this.inputContactChangeHandler}
                    />
                    {this.state.contact === "" && (
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
                {this.state.registrationSuccess === true && (
                    <FormControl>
                        <span className="successText">
                            Registration Successful. Please Login!
                        </span>
                    </FormControl>
                )}
                <br />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.registerClickHandler}
                >
                    REGISTER
                </Button>
            </TabContainer>
        )
    }
}
export default Register;