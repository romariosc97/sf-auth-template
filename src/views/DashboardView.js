import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bulma-components';
import MyNavbar from '../components/MyNavbar';

export default function DashboardView() {
  useEffect(() => {
    axios.get(
      `http://localhost:8080/api/auth/session`, 
      {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}, "withCredentials": true}
    )
    .then(res => {
      console.log(res.data);
    })
  }, []);
  return (
    <Fragment>
      <MyNavbar></MyNavbar>
      <section className="dashboard">
        <Container>
          <Card>
            <Card.Content>
              <h5>Dashboard</h5>
            </Card.Content>
          </Card>
        </Container>
      </section>
    </Fragment>
    
  )
}