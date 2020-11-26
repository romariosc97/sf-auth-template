import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Navbar } from 'react-bulma-components';
import { Redirect } from "react-router-dom";

export default function MyNavbar() {
  const [checkSession, setCheckSession] = useState('');
  const [salesforceUser, setSalesforceUser] = useState({});
  useEffect(() => {
    axios.get(
      `http://localhost:8080/api/auth/session`, 
      {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}, "withCredentials": true}
    )
    .then(res => {
      setSalesforceUser(res.data.salesforce.user);
    })
  }, []);
  const logout = () => {
    axios.get(
      `http://localhost:8080/api/auth/revoke`, 
      {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}, "withCredentials": true}
    )
    .then(res => {
      setCheckSession(<Redirect to="/" />);
    })
  };
  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Item href="/dashboard">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Item href="/dashboard">
          Home
        </Navbar.Item>
        <Navbar.Item href="/accounts">
          Accounts
        </Navbar.Item>
      </Navbar.Menu>
      <div className="navbar-end">
        <Navbar.Item className="has-dropdown is-hoverable" renderAs="span">
          <Navbar.Link>
            {salesforceUser.name}
          </Navbar.Link>
          <Navbar.Dropdown>
            <Navbar.Item onClick={logout}>
              Logout
            </Navbar.Item>
            {checkSession}
          </Navbar.Dropdown>
        </Navbar.Item>
      </div>
    </Navbar>
  )
}
