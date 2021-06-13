import React from "react"
import {  Card } from "antd";
import Signup from "./SignUp"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Notes from "./Notes"
import NoteDetail from "./NoteDetail"
function App() {
  return (
  <AuthProvider>
    <Card align="left">
    <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Notes} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/notes" component={Notes} />
              <Route path="/:id" children={<NoteDetail/>}/>
            </Switch>
          </AuthProvider>
        </Router>
  </Card>
  </AuthProvider>
   )
}

export default App
