import React from "react";
import ReactDom from "react-dom";

//redux
import { createStore } from "redux";
// import Provider. This is be used to maintain application state
import { Provider } from "react-redux";

// import reducer from reducers.js
// the reducer will be the default instance of "combineReducers"
// import reducer from "./reducer";

import "!style!css!bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";

//import all components 
import LoginComponent from "./components/login.jsx";
import CreateUserComponent from './components/createUser.jsx';
import PersonalInfoComponent from './components/personalInfo.jsx';
import UserlistComponent from './components/userList.jsx';
import App from './routes';
//

// create a store using createStore() method and pass reducers to it
// let store = createStore(reducer);

ReactDom.render(<App />, document.getElementById("app"));