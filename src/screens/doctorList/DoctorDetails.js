import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React, { Component } from "react";
import './DoctorDetails.css'
import { Rating } from "@material-ui/lab";

class DoctorDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            doctorInfo: this.props.doctorInfo,
            doctorDetails: ""
        }
        try {
            fetch('http://localhost:8080/doctors/' + this.state.doctorInfo.id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + "eyJraWQiOiIzYmMwOTVmYi00NGQ4LTQ0ZjktOTJlNC1hZTFkYjUzYzliOTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJwYW5kZXlhbXJpdGE2NEBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2Jvb2tteWNvbnN1bHRhdGlvbi5jb20iLCJleHAiOjE2OTA5MjgsImlhdCI6MTY5MDkwMH0.0z_VQtupO5rackBtdD28whX-7M3eMCGhhT_I9T7eHN8A9RGNdNm-G73pWFQTR6h2w7ZyJIMmlKT9LQizvGvbDg"
                    // sessionStorage.getItem("access-token")
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ doctorDetails: data }))

        } catch (error) {
            console.error("Unable to fecth doctors details", error);
        }
    }

    render() {
        return (
            <Card className="cardStyle">
                <CardHeader className="doctor-details-header"
                    title="Doctor Details">
                </CardHeader>
                <CardContent className="doctor-details-card-content">
                    <Typography variant="headline" component="p">
                        {"Dr: "+ this.state.doctorDetails.firstName + " " +this.state.doctorDetails.lastName}
                        <br/>
                        {"Total Experience: "+ this.state.doctorDetails.totalYearsOfExp}
                        <br/>
                        {"Speciality: "+ this.state.doctorDetails.speciality}
                        <br/>
                        {"Date of Birth: "+ this.state.doctorDetails.dob}
                        {/* <br/>
                        {"City: "+ this.state.doctorDetails.address.city} */}
                        <br/>
                        {"Email: "+ this.state.doctorDetails.emailId}
                        <br/>
                        {"Mobile: "+ this.state.doctorDetails.mobile}
                        <br/>
                        <p>Rating: <Rating defaultValue={this.state.doctorDetails.rating}></Rating></p>
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default DoctorDetails;