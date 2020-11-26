import React, {Fragment} from 'react'
import {Route} from "react-router-dom";
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import AccountView from './views/AccountView';
import CreateAccountView from './views/CreateAccountView';
import EditAccountView from './views/EditAccountView';

export default function routes() {
  return (
    <Fragment>
      <Route exact path="/" component={LoginView} />
      <Route exact path="/dashboard" component={DashboardView} />
      <Route exact path="/accounts" component={AccountView} />
      <Route exact path="/create-account" component={CreateAccountView} />
      <Route exact path="/edit-account/:accountId" component={EditAccountView} />
    </Fragment>
  )
}
