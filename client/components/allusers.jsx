import React, { Component } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Collapse
} from 'reactstrap';
import { AdminHeaderComponent } from './header.jsx';
import adminService from '../services/admin.js';
class AllUserlistComponent extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            Users: [],
            incompleteprofile: [],
            collapse: false,
            user1: "",
            searchText: ""
        }

        this.serve = new adminService();
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidMount() {
        // console.log("Hello");
        this.serve.getAllUserData((err, res) => {
            if (err) {
                history.push('/error');
            } else {
                this.setState({ Users: res.result.data })
                console.log("Users", this.state.Users);
            }
        });

    }
    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });


    }
    render() {
        let filterUserList = this.state.Users.filter((user) => {
            return ((user.FullName.fname.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1) ||
                (user.UserId.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1)
            );
        })
        return (
            <div>
                <AdminHeaderComponent></AdminHeaderComponent>
                <div className="container col-sm-6" style={{ 'paddingTop': '50px' }}>
                    <input className="container col-sm-8" type="text" placeholder="Search.." name="searchText" value={this.state.searchText} onChange={this.handleOnChange.bind(this)} />
                    <Card>
                        {
                            filterUserList.map((usr, idx) => (

                                <CardBody>
                                    <CardTitle>UserId:&nbsp;{usr.UserId}</CardTitle>
                                    <CardSubtitle>Name:&nbsp;{usr.FullName.fname}&nbsp;{usr.FullName.mname}&nbsp;
                        {usr.FullName.lname}
                                    </CardSubtitle>
                                    <Collapse isOpen={this.state.collapse}>
                                        <CardText>
                                            Date of Birth:&nbsp;{usr.DateOfBirth}<br />
                                            Age:&nbsp;{usr.Age}<br />
                                            Gender:&nbsp;{usr.Gender}<hr />
                                            Address:<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;Address Line1:&nbsp;{usr.Address.Addr1}<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;Address Line2:&nbsp;{usr.Address.Addr2}<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;Address Line3:&nbsp;{usr.Address.Addr3}<br />
                                            City:&nbsp;{usr.City}<br />
                                            State:&nbsp;{usr.State}<br />
                                            Pincode:&nbsp;{usr.Pincode}<hr />
                                            Phone:&nbsp;{usr.Phone} &nbsp;&nbsp; Mobile:&nbsp;{usr.Mobile}<hr />
                                            Educational Status: &nbsp;{usr.EduStatus}&nbsp;&nbsp; Marital Status:&nbsp;{usr.MaritalStatus}<hr />
                                            Physical Disability:&nbsp;{usr.PhysicalDisability}&nbsp;&nbsp; Birth Sign:&nbsp;{usr.Birthsign}<hr />
                                            <hr />
                                        </CardText>
                                    </Collapse>
                                    <Button onClick={this.toggle.bind(this)}>More Details</Button>
                                </CardBody>
                            ))
                        }
                    </Card>

                </div>
            </div>
        );
    }
}



export default AllUserlistComponent;