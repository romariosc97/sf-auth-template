import React, {Fragment, useState, useEffect} from 'react';
import { Container, Card } from 'react-bulma-components';
import { Redirect } from "react-router-dom";
import MyNavbar from '../components/MyNavbar';
import MyForm from '../components/MyForm';
import axios from 'axios';

export default function CreateAccountView() {
  const [redirectForm, setRedirectForm] = useState('');
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const fields = ['Name', 'Type', 'Industry', 'Rating'];
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [fieldProperties, setFieldProperties] = useState({
    'Name':{
      'size': '3',
      'type': 'text'
    },
    'Type':{
      'size': '3',
      'type': 'picklist',
      'values':[
      ]
    },
    'Industry':{
      'size': '3',
      'type': 'picklist',
      'values':[
      ]
    },
    'Rating':{
      'size': '3',
      'type': 'picklist',
      'values':[
      ]
    }
  });
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
  const createAccount = async () => {
    const createAxios = axios.create({
      withCredentials: true,
    });
    setSubmitBtnStatus(true);
    const result = await createAxios.post(`http://localhost:8080/api/account/insert`, value);
    if(result.status===200){
      setRedirectForm(<Redirect to="/accounts" />);
      setSubmitBtnStatus(false);
    }
  };

  const getPicklists = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/account/getPicklist`, 
      {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}, "withCredentials": true}
    );
    if(result.status===200){
      let fieldPropertiesTmp = fieldProperties;
      let valuesTmp;
      for (let i = 0; i < result.data.length; i++) {
        valuesTmp = [];
        for (let iA = 0; iA < result.data[i].values.length; iA++) {
          valuesTmp.push(result.data[i].values[iA].value)
        }
        fieldPropertiesTmp[result.data[i].name].values = valuesTmp;
      }
      setFieldProperties({...fieldProperties, fieldPropertiesTmp});
      setLoadingScreen(false);
      setSubmitBtnStatus(false);
    }
  };

  useEffect(() => {
    getPicklists();
  }, []);
  return (
    <Fragment>
      <MyNavbar></MyNavbar>
      <section className="dashboard">
        <Container>
          <Card className="form">
            <Card.Content>
              <h2 className="title mb-4">Account's Form</h2>
              <MyForm loadingScreen={loadingScreen} submitBtnStatus={submitBtnStatus} value={value} onSubmitFunction={createAccount} updateInput={updateInput} fields={fields} fieldProperties={fieldProperties}></MyForm>
              {redirectForm}
            </Card.Content>
          </Card>
        </Container>
      </section>
    </Fragment>
    
  )
}