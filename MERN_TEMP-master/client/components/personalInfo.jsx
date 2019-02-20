import React, { Component } from "react";
import { InputGroup, Input, Button } from 'reactstrap';
import HeaderComponent from './header.jsx';

// var data = require('json!../assets/states.json');
var data = require('../assets/states.json');
class PersonalInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Gender: ["Male", "Female", "Other"],
            maritalstatus: ["Married", "Unmarried", "Divorced", "Widow", "Widower"],
            eduStatus: ["Masters", "Phd", "Graduate", "Under-Graduate", "HSC", "SSC", "Illiterate"],
            states: data,
            firstname: "",
            middlename: "",
            lastname: "",
            gender: "",
            dob: 0,
            age: 0,
            addr1: "",
            addr2: "",
            addr3: "",
            city: "",
            state1: "",
            pin: 0,
            phone: 0,
            mobile: 0,
            mstatus: "",
            edustatus: ""
        }

    }
    dateCheck(e) {
        this.setState({ [e.target.name]: e.target.value });
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        console.log(yyyy);
        let enteredDate = e.target.value;
        var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
        var dt = new Date(enteredDate.replace(pattern, '$3-$2-$1'));

        if ((today.getFullYear() <= dt.getFullYear()) || ((today.getMonth() + 1) < (dt.getMonth() + 1))) {
            alert("Hello");
            //1.write nested structure to check valid date
            //2. validate all fields
            //3.after login give call to backend api
        }
    }
    render() {
        return (
            <div>
                <HeaderComponent></HeaderComponent>
                <div className="container col-sm-10" style={{ 'paddingTop': '50px' }}>
                    <h2><font color="white">Create User</font></h2><hr />
                    <font color="white"><label>Name</label></font><hr />
                    <div style={{ 'width': '33%', 'float': 'left' }}>
                        <Input placeholder="First Name" type="text" name="firstname" />
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input placeholder="Middle Name" type="text" name="middlename" />
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input placeholder="Last Name" type="text" name="lastname" />
                    </div>
                    <hr />
                    <div style={{ 'width': '33%', 'float': 'left' }}>
                        <Input type="select" name="gender" placeholder="gender">
                            <option>Select Gender</option>
                            {this.state.Gender.map((c, i) => (
                                <option key={i} data={c}>{c}</option>
                            ))
                            }
                        </Input>
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input type="date" placeholder="Date of Birth" name="dob" value={this.state.dob}
                            onChange={this.dateCheck.bind(this)}
                        />
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input type="text" readOnly placeholder="Age" name="age" />
                    </div><br />
                    <hr />
                    <font color="white"><label>Address</label></font>
                    <div style={{ 'width': '97%', 'float': 'left' }}>
                        <Input type="text" placeholder="Address Line 1" name="addr1" /><br />
                        <Input type="text" placeholder="Address Line 2" name="addr2" /><br />
                        <Input type="text" placeholder="Address Line 3" name="addr3" /><br />
                        <Input type="text" placeholder="City dropdown" name="city" />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="select" name="state1">
                            <option>Select State</option>
                            {
                                (Object.values(this.state.states)).map((c, i) => (
                                    <option key={i} data={c}>{c}</option>
                                ))
                            }
                        </Input>
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Pincode" name="pin" />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Phone Number" name="phone" />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Mobile Number" name="mobile" />
                    </div>
                    <hr />
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <small><font color="white">Marital Status</font></small>
                        <Input type="select" name="mstatus">

                            {this.state.maritalstatus.map((c, i) => (
                                <option key={i} data={c}>{c}</option>
                            ))
                            }
                        </Input>
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <small><font color="white">Educational Status</font></small>
                        <Input type="select" name="edustatus">

                            {this.state.eduStatus.map((c, i) => (
                                <option key={i} data={c}>{c}</option>
                            ))
                            }
                        </Input>
                    </div>
                </div>
            </div >
        );
    }

}

export default PersonalInfoComponent;