import React, { Component } from "react";
import { InputGroup, Input, Button } from 'reactstrap';
// const BrowserHistory = require('react-router/lib/BrowserHistory').default;
import history from '../history';
class errorComp extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h2>Some error has occurred.. </h2>
                <center><Navbar color="dark" light expand="md">
                <Button color="link" onClick={history.goBack}><font color="white">Go Back</font></Button>
                    </Navbar>
                    </center>
            </div>
        );
    }
}
export default errorComp;