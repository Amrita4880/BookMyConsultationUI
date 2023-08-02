import React, { Component } from "react";
import {
  Button,
  Tabs,
  Tab
} from "@material-ui/core";
import Header from "../../common/header/Header";
import DoctorList from "../doctorList/DoctorList";
import './Home.css'
import Appointment from "../appointment/Appointment";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      
    }
  }

  tabChangeHandler = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header baseUrl={this.props.baseUrl} />
        <Tabs
          value={this.state.value}
          onChange={this.tabChangeHandler}
          variant="fullWidth"
        >
    
          <Tab label="DOCTORS" />
          <Tab label="APPOINTMENTS" />
        </Tabs>

        {this.state.value === 0 && (
          <DoctorList classes="doctorList"></DoctorList>
        )}

        {this.state.value === 1 && (
          <div className="Appointment-tab">
            <Appointment/>
          </div>
        )}
      </div>

    );
  }
}
export default Home;