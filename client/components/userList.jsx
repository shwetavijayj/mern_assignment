import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Collapse } from 'reactstrap';
import { AdminHeaderComponent } from './header.jsx';
import  adminService  from '../services/admin.js';
class UserlistComponent extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            Users :[],
            collapse: false,
            user1:""
        }
        
        this.serve = new adminService();
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
      }
      approve(e){
        console.log("data",e);
        this.serve.saveData(e,(err,res)=>{
            if(err){
                console.log("Please redirect to appropriate page.")
            }
            else{
                console.log("Data Saved suuccessfully.")
            }
        })
      }
      reject(e){
      this.serve.rejectData(e,(err,res)=>{
          if(err){
            console.log("Please redirect to appropriate page.");
          }
          else{
            console.log("Response sent to user");
          }
      })
      }
    componentDidMount(){
        // console.log("Hello");
        this.serve.getUserData((err,res)=>{
            if(err){
                console.log("Please redirect to appropriate page.");
            }else{
                this.setState({Users:res.result.data})
                console.log("Users",this.state.Users);
            }
        });
    }
    render() {
        
        return (
            <div>
                <AdminHeaderComponent></AdminHeaderComponent>
                <div className="container col-sm-6" style={{ 'paddingTop': '50px' }}>
                   <Card>
                   {
                       this.state.Users.map((usr, idx) => (
                           
                        <CardBody>
                        <CardTitle>UserId:&nbsp;{usr.UserId}</CardTitle>
                        <CardSubtitle>Name:&nbsp;{usr.FullName.fname}&nbsp;{usr.FullName.mname}&nbsp;
                        {usr.FullName.lname}
                        </CardSubtitle>
                        <Collapse isOpen={this.state.collapse}>
                        <CardText>
                            Date of Birth:&nbsp;{usr.DateOfBirth}<br/>
                            Age:&nbsp;{usr.Age}<br/>
                            Gender:&nbsp;{usr.Gender}<hr/>
                            Address:<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Address Line1:&nbsp;{usr.Address.Addr1}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Address Line2:&nbsp;{usr.Address.Addr2}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Address Line3:&nbsp;{usr.Address.Addr3}<br/>
                            City:&nbsp;{usr.City}<br/>
                            State:&nbsp;{usr.State}<br/>
                            Pincode:&nbsp;{usr.Pincode}<hr/>
                            Phone:&nbsp;{usr.Phone} &nbsp;&nbsp; Mobile:&nbsp;{usr.Mobile}<hr/>
                            Educational Status: &nbsp;{usr.EduStatus}&nbsp;&nbsp; Marital Status:&nbsp;{usr.MaritalStatus}<hr/>
                            Physical Disability:&nbsp;{usr.PhysicalDisability}&nbsp;&nbsp; Birth Sign:&nbsp;{usr.Birthsign}<hr/>
                            <Button onClick={()=>this.approve(usr)}>Approve</Button>&nbsp;&nbsp;&nbsp;
                            <Button onClick={()=>this.reject(usr)}>Reject</Button> <hr/>
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



export default UserlistComponent;