import React, { Component } from "react";
import "./BookAppointment.css";
import { Button, Card, CardActionArea, CardContent, CardHeader, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
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
            appointmentDate: "2023-08-01",
            appointmentTimeSlot: "9 AM - 10 AM",
            medicalHistory: "",
            symptoms: ""
        }
    }

    componentDidMount() {
    }

    handleSubmit = () => {

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
            } else {
                // Handle error case
                console.error("Failed to book appointment. Please try again.");
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
        }

        // Close the overlay box
        // onClose();
    };

    appointmentDateChangeHandler = (e) => {
        this.setState({ appointmentDate: e.target.value });
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
                            defaultValue={this.props.doctorName}
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
                            defaultValue="9 AM - 10 AM"
                        >
                            <MenuItem value="9 AM - 10 AM">9 AM - 10 AM</MenuItem>
                            <MenuItem value="10 AM - 11 AM">10 AM - 11 AM</MenuItem>
                            <MenuItem value="11 AM - 12 AM">11 AM - 12 AM</MenuItem>
                            <MenuItem value="12 PM - 1 PM">12 PM - 1 PM</MenuItem>
                            <MenuItem value="1 PM - 2 PM">1 PM - 2 PM</MenuItem>
                            <MenuItem value="2 PM - 3 PM">2 PM - 3 PM</MenuItem>
                            <MenuItem value="3 PM - 4 PM">3 PM - 4 PM</MenuItem>
                            <MenuItem value="4 PM - 5 PM">4 PM - 5 PM</MenuItem>
                            <MenuItem value="5 PM - 6 PM">5 PM - 6 PM</MenuItem>
                            <MenuItem value="6 PM - 7 PM">6 PM - 7 PM</MenuItem>
                            <MenuItem value="7 PM - 8 PM">7 PM - 8 PM</MenuItem>
                            <MenuItem value="8 PM - 9 PM">8 PM - 9 PM</MenuItem>
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
                            Submit
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

export default BookAppointment;