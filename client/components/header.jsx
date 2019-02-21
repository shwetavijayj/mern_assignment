import React, { Component } from "react";
import history from '../history';
import LogOutService from '../services/logout.js';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';


class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.serve = new LogOutService()
    }
    logout(){
        this.serve.logout((err,res)=>{
            if(err){
                history.push('/error');
            }
            else{
                history.push('/');
            }
        })  
    }
    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href="/"><font color="white">Home</font></NavbarBrand>
                  
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button color="link" onClick={this.logout.bind(this)}><font color="white">Logout</font></Button>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export class AdminHeaderComponent extends Component {
    constructor(props) {
        super(props);
       this.serve = new LogOutService();
    }

    createUser(){
        history.push('/createUser');
    }
    createRole(){
        history.push('/createRole');
    }
    addUserInfo(){
        history.push('personalInfoUseredit');
    }
    home(){
        history.push('/PersonalInfoAdmin');
    }
    logout(){
        this.serve.logout((err,res)=>{
            if(err){
                history.push('/error');
            }
            else{
                history.push('/');
            }
        })
    }
    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand onClick={this.home}><font color="white">Home</font></NavbarBrand>
                    <Button color="link" onClick={this.addUserInfo}><font color="white">Add User Information.</font></Button>
                    <Button color="link" onClick={this.createUser}><font color="white">Create User</font></Button>
                    <Button color="link" onClick={this.createRole}><font color="white">Create Role</font></Button>
                    <Nav className="ml-auto" navbar>
                       
                        <NavItem>
                            <Button color="link" onClick={this.logout.bind(this)}><font color="white">Logout</font></Button>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}



export default HeaderComponent;