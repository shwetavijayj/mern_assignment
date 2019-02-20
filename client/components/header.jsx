import React, { Component } from "react";
import history from '../history';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href="/"><font color="white">Home</font></NavbarBrand>
                  
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/"><font color="white">Logout</font></NavLink>
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
    }

    createUser(){
        history.push('/createUser');
    }
    createRole(){
        history.push('/createRole');
    }
    home(){
        history.push('/PersonalInfoAdmin');
    }
    logout(){
        history.push('/');
    }
    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand onClick={this.home}><font color="white">Home</font></NavbarBrand>
                    <Button color="link" onClick={this.createUser}><font color="white">Create User</font></Button>
                    <Button color="link" onClick={this.createRole}><font color="white">Create Role</font></Button>
                    <Nav className="ml-auto" navbar>
                       
                        <NavItem>
                            <NavLink onClick={this.logout}><font color="white">Logout</font></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default HeaderComponent;