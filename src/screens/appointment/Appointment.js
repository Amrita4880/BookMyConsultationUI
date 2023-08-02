import { Button, Paper, Typography } from "@material-ui/core";
import Modal from "react-modal";
import React, { Component } from "react";
import "./Appointment.css"
import RateAppointment from "./RateAppointment";

const customStyles = {
    content: {
        // margin:"auto",
        "max-width": "800px",
        "height": "35%",
        "width": "70%",
        // "justify-content": "center",
        // "align-items": "center",
        top: "50%",
        left: "50%",
        position: "absolute",
        margin:"none",
        padding:"none",
        // right: "auto",
        // bottom: "auto",
        // marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

class Appointment extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            appointments: [],
            showRatingModal: false,
            selectedAppointment : null,
            // loggedInUserId: "pandeyamrita64@gmail.com",
            loggedInUserId: sessionStorage.getItem("uuid"),
            loggedInAccessToken: sessionStorage.getItem("access-token"),
        }
    }

    componentDidMount() {
        try {
            let apiUrl = "http://localhost:8080/users/" + this.state.loggedInUserId + "/appointments"
            fetch(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + this.loggedInAccessToken
                    // "Authorization": "Bearer " + "eyJraWQiOiIzYmMwOTVmYi00NGQ4LTQ0ZjktOTJlNC1hZTFkYjUzYzliOTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJwYW5kZXlhbXJpdGE2NEBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2Jvb2tteWNvbnN1bHRhdGlvbi5jb20iLCJleHAiOjE2OTA5MjgsImlhdCI6MTY5MDkwMH0.0z_VQtupO5rackBtdD28whX-7M3eMCGhhT_I9T7eHN8A9RGNdNm-G73pWFQTR6h2w7ZyJIMmlKT9LQizvGvbDg"
                    "Authorization": "Bearer " + sessionStorage.getItem("access-token")
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ appointments: data }))
        } catch (error) {
            console.error("Unable to fecth doctors details", error);
        }
    }

    showRatingDialogue = (appointment) => {
        this.setState({ modalIsOpen: true });
        this.setState({ showRatingModal : true });
        this.setState({ selectedAppointment : appointment});
    }

    hideModalHandler = () => {
        this.setState({ modalIsOpen: false });
        this.setState({ showRatingModal: false });
        this.setState({ selectedAppointment: null });
    };

    render() {
        return (
            <div className="appointment-list">
                {(this.state.loggedInUserId == 'undefined' || this.state.loggedInUserId == null)
                    && (
                        <Typography variant="headline" component="h2" className="message-text-style" >
                            Login to see appointments
                        </Typography>
                    )}

                {((this.state.loggedInUserId != 'undefined' && this.state.loggedInUserId != null)
                    && this.state.appointments.length == 0) && (
                        <Typography variant="headline" component="h2" className="message-text-style">
                            No Appointments
                        </Typography>
                    )}

                {this.state.appointments.length > 0 && (
                    <div>
                        {this.state.appointments.map((appointment, index) => (
                            <Paper className="appoitnment-paper-box">
                                <div>
                                    <p>Doctor Name : {appointment.doctorName} </p>
                                    <p>Appointment Date : {appointment.appointmentDate}</p>
                                    <p>Symptoms : {appointment.symptoms}</p>
                                    <p>Previous Medical History : {appointment.priorMedicalHistory}</p>
                                    <br />
                                    <Button type="rateAppointment"
                                        variant="contained"
                                        color="primary"
                                        className="rate-appointment-button"
                                        onClick={()=>{this.showRatingDialogue(appointment)}}>
                                        RATE APPOINTMENT
                                    </Button>

                                </div>

                            </Paper>
                        ))}
                    </div>
                )}

                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.hideModalHandler}
                    contentLabel="RateAppointment"
                    style={customStyles}>
                    {this.state.showRatingModal ?
                        <RateAppointment
                            appointmentInfo={this.state.selectedAppointment}
                            closeRateModal={this.hideModalHandler} >
                        </RateAppointment>
                        : <div></div>
                    }
                </Modal>
            </div>
        );
    }
}
export default Appointment;