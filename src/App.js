import React from "react";
import Routes from "./routes";
import { Switch, BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
          <div>
            <main className="main">
                <Switch>
                  <Routes />
                </Switch>
            </main>
          </div>
    </Router>
  );
}
