import React, {Fragment} from 'react'
import {Route} from "react-router-dom";
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import AccountView from './views/AccountView';

export default function routes() {
  return (
    <Fragment>
      <Route exact path="/" component={LoginView} />
      <Route exact path="/dashboard" component={DashboardView} />
      <Route exact path="/accounts" component={AccountView} />
    </Fragment>
  )
}
