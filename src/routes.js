import React, {Fragment} from 'react'
import {Route} from "react-router-dom";
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';

export default function routes() {
  return (
    <Fragment>
      <Route exact path="/" component={LoginView} />
      <Route exact path="/dashboard" component={DashboardView} />
    </Fragment>
  )
}
