import { Button, Card, CardContent, CardHeader, TextField } from "@material-ui/core";
import React, { Component } from "react";
import "./RateAppointment.css"
import { Rating } from "@material-ui/lab";

class RateAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointmentComments : "",
            appointmentRating : 0,
        }
    }

    appointmentCommentsChangeHandler = (event) => {
        this.setState({appointmentComments : event.target.value});
    }

    appointmentRatingChangeHandler = (event) => {
        this.setState({appointmentRating : event.target.value});
    }

    handleSubmit = () => {

        try {
            // Perform form submission logic and send POST request
            const response = fetch("http://localhost:8080/rating", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("access-token")
                },
                body: JSON.stringify({
                    appointmentId : this.props.appointmentInfo.appointmentId,
                    doctorId : this.props.appointmentInfo.doctorId,
                    rating: this.state.appointmentRating,
                    comments: this.state.appointmentComments,
                })
            });

            // Check if the request was successful
            if (response.ok) {
                // Handle success case
                console.log("Rating saved successfully!");
                this.props.closeModal();
            } else {
                // Handle error case
                console.error("Failed to save rating. Please try again.");
            }
        } catch (error) {
            console.error("Error save rating:", error);
        }

        // Close the overlay box
        this.props.closeRateModal();
    };

    render() {
        return (
            <Card className="cardStyle" >
                <CardHeader className="rate-appointment-header"
                    title="Rate an Appointment">
                </CardHeader>
                <CardContent className="rate-appointment-card-content">
                    <div>
                        <TextField
                            multiline={true}
                            rows={5}
                            label="Comments"
                            value={this.state.appointmentComments}
                            onChange={this.appointmentCommentsChangeHandler} />
                        <br /><br />

                        <p>Rating : <Rating value={this.state.appointmentRating} onChange={this.appointmentRatingChangeHandler}></Rating> </p>

                        <Button type="submit"
                            variant="contained"
                            color="primary"
                            className="rating-submit-button"
                            onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

export default RateAppointment;