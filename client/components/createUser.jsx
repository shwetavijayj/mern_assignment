import React, { Component } from "react";
import { InputGroup, Input, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {AdminHeaderComponent} from './header.jsx';
import adminService from '../services/admin.js';
import history from '../history';
class CreateUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName : "",
            EmailAddress:"",
            roleName:"",
            roles: ["Admin", "Operator", "Access_user"],
            msg:""
            
        }
        this.serve = new adminService();
    }
    onChangeValues(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onClickSave(){
        let newUser ={
            UserName : this.state.UserName, 
            EmailAddress:this.state.EmailAddress,
            roleName:this.state.roleName
        }
        console.log("Save button",newUser);
        this.serve.createUser(newUser,(err,res)=>{
            if (err) {
                history.push('/error');
            }
            else{
                if(res.Flag === "True"){
                    this.state.msg = "User created successfully."
                    history.push('/PersonalInfoAdmin');
                }else{
                    this.state.msg = "Fail to create new user."
                    history.push('/createUser');
                }
            }
        })
    }
    render() {
        return (
            <div>
                <AdminHeaderComponent message={this.state.msg}></AdminHeaderComponent>
                <div className="container col-sm-6" style={{ 'paddingTop': '50px' }}>
                    <h2><font color="white">Create User</font></h2><hr />

                    <table className="table">
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <InputGroup>
                                        <Input placeholder="username" type="text" name="UserName" 
                                        value={this.state.UserName}
                                        onChange={this.onChangeValues.bind(this)} />
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <InputGroup>
                                    <Input placeholder="Email-id" type="text" name="EmailAddress" 
                                        value={this.state.EmailAddress}
                                        onChange={this.onChangeValues.bind(this)}/>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                <InputGroup>
                                <Input type="select" name="roleName" placeholder="Role"
                                    onChange={this.onChangeValues.bind(this)}>
                            <option>Select Role</option>
                            {this.state.roles.map((c, i) => (
                                <option key={i} data={c}>{c}</option>
                            ))
                            }
                        </Input>
                        </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td><center><Button color="danger" >Clear</Button></center></td>
                                <td><center><Button color="success" onClick={this.onClickSave.bind(this)} >Create User</Button></center></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CreateUserComponent;