import React, {Fragment} from 'react';
import { Container, Card } from 'react-bulma-components';
import MyNavbar from '../components/MyNavbar';

export default function DashboardView() {
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