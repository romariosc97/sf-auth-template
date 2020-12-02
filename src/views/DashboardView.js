import React, {Fragment} from 'react';
import { Container, Card } from 'react-bulma-components';
import MyNavbar from '../components/MyNavbar';
import { Bar } from 'react-chartjs-2'

export default function DashboardView() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets:[{
      label:'Number of Accounts',
      data:[5,4,6,2,7,6,4],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
    }]
  };
  const options = {
    scales: {
      xAxes: [{
          stacked: true
      }],
      yAxes: [{
          stacked: true
      }]
    }
  };
  return (
    <Fragment>
      <MyNavbar></MyNavbar>
      <section className="dashboard">
        <Container>
          <div className="columns">
            <div className="column is-8">
              <Card>
                <Card.Content>
                  <h2 className="title mb-4">Current year</h2>
                  <Bar 
                  data={data}
                  options={options}
                  ></Bar>
                </Card.Content>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </Fragment>
    
  )
}