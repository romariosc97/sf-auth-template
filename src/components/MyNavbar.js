import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Navbar } from 'react-bulma-components';
import { Redirect } from "react-router-dom";

export default function MyNavbar() {
  const [checkSession, setCheckSession] = useState('');
  const [salesforceUser, setSalesforceUser] = useState({});
  const [logoutStatus, setLogoutStatus] = useState(false);
  const getSession = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/auth/session`, 
      {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}, "withCredentials": true}
    );
    if(result.status===200){
      setSalesforceUser(result.data.salesforce.user);
    }
  };
  useEffect(() => {
    getSession();
  }, []);
  const logout = async () => {
    setLogoutStatus(true);
    const result = await axios.get(
      `http://localhost:8080/api/auth/revoke`, 
      {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}, "withCredentials": true}
    );
    if(result.status===200){
      setCheckSession(<Redirect to="/" />);
      setLogoutStatus(false);
    }
  };
  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Item href="/dashboard">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="Bulma"/>
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
            <Navbar.Item onClick={logout} disabled={logoutStatus}>
              Logout
            </Navbar.Item>
            {checkSession}
          </Navbar.Dropdown>
        </Navbar.Item>
      </div>
    </Navbar>
  )
}
