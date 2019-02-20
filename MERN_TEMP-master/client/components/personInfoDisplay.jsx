import React, { Component } from "react";
import { InputGroup, Input, Button } from 'reactstrap';
import HeaderComponent from './header.jsx';
import history from '../history';
import userService from '../services/user.js';
class displayPersonalInfoComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            Gender: "",
            maritalstatus: "",
            eduStatus: "",
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
            edustatus: "",
            readOnly: true
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
                    gender: data[0].Gender,
                    dob: data[0].DateOfBirth,
                    age: data[0].Age,
                    addr1: data[0].Address.Addr1,
                    addr2: data[0].Address.Addr2,
                    addr3: data[0].Address.Addr3,
                    city: data[0].City,
                    state1: data[0].State,
                    pin: data[0].Pincode,
                    phone: data[0].Phone,
                    mobile: data[0].Mobile
                })
                
            });
    }
    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    onClickSave(){
        userData = {

        }
        this.serve.saveUserData()
    }
    onClickEdit(){
        this.setState(prevState => ({readOnly: !prevState.readOnly}))
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
                        <Input placeholder="Last Name" type="text" readOnly={this.state.readOnly} name="lastname" defaultValue={this.state.lastname} />
                    </div>
                    <hr />
                    <div style={{ 'width': '33%', 'float': 'left' }}>
                        <Input type="text" name="gender" readOnly={this.state.readOnly} placeholder="gender" defaultValue={this.state.gender}>
                            <option>{this.state.gender}</option>
                        </Input>
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input type="text" placeholder="Date of Birth" readOnly={this.state.readOnly} name="dob" defaultValue={this.state.dob}
                        />
                    </div>
                    <div style={{ 'width': '32%', 'float': 'left' }}>
                        <Input type="text" readOnly placeholder="Age" readOnly={this.state.readOnly} name="age" defaultValue={this.state.age} />
                    </div> <br />
                    <hr />
                    <font color="white"><label>Address</label></font>
                    <div style={{ 'width': '97%', 'float': 'left' }}>
                        <Input type="text" readOnly={this.state.readOnly} placeholder="Address Line 1" name="addr1" defaultValue={this.state.addr1} /><br />
                        <Input type="text" readOnly={this.state.readOnly} placeholder="Address Line 2" name="addr2" defaultValue={this.state.addr2} /><br />
                        <Input type="text" readOnly={this.state.readOnly} placeholder="Address Line 3" name="addr3" defaultValue={this.state.addr3} /><br />
                        <Input type="text" readOnly={this.state.readOnly} placeholder="City dropdown" name="city" defaultValue={this.state.city} />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="select" name="state1" readOnly={this.state.readOnly} defaultValue={this.state.state1}>
                            <option>{this.state.state1}</option>
                        </Input>
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Pincode" readOnly={this.state.readOnly} name="pin" value={this.state.pin} />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Phone Number" readOnly={this.state.readOnly} name="phone" value={this.state.phone} />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Mobile Number" readOnly={this.state.readOnly} name="mobile" value={this.state.mobile} />
                    </div>
                    <hr />
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <small><font color="white">Marital Status</font></small>
                        <Input type="select" name="maritalstatus" readOnly={this.state.readOnly} defaultValue={this.state.maritalstatus}>
                            <option>{this.state.maritalstatus}</option>
                        </Input>
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <small><font color="white">Educational Status</font></small>
                        <Input type="select" name="edustatus" readOnly={this.state.readOnly} defaultValue={this.state.eduStatus}>
                            <option>{this.state.eduStatus}</option>
                        </Input>
                    </div>
                    <Button color="success" onClick={this.onClickEdit.bind(this)} >Edit</Button>
                </div>
            </div >

        );
    }

}
export default displayPersonalInfoComponent;