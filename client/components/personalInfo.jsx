import React, { Component } from "react";
import { InputGroup, Input, Button } from 'reactstrap';
import HeaderComponent from './header.jsx';
import  adminService  from '../services/admin.js';
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
            dob: Date,
            age: 0,
            addr1: "",
            addr2: "",
            addr3: "",
            city: "",
            state1: "",
            pin: 0,
            Phone: 0,
            mobile: 0,
            mstatus: "",
            edustatus: "",
            PhysicalDisability:"NA",
            Birthsign:"NA"
        }
        this.serve = new adminService();
    }
    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    handleOnChangeDate(e){
        this.setState({ [e.target.name]: e.target.value });
        var today = new Date();
        var yyyy = today.getFullYear();
        var selectedText = document.getElementById('dob').value;
        var selectedDate = new Date(selectedText);
        let age = yyyy - selectedDate.getFullYear() ;
        this.setState({"age":parseInt(age)});
        this.state.age = age;
        
    }
    onClickSave(){
        let userData = {
            PersonalUniqueId:this.state.PersonalUniqueId,
        FullName: {
            fname: this.state.firstname,
            mname: this.state.middlename,
            lname: this.state.lastname
        },
        Gender: this.state.gender,
        DateOfBirth: this.state.dob,
        Age: this.state.age,
        Address: {
            addr1:this.state.addr1,
            addr2:this.state.addr2,
            addr3:this.state.addr3
        },
        City: this.state.city,
        State: this.state.state1,
        Pincode: this.state.pin,
        Phone: this.state.Phone,
        Mobile: this.state.mobile,
        PhysicalDisability: this.state.PhysicalDisability,
        MaritalStatus: this.state.mstatus,
        EduStatus: this.state.edustatus,
        BirthSign: this.state.Birthsign
        }
        if(sessionStorage.getItem("roleId") == 1){
            this.serve.saveData1(userData,(err,res)=>{
                if(err){
                    history.push('/error');
                }
                else{
                    console.log("Data Saved successfully.")
                }
            })
        }else if(sessionStorage.getItem("roleId") == 3){
            this.serve.saveDataUser(userData,(err,res)=>{
                if(err){
                    history.push('/error');
                }
                else{
                    console.log("Data Saved suuccessfully.")
                }
            })
        }
    }
    onClickClear() {
        this.setState({'firstname': ""}),
        this.setState({'middlename': ""}),
        this.setState({'lastname': ""}),
        this.setState({'gender': ""}),
        this.setState({'dob': ""}),
        this.setState({'age': 0}),
        this.setState({'addr1': ""}),
        this.setState({'addr2': ""}),
        this.setState({'addr3': ""}),
        this.setState({'city': ""}),
        this.setState({'state1': ""}),
        this.setState({'pin': 0}),
        this.setState({'Phone': 0}),
        this.setState({'mobile': 0}),
        this.setState({'mstatus': ""}),
        this.setState({'edustatus': ""}),
        this.setState({'PhysicalDisability':"NA"}),
        this.setState({'Birthsign':"NA"})
    }
    render() {
        return (
            <div>
                <HeaderComponent></HeaderComponent>
                <div className="container col-sm-10" style={{ 'paddingTop': '50px' }}>
                    <h2><font color="white">Create User</font></h2><hr />
                    <font color="white"><label>Name</label></font><hr />
                    <div style={{ 'width': '33%', 'float': 'left' }}>
                        <Input placeholder="First Name" type="text" name="firstname"  value={this.state.firstname} onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input placeholder="Middle Name" type="text" name="middlename"  value={this.state.middlename} onChange={this.handleOnChange.bind(this)}/>
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input placeholder="Last Name" type="text" name="lastname"  value={this.state.lastname} onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <hr />
                    <div style={{ 'width': '33%', 'float': 'left' }}>
                        <Input type="select" name="gender" placeholder="gender"  value={this.state.gender} onChange={this.handleOnChange.bind(this)}>
                            <option>Select Gender</option>
                            {this.state.Gender.map((c, i) => (
                                <option key={i} data={c}>{c}</option>
                            ))
                            }
                        </Input>
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input type="date" id="dob" placeholder="Date of Birth" name="dob" value={this.state.dob}
                            onChange={this.handleOnChangeDate.bind(this)}
                        />
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                    <Input type="text" readOnly placeholder={this.state.age} readOnly name="age"  value={this.state.age} onChange={this.handleOnChange.bind(this)} />
                    </div><br />
                    <hr />
                    <font color="white"><label>Address</label></font>
                    <div style={{ 'width': '97%', 'float': 'left' }}>
                        <Input type="text" placeholder="Address Line 1" name="addr1"  value={this.state.addr1} onChange={this.handleOnChange.bind(this)} /><br />
                        <Input type="text" placeholder="Address Line 2" name="addr2"  value={this.state.addr2} onChange={this.handleOnChange.bind(this)} /><br />
                        <Input type="text" placeholder="Address Line 3" name="addr3"  value={this.state.addr3} onChange={this.handleOnChange.bind(this)} /><br />
                        <Input type="text" placeholder="City" name="city"  value={this.state.city} onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="select" name="state1"
                         value={this.state.state1}
                        onChange={this.handleOnChange.bind(this)}>
                            <option>Select State</option>
                            {
                                (Object.values(this.state.states)).map((c, i) => (
                                    <option key={i} data={c}>{c}</option>
                                ))
                            }
                        </Input>
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Pincode" name="pin"
                         value={this.state.pin}
                        onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Phone Number" 
                         value={this.state.Phone}
                        name="Phone" Value={this.state.Phone} onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Mobile Number"
                         value={this.state.mobile}
                        name="mobile" onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <hr />
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <small><font color="white">Marital Status</font></small>
                        <Input type="select" name="mstatus"
                         value={this.state.mstatus}
                        onChange={this.handleOnChange.bind(this)}>

                            {this.state.maritalstatus.map((c, i) => (
                                <option key={i} data={c}>{c}</option>
                            ))
                            }
                        </Input>
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <small><font color="white">Educational Status</font></small>
                        <Input type="select" name="edustatus"
                         value={this.state.edustatus}
                        onChange={this.handleOnChange.bind(this)}>

                            {this.state.eduStatus.map((c, i) => (
                                <option key={i} data={c}>{c}</option>
                            ))
                            }
                        </Input>
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                    <small><font color="white">Birth Sign</font></small>
                        <Input type="text" name="Birthsign" 
                        value={this.state.Birthsign}
                        onChange={this.handleOnChange.bind(this)}>
                        </Input>
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                    <small><font color="white">PhysicalDisability</font></small>
                    <Input type="text" name="PhysicalDisability" 
                     value={this.state.PhysicalDisability}
                    onChange={this.handleOnChange.bind(this)}>
                        </Input>
                        </div>
                    <div>
                    <Button color="danger" onClick={this.onClickClear.bind(this)}>Clear</Button>  
                    <Button color="success" onClick={this.onClickSave.bind(this)}>Save</Button>
                    </div>
                </div>
            </div >
        );
    }

}

export default PersonalInfoComponent;