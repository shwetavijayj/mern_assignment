import React, { Component } from "react";
import { InputGroup, Input, Button } from 'reactstrap';
import userService from '../services/user.js';
import history from '../history';
class LoginComponent extends Component {

    constructor(props) {
        //Access Anythings from Super/Base Class-Super
        super(props);

        //State declaration
        //Event -Binding to Components
        this.state = {
            fields: {},
            errors: {},
            username: "",
            password: "",

        }
        this.serve = new userService()
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "cannot be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields: "" });
    }

    signIn() {
        var UserData = {
            UserName: this.state.username,
            Password: this.state.password
        }
        let temp2 = "";
        const history = this.props.history;


        this.serve.authenticateUser(UserData, (err, res) => {
            if (err) {
                history.push('/error');
            }
            else {
                let res1 = JSON.parse(res);

                console.log("Result", res1.UserName);

                sessionStorage.setItem("authorization", `${res1.responseToken}`);
                sessionStorage.setItem("roleId", `${res1.roleId}`);
                sessionStorage.setItem("UserName", `${res1.UserName}`);
                sessionStorage.setItem("UserId", `${res1.UserId}`);
                console.log("Session Storage", sessionStorage.getItem("UserId"));
                if (res1.roleId === 1) {
                    history.push('/PersonalInfoAdmin');
                    localStorage.setItem("AdminFlag", true);
                }
                else if (res1.roleId === 2) {
                    history.push('/');
                }
                else if (res1.roleId === 3) {
                    if (res1.PersonalUniqueId) {
                        history.push('/personalInfoUser');
                    } else {
                        history.push('/personalInfoUseredit');
                    }
                }
            }
        });
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //Render Method Encapsulates DOM & it's data with Behaviours.
    //return() - returns the DOM Objects called as Virtual DOM.
    render() {
        return (
            <div className="container col-sm-4">
                <form name="loginform" className="loginform">
                    <table className="table" frame="box">
                        <tbody>
                            <tr >
                                <td colSpan="2">
                                    <center> <img src="../images/user.png" style={{ 'borderRadius': '50%', 'width': '170px', 'height': '170px' }}></img></center>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <InputGroup>
                                        <Input placeholder="username" required type="text" name="username" value={this.state.username} onChange={this.onChange.bind(this)} onBlur={this.handleChange.bind(this, "username")} />
                                        <small style={{ color: "red" }}>{this.state.errors["username"]}</small>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <InputGroup>
                                        <Input placeholder="password" required type="text" name="password" onChange={this.onChange.bind(this)} value={this.state.password} />
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td><center><Button color="danger" onClick={this.handleValidation.bind(this)}>Clear</Button></center></td>
                                <td><center><Button color="success" onClick={this.signIn.bind(this)}>Login</Button></center></td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    {/* <Link to="#">New User</Link> */}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    {/* <Link to="#">forgot Password?</Link> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div >
        );
    }
}

export default LoginComponent;


