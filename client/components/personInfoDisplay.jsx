import React, { Component } from "react";
import { InputGroup, Input, Button } from 'reactstrap';
import HeaderComponent from './header.jsx';
import history from '../history';
import userService from '../services/user.js';
import data from '../assets/states.json';
class displayPersonalInfoComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            states: data,
            Gender1: ["Male", "Female", "Other"],
            maritalstatus1: ["Married", "Unmarried", "Divorced", "Widow", "Widower"],
            eduStatus1: ["Masters", "Phd", "Graduate", "Under-Graduate", "HSC", "SSC", "Illiterate"],
            Gender: "",
            maritalstatus: "",
            eduStatus: "",
            firstname: "",
            middlename: "",
            lastname: "",

            dob: "",
            age: 0,
            addr1: "",
            addr2: "",
            addr3: "",
            City: "",
            state1: "",
            Pincode: 0,
            Phone: 0,
            Mobile: 0,
            PhysicalDisability: "NA",
            Birthsign: "NA",
            PersonalUniqueId: "",
            readOnly: true,
            showUButton: false,
            showEButton: true
        }
        this.serve = new userService()
    }

    componentDidMount() {
        const history = this.props.history;
        let id = sessionStorage.getItem("UserId");
        fetch(`http://localhost:8080/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => response.json())
            .then(resData => {
                const data = resData.data;
                console.log("data", data);
                this.setState({
                    maritalstatus: data[0].MaritalStatus,
                    eduStatus: data[0].EduStatus,
                    firstname: data[0].FullName.fname,
                    middlename: data[0].FullName.mname,
                    lastname: data[0].FullName.lname,
                    Gender: data[0].Gender,
                    dob: data[0].DateOfBirth,
                    age: data[0].Age,
                    addr1: data[0].Address.Addr1,
                    addr2: data[0].Address.Addr2,
                    addr3: data[0].Address.Addr3,
                    City: data[0].City,
                    state1: data[0].State,
                    Pincode: data[0].Pincode,
                    Phone: data[0].Phone,
                    Mobile: data[0].Mobile,
                    Birthsign: data[0].BirthSign,
                    PersonalUniqueId: data[0].PersonalUniqueId,
                    PhysicalDisability: data[0].PhysicalDisability
                })
            });
    }
    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    onClickSave() {
        let userData = {
            PersonalUniqueId: this.state.PersonalUniqueId,
            FullName: {
                fname: this.state.firstname,
                mname: this.state.middlename,
                lname: this.state.lastname
            },
            Gender: this.state.Gender,
            DateOfBirth: this.state.dob,
            Age: this.state.age,
            Address: {
                addr1: this.state.addr1,
                addr2: this.state.addr2,
                addr3: this.state.addr3
            },
            City: this.state.City,
            State: this.state.state1,
            Pincode: this.state.Pincode,
            Phone: this.state.Phone,
            Mobile: this.state.Mobile,
            PhysicalDisability: this.state.PhysicalDisability,
            MaritalStatus: this.state.maritalstatus,
            EduStatus: this.state.eduStatus,
            BirthSign: this.state.Birthsign,
            UserName: ''
        }
        this.serve.updateUserData(userData, (err, res) => {
            if (err) {
                history.push('/error');
            }
            else {

                history.push('/personalInfoUser');

            }
        })
    }
    onClickEdit() {
        this.setState(prevState => ({ readOnly: !prevState.readOnly }))
        this.setState({ showUButton: true });
        this.setState({ showEButton: false });
    }

    render() {
        return (
            <div>
                <HeaderComponent></HeaderComponent>
                <div className="container col-sm-10" style={{ 'paddingTop': '50px' }}>
                    <h2><font color="white">Create User</font></h2><hr />
                    <font color="white"><label>Name</label></font><hr />
                    <div style={{ 'width': '33%', 'float': 'left' }}>
                        <Input type="text" name="firstname" readOnly={this.state.readOnly} value={this.state.firstname} onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input placeholder="Middle Name" type="text" readOnly={this.state.readOnly} name="middlename" onChange={this.handleOnChange.bind(this)} defaultValue={this.state.middlename} />
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input placeholder="Last Name" type="text" readOnly={this.state.readOnly} name="lastname" defaultValue={this.state.lastname}
                            onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <hr />
                    <div style={{ 'width': '33%', 'float': 'left' }}>
                        {this.state.showUButton ?
                            <Input type="select" name="Gender" placeholder="Gender" onChange={this.handleOnChange.bind(this)}>
                                <option>{this.state.Gender}</option>
                                {this.state.Gender1.map((c, i) => (
                                    <option key={i} data={c}>{c}</option>
                                ))
                                }
                            </Input>
                            :
                            <Input type="text" name="Gender" readOnly={this.state.readOnly} placeholder="Gender" defaultValue={this.state.Gender} />

                        }
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input type="text" placeholder="Date of Birth" readOnly={this.state.readOnly} name="dob" defaultValue={this.state.dob} onChange={this.handleOnChange.bind(this)}
                        />
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input type="text" readOnly placeholder="Age" readOnly={this.state.readOnly} name="age" defaultValue={this.state.age} onChange={this.handleOnChange.bind(this)} />
                    </div> <br />
                    <hr />
                    <font color="white"><label>Address</label></font>
                    <div style={{ 'width': '97%', 'float': 'left' }}>
                        <Input type="text" readOnly={this.state.readOnly} placeholder="Address Line 1" name="addr1" defaultValue={this.state.addr1} onChange={this.handleOnChange.bind(this)} /><br />

                        <Input type="text" readOnly={this.state.readOnly} placeholder="Address Line 2" name="addr2" defaultValue={this.state.addr2} onChange={this.handleOnChange.bind(this)} /><br />
                        <Input type="text" readOnly={this.state.readOnly} placeholder="Address Line 3" name="addr3" defaultValue={this.state.addr3} onChange={this.handleOnChange.bind(this)} /><br />
                        <Input type="text" readOnly={this.state.readOnly} placeholder="City" name="City" defaultValue={this.state.City} onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>

                        {this.state.showUButton ?
                            <Input type="select" name="state1" onChange={this.handleOnChange.bind(this)}>
                                <option>{this.state.state1}</option>
                                {
                                    (Object.values(this.state.states)).map((c, i) => (
                                        <option key={i} data={c}>{c}</option>
                                    ))
                                }
                            </Input>

                            : <Input type="text" name="state1" readOnly={this.state.readOnly} defaultValue={this.state.state1} onChange={this.handleOnChange.bind(this)} />}

                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Pincode" readOnly={this.state.readOnly} name="Pincode" defaultValue={this.state.Pincode} onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Phone Number" readOnly={this.state.readOnly} name="Phone" defaultValue={this.state.Phone} onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Mobile Number" readOnly={this.state.readOnly} name="Mobile" defaultValue={this.state.Mobile} onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <hr />
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <small><font color="white">Marital Status</font></small>
                        {this.state.showUButton ?
                            <Input type="select" name="maritalstatus" onChange={this.handleOnChange.bind(this)}>
                                <option>{this.state.maritalstatus}</option>
                                {this.state.maritalstatus1.map((c, i) => (
                                    <option key={i} data={c}>{c}</option>
                                ))
                                }
                            </Input>
                            :
                            <Input type="text" name="maritalstatus" readOnly={this.state.readOnly} defaultValue={this.state.maritalstatus} onChange={this.handleOnChange.bind(this)} />
                        }



                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <small><font color="white">Educational Status</font></small>
                        {this.state.showUButton ?
                            <Input type="select" name="eduStatus" onChange={this.handleOnChange.bind(this)}>
                                <option>{this.state.eduStatus}</option>
                                {this.state.eduStatus1.map((c, i) => (
                                    <option key={i} data={c}>{c}</option>
                                ))
                                }
                            </Input>

                            : <Input type="text" name="eduStatus" readOnly={this.state.readOnly} defaultValue={this.state.eduStatus} onChange={this.handleOnChange.bind(this)} />

                        }
                    </div>
                    <div style={{ 'width': '97%', 'float': 'left' }}>
                        <div>
                            <Input type="text" placeholder="Birthsign" readOnly={this.state.readOnly} name="Birthsign" defaultValue={this.state.Birthsign} onChange={this.handleOnChange.bind(this)} />
                        </div>
                        <div>
                            <Input type="text" placeholder="PhysicalDisability" readOnly={this.state.readOnly} name="PhysicalDisability" defaultValue={this.state.PhysicalDisability} onChange={this.handleOnChange.bind(this)} />
                        </div>
                    </div>
                    {this.state.showEButton ? <Button color="success" onClick={this.onClickEdit.bind(this)} >Edit</Button> : null}

                    {this.state.showUButton ? <Button color="success" onClick={this.onClickSave.bind(this)}>Update</Button> : null}
                    <div></div>
                </div>
            </div >

        );
    }

}
export default displayPersonalInfoComponent;