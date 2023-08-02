import React, { Component } from "react";
import "./BookAppointment.css";
import { Button, Card, CardActionArea, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { Label } from "@material-ui/icons";

class BookAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: sessionStorage.getItem("uuid"),
            userAccessToken: sessionStorage.getItem("access-token"),
            userFirstName: sessionStorage.getItem("user-first-name"),
            userLastName: sessionStorage.getItem("user-last-name"),
            userEmailId: sessionStorage.getItem("user-email"),

            doctorName: this.props.doctorInfo.firstName + " " + this.props.doctorInfo.lastName,
            doctorTimeSlot: [],
            appointmentDate: "2023-08-01",
            appointmentTimeSlot: "",
            medicalHistory: "",
            symptoms: "",

            openErrorAlertDialog: false,
            closeErrorAlertDialog: false,

            openSuccessAlertDialog: false,
            closeSuccessAlertDialog: false
        }
    }

    componentDidMount() {

    }

    handleSubmit = () => {
        this.setState({openSuccessAlertDialog : false});
        this.setState({openErrorAlertDialog : false});
        try {
            // Perform form submission logic and send POST request
            const response = fetch("http://localhost:8080/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("access-token")
                },
                body: JSON.stringify({
                    doctorId: this.props.doctorInfo.id,
                    doctorName: this.state.doctorName,
                    userId: this.state.userId,
                    userName: this.state.userFirstName + " " + this.state.userLastName,
                    userEmailId: this.state.userEmailId,
                    timeSlot: this.state.appointmentTimeSlot,
                    appointmentDate: this.state.appointmentDate,
                    symptoms: this.state.symptoms,
                    priorMedicalHistory: this.state.medicalHistory
                })
            });

            // Check if the request was successful
            if (response.ok) {
                // Handle success case
                console.log("Appointment booked successfully!");
                this.props.closeModal();
                this.setState({openSuccessAlertDialog : true})
                
            } else {
                this.setState({openErrorAlertDialog : true})
                // Handle error case
                console.error("Failed to book appointment. Please try again.");
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
        }

        // Close the overlay box
        // onClose();
    };

    appointmentDateChangeHandler = (date, value) => {
        this.setState({ appointmentDate: value });
        try {
            fetch('http://localhost:8080/doctors/' + this.props.doctorInfo.id + '/timeSlots?date=' + this.state.appointmentDate, {
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + this.loggedInAccessToken
                    // "Authorization": "Bearer " + "eyJraWQiOiIzYmMwOTVmYi00NGQ4LTQ0ZjktOTJlNC1hZTFkYjUzYzliOTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJwYW5kZXlhbXJpdGE2NEBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2Jvb2tteWNvbnN1bHRhdGlvbi5jb20iLCJleHAiOjE2OTA5MjgsImlhdCI6MTY5MDkwMH0.0z_VQtupO5rackBtdD28whX-7M3eMCGhhT_I9T7eHN8A9RGNdNm-G73pWFQTR6h2w7ZyJIMmlKT9LQizvGvbDg"
                    "Authorization": "Bearer " + sessionStorage.getItem("access-token")
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ doctorTimeSlot: data.timeSlot }))

        } catch (error) {
            console.error("Unable to fetch doctors details", error);
        }
    };
    appointmentTimeSlotChangeHandler = (e) => {
        this.setState({ appointmentTimeSlot: e.target.value });
    };

    medicalHistoryChangeHandler = (e) => {
        this.setState({ medicalHistory: e.target.value });
    };

    symptomsChangeHandler = (e) => {
        this.setState({ symptoms: e.target.value });
    };


    render() {
        return (
            <Card className="cardStyle" >
                <CardHeader className="book-appointment-header"
                    title="Book an Appointment">
                </CardHeader>
                <CardContent className="book-appointment-card-content">
                    <div>

                        <TextField
                            id="doctorName"
                            className="doctor-name-text-field"
                            label="Doctor's Name*"
                            defaultValue={this.state.doctorName}
                            InputProps={{ readOnly: true }}>
                        </TextField>
                        <br /><br />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            <KeyboardDatePicker
                                label="Date Picker inline"
                                value={this.state.appointmentDate}
                                format="yyyy-MM-dd"
                                onChange={this.appointmentDateChangeHandler}
                            />
                        </MuiPickersUtilsProvider>
                        <br /><br />

                        <InputLabel >Timeslot</InputLabel>
                        <Select label="Timeslot"
                            value={this.state.appointmentTimeSlot}
                            onChange={this.appointmentTimeSlotChangeHandler}
                            defaultValue="9AM-10AM"
                        >
                            <MenuItem value="None">None</MenuItem>
                            {this.state.doctorTimeSlot.map((timeSlot, index) => (
                                <MenuItem value={timeSlot}>{timeSlot}</MenuItem>
                            ))}
                        </Select>
                        <br /><br />

                        <TextField
                            multiline={true}
                            rows={5}
                            label="Medical History"
                            value={this.state.medicalHistory}
                            onChange={this.medicalHistoryChangeHandler} />
                        <br /><br />

                        <TextField
                            multiline={true}
                            rows={5}
                            label="Symptoms"
                            value={this.state.symptoms}
                            onChange={this.symptomsChangeHandler} />
                        <br /><br />

                        <Button type="submit"
                            variant="contained"
                            color="primary"
                            className="book-appointment-button"
                            onClick={this.handleSubmit}>
                            BOOK APPOINTMENT
                        </Button>
                    </div>

                    {this.state.openErrorAlertDialog &&
                        (<Dialog
                            open={this.state.openAlertDialog}
                            onClose={this.state.closeAlertDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            className="alert-dialog-style"
                        >
                            <DialogTitle
                                id="alert-dialog-title"
                                className="alert-title-style"
                            >
                                &#127760; {window.location.origin}
                            </DialogTitle>
                            <DialogContent className="alert-content-style">
                                <DialogContentText
                                    id="alert-dialog-description"
                                    className="alert-text-style"
                                >
                                    Either the slot is already booked or not available
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions className="alert-content-style">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="alert-button-style"
                                >
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                        )}

                    {this.state.openSuccessAlertDialog &&
                        (
                            <Dialog
                                open={this.state.openAlertDialog}
                                onClose={this.state.closeAlertDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                className="alert-dialog-style"
                            >
                                <DialogTitle
                                    id="alert-dialog-title"
                                    className="alert-title-style"
                                >
                                    &#127760; {window.location.origin}
                                </DialogTitle>
                                <DialogContent className="alert-content-style">
                                    <DialogContentText
                                        id="alert-dialog-description"
                                        className="alert-text-style"
                                    >
                                        Appointment Booked Successfully
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions className="alert-content-style">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.props.closeModal()}
                                        className="alert-button-style"
                                    >
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        )}
                </CardContent>
            </Card>
        )
    }
}

export default BookAppointment;