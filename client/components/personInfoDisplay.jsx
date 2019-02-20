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
            maritalstatus1: ["Married", "Unmarried", "Divorced", "Widow", "Widower"],
            eduStatus1: ["Masters", "Phd", "Graduate", "Under-Graduate", "HSC", "SSC", "Illiterate"],
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
            PhysicalDisability:"",
            Birthsign:"",
            readOnly: true,
            showUButton: false,
            showEButton:true
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
                    addr1: data[0].Address.addr1,
                    addr2: data[0].Address.addr2,
                    addr3: data[0].Address.addr3,
                    city: data[0].City,
                    state1: data[0].State,
                    pin: data[0].Pincode,
                    phone: data[0].Phone,
                    mobile: data[0].Mobile,
                    Birthsign:data[0].BirthSign,
                    PhysicalDisability:data[0].PhysicalDisability
                })  
            });
    }
    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    onClickSave(){
        userData = {
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
        Phone: this.state.phone,
        Mobile: this.state.mobile,
        PhisicalDisability: this.state.PhisicalDisability,
        MaritalStatus: this.state.maritalstatus,
        EduStatus: this.state.eduStatus,
        BirthSign: this.state.Birthsign,
        }
        this.serve.updateUserData(userData,(err,res)=>{
            if (err) {
                console.log("Error",err);
            }
            else{
                
                    history.push('/personalInfoUser');
                
            }
        })
    }
    onClickEdit(){
        this.setState(prevState => ({readOnly: !prevState.readOnly}))
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
                        
                            { this.state.showUButton ? 
                                <Input type="select" name="state1">
                                <option>{this.state.state1}</option>
                                {
                                    (Object.values(this.state.states)).map((c, i) => (
                                        <option key={i} data={c}>{c}</option>
                                    ))
                                }
                            </Input>
                                
                                :  <Input type="text" name="state1" readOnly={this.state.readOnly} defaultValue={this.state.state1} />} 
                        
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Pincode" readOnly={this.state.readOnly} name="pin" defaultvalue={this.state.pin} />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Phone Number" readOnly={this.state.readOnly} name="phone" defaultvalue={this.state.phone} />
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <Input type="text" placeholder="Mobile Number" readOnly={this.state.readOnly} name="mobile" defaultvalue={this.state.mobile} />
                    </div>
                    <hr />
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <small><font color="white">Marital Status</font></small>
                        { this.state.showUButton ? 
                        <Input type="select" name="maritalstatus">
                        <option>{this.state.maritalstatus}</option>
                        {this.state.maritalstatus1.map((c, i) => (
                            <option key={i} data={c}>{c}</option>
                        ))
                        }
                    </Input>
                        :
                        <Input type="text" name="maritalstatus" readOnly={this.state.readOnly} defaultValue={this.state.maritalstatus}/>
                        }
                        
                            
                        
                    </div>
                    <div style={{ 'width': '48.5%', 'float': 'left' }}>
                        <small><font color="white">Educational Status</font></small>
                        { this.state.showUButton ? 
                        <Input type="select" name="eduStatus">
                        <option>{this.state.eduStatus}</option>
                        {this.state.eduStatus1.map((c, i) => (
                            <option key={i} data={c}>{c}</option>
                        ))
                        }
                    </Input>

                        :<Input type="text" name="eduStatus" readOnly={this.state.readOnly} defaultValue={this.state.eduStatus} />
                            
                    } 
                    </div>
                    { this.state.showEButton ?  <Button color="success" onClick={this.onClickEdit.bind(this)} >Edit</Button>: null }
                    
                    { this.state.showUButton ? <Button color="success" onClick={this.onClickSave.bind(this)}>Update</Button> : null }
                    <div></div>
                </div>
            </div >

        );
    }

}
export default displayPersonalInfoComponent;