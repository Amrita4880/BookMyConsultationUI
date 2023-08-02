import React, { Component } from "react";
import './DoctorList.css';
import Modal from "react-modal";
import { Button, MenuItem, Paper, Select } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import BookAppointment from "./BookAppointment";
import DoctorDetails from "./DoctorDetails";

const customStyles = {
    content: {
        // margin:"auto",
        "max-width": "800px",
        "height": "70%",
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

class DoctorList extends Component {
    constructor() {
        super();
        this.state = {
            doctors: [],
            selectedSpeciality: "",
            filteredDoctors: [],
            specialityList: [],
            selectedSpeciality: "",
            modalIsOpen: false,
            showBookAppointment: false,
            showDoctorDetails: false,
            selectedDoctor: ""
        };
    }

    componentDidMount() {
        try {
            fetch('http://localhost:8080/doctors')
                .then((response) => response.json())
                .then((data) => this.setState({ doctors: data }))
                .then((response) => this.loadPrep())

        } catch (error) {
            console.error("Unable to fetch doctors details", error);
        }
    }

    loadPrep() {
        this.setState({ specialityList: [...new Set(this.state.doctors.map(doctor => doctor.speciality))] });
        this.filterDoctor("");
    }

    specialityDropdownSelected = (event) => {
        this.setState({ selectedSpeciality: event.target.value });
        this.filterDoctor(event.target.value);
    }

    filterDoctor = (specialityValue) => {
        this.setState({
            filteredDoctors: specialityValue
                ? this.state.doctors.filter((doctor) => doctor.speciality == specialityValue)
                : this.state.doctors
        });
    }

    showBookAppointmentDialogue = (doctor) => {
        this.setState({ selectedDoctor : doctor })
        this.setState({ showBookAppointment: true });
        this.setState({ showDoctorDetails: false });
        this.setState({ modalIsOpen: true });
    }

    showDoctorDetailsDialogue = (doctor) => {
        this.setState({ selectedDoctor : doctor })
        this.setState({ showDoctorDetails: true });
        this.setState({ showBookAppointment: false });
        this.setState({ modalIsOpen: true });
    };

    hideModalHandler = () => {
        this.setState({ modalIsOpen: false });
        this.setState({ showBookAppointment: false });
        this.setState({ showDoctorDetails: false });
    };

    render() {
        return (
            <div className="doctor-list-container">
                <p>Select Speciality</p>
                <div className="doctor-list-contents">
                    {/* {this.getSpecialityList()} */}
                    <Select className="select-speciality-dropdown" value={this.state.selectedSpeciality} onChange={this.specialityDropdownSelected}>
                        {/* <option value=""></option> */}
                        {
                            this.state.specialityList.map((speciality, index) => (
                                <MenuItem value={speciality}>{speciality}</MenuItem>
                            ))
                        }
                    </Select>
                </div>

                {this.state.filteredDoctors.length > 0 && (
                    <div>
                        {this.state.filteredDoctors.map((doctor, index) => (
                            <Paper className="doctor-paper-box">
                                <div>
                                    <p>Doctor Name : {doctor.firstName + " " + doctor.lastName}</p>
                                    <p>Speciality : {doctor.speciality}</p>
                                    <p>Rating : <Rating value={doctor.rating}></Rating> </p>
                                    
                                    <div>
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        style={{ width: "45%", margin: "10px" }}
                                        onClick={()=>{this.showBookAppointmentDialogue(doctor)}}>
                                            Book Appointment
                                    </Button>
                                    <Button 
                                        variant="contained"
                                        color="secondary"
                                        style={{width: "45%", margin: "10px", backgroundColor: "#008000"}}
                                        onClick={()=>{this.showDoctorDetailsDialogue(doctor)}}>
                                            View Details
                                    </Button>
                                    </div>
                                </div>
                            </Paper>
                        ))}
                </div>
                )}

                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.hideModalHandler}
                    contentLabel="DoctorDetails-BookAppointment"
                    style={customStyles}>
                    {this.state.showBookAppointment ?
                        <BookAppointment 
                            doctorInfo={this.state.selectedDoctor}
                            closeModal={this.hideModalHandler} >
                            </BookAppointment>
                        : <div></div>
                    }
                    {this.state.showDoctorDetails ?
                        <DoctorDetails 
                            doctorInfo={this.state.selectedDoctor}
                            closeModal={this.hideModalHandler}>
                            </DoctorDetails>
                        : <div></div>
                    }
                </Modal>
            </div>
        );
    }

}

export default DoctorList;