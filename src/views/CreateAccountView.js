import React, {Fragment, useState} from 'react';
import { Container, Card } from 'react-bulma-components';
import { Redirect } from "react-router-dom";
import MyNavbar from '../components/MyNavbar';
import MyForm from '../components/MyForm';
import axios from 'axios';

export default function CreateAccountView() {
  const [redirectForm, setRedirectForm] = useState('');
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const fields = ['Name', 'Type', 'Industry', 'Rating'];
  const fieldProperties = {
    'Name':{
      'size': '3',
      'type': 'text'
    },
    'Type':{
      'size': '3',
      'type': 'picklist',
      'values':[
        'Enterprise',
        'Mid-Market',
        'Small Business'
      ]
    },
    'Industry':{
      'size': '3',
      'type': 'picklist',
      'values':[
        'Agriculture',
        'Apparel',
        'Banking',
        'Biotechnology',
        'Chemicals',
        'Communications',
        'Construction',
        'Consulting',
        'Education',
        'Electronics',
        'Energy',
        'Engineering',
        'Entertainment',
        'Enviromental',
        'Food & Beverage',
        'Government',
        'Technology'
      ]
    },
    'Rating':{
      'size': '3',
      'type': 'picklist',
      'values':[
        'Hot',
        'Warm',
        'Cool'
      ]
    }
  };
  const [value, setValue] = useState({
    Name: "",
    Type: "",
    Industry: "",
    Rating: "",
  });
  const updateInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  };
  const createAccount = () => {
    const loginAxios = axios.create({
      withCredentials: true,
    });
    setSubmitBtnStatus(true);
    loginAxios.post(`http://localhost:8080/api/account/insert`, value)
    .then(res => {
      setRedirectForm(<Redirect to="/accounts" />);
    })
    .finally(() => {
      setSubmitBtnStatus(false);
    })
  };
  return (
    <Fragment>
      <MyNavbar></MyNavbar>
      <section className="dashboard">
        <Container>
          <Card>
            <Card.Content>
              <h2 className="title mb-4">Account's Form</h2>
              <MyForm loadingScreen={false} submitBtnStatus={submitBtnStatus} value={value} onSubmitFunction={createAccount} updateInput={updateInput} fields={fields} fieldProperties={fieldProperties}></MyForm>
              {redirectForm}
            </Card.Content>
          </Card>
        </Container>
      </section>
    </Fragment>
    
  )
}