import React from 'react';
import { Navbar } from 'react-bulma-components';

export default function MyNavbar() {
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
        <Navbar.Item href="/templates">
          Templates
        </Navbar.Item>
        <Navbar.Item href="/jobs">
          Jobs
        </Navbar.Item>
      </Navbar.Menu>
      <div className="navbar-end">
        <Navbar.Item className="has-dropdown is-hoverable">
          <Navbar.Link>
            Usuario
          </Navbar.Link>
          <Navbar.Dropdown>
            <Navbar.Item>
              Logout
            </Navbar.Item>
          </Navbar.Dropdown>
        </Navbar.Item>
      </div>
    </Navbar>
  )
}
