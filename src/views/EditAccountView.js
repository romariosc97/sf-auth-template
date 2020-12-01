import React, {Fragment, useState, useEffect} from 'react';
import { Container, Card } from 'react-bulma-components';
import { Redirect, useParams } from "react-router-dom";
import MyNavbar from '../components/MyNavbar';
import MyForm from '../components/MyForm';
import axios from 'axios';

export default function EditAccountView() {
  const [redirectForm, setRedirectForm] = useState('');
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(true);
  let { accountId } = useParams();
  const fields = ['Name', 'Type', 'Industry', 'Rating'];
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
    }
  };

  const getData = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/account/get/${accountId}`, 
      {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}, "withCredentials": true}
    );
    if(result.status===200){
      setValue(result.data.records[0]);
      setLoadingScreen(false);
      setSubmitBtnStatus(false);
    }
  };

  useEffect(() => {
    const asyncContext = async () => {
      await getPicklists();
      await getData();
    };
    asyncContext();
  }, []);
  const updateInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  };
  const updateAccount = async () => {
    const updateAxios = axios.create({
      withCredentials: true,
    });
    setSubmitBtnStatus(true);
    const result = await updateAxios.put(`http://localhost:8080/api/account/update`, value);
    if(result.status===200){
      setRedirectForm(<Redirect to="/accounts" />);
      setSubmitBtnStatus(false);
    }
  };
  return (
    <Fragment>
      <MyNavbar></MyNavbar>
      <section className="dashboard">
        <Container>
          <Card className="form">
            <Card.Content>
              <h2 className="title mb-4">Account's Form</h2>
              <MyForm loadingScreen={loadingScreen} submitBtnStatus={submitBtnStatus} value={value} onSubmitFunction={updateAccount} updateInput={updateInput} fields={fields} fieldProperties={fieldProperties}></MyForm>
              {redirectForm}
            </Card.Content>
          </Card>
        </Container>
      </section>
    </Fragment>
    
  )
}