import React, { Component } from "react";
import history from '../history';
import { InputGroup, Input, Button } from 'reactstrap';
import { AdminHeaderComponent } from './header.jsx';
import adminService from '../services/admin';
class createRoleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: "",
            roles: [],
            errorMsg: "",

        }
        this.serve = new adminService();
    }
    onChangeValues(e) {
        this.setState({ "errorMsg": "" });
        this.setState({ [e.target.name]: e.target.value });
    }
    onClickSave() {
        let flag = 0;
        for (const val of this.state.roles) {
            if (val.roleName == this.state.userRole) {
                flag = 1;
                break;
            }

        }
        if (flag == 1) {
            this.setState({ "errorMsg": "User Already exist" })
        } else {
            let cnt = this.state.roles.length;
            console.log("cnt", ++cnt);
            let newRole = {
                roleId: cnt,
                roleName: this.state.userRole
            }
            this.serve.createRole(newRole, (err, res) => {
                if (err) {
                    history.push('/error');
                }
                else {
                    history.push('/PersonalInfoAdmin');
                }
            })
        }

    }
    componentDidMount() {
        this.serve.getAllUserRole((err, res) => {
            if (err) {
                history.push('/error');
            }
            else {
                this.setState({ roles: res.data.data.data });
            }
        })
    }
    render() {
        return (
            <div>
                <AdminHeaderComponent></AdminHeaderComponent>
                <div className="container col-sm-6" style={{ 'paddingTop': '50px' }}>
                    <h2><font color="white">Create Role</font></h2><hr />
                    <table className="table">
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <InputGroup>
                                        <Input placeholder="Enter Role" type="text" name="userRole" required
                                            value={this.state.userRole}
                                            onChange={this.onChangeValues.bind(this)} />
                                    </InputGroup>
                                    <div>{this.state.errorMsg}</div>
                                </td>
                            </tr>
                            <tr>
                                <td><center><Button color="danger" >Clear</Button></center></td>
                                <td><center><Button color="success" onClick={this.onClickSave.bind(this)} >Create Role</Button></center></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default createRoleComponent;