import React, { Component } from 'react';
import history from './history';
import { Route, Switch, Router } from 'react-router-dom';
import LoginComponent from './components/login.jsx';
import PersonalInfoComponent from './components/personalInfo.jsx';
import UserlistComponent from './components/userList.jsx';
import displayPersonalInfoComponent from './components/personInfoDisplay.jsx';
import createUser from './components/createUser.jsx';
import createRoleComponent from './components/createRole.jsx';
import AllUserlistComponent from './components/allusers.jsx';
import PersonalInfoAdminComponent from './components/adduserinfoadmin.jsx';
import errorComp from './components/error.jsx';
class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    {/* <Navigation/> */}
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/personalInfoUser" component={displayPersonalInfoComponent} />
                        <Route path="/personalInfoUseredit" component={PersonalInfoComponent} />
                        <Route path="/PersonalInfoAdmin" component={UserlistComponent} />
                        <Route path="/createUser" component={createUser} />
                        <Route path="/createRole" component={createRoleComponent} />
                        <Route path="/showAllUsers" component={AllUserlistComponent} />
                        <Route path="/error" exact component={errorComp} />
                        <Route path="/adduserinfo" component={PersonalInfoAdminComponent} />
                        {/* <Route path="/userList" component={} /> */}
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;

