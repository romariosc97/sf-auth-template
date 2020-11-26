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
  const fieldProperties = {
    'Name':{
      'size': '3'
    },
    'Type':{
      'size': '3'
    },
    'Industry':{
      'size': '6'
    },
    'Rating':{
      'size': '3'
    }
  };
  const [value, setValue] = useState({
    Name: "",
    Type: "",
    Industry: "",
    Rating: "",
  });
  useEffect(() => {
    axios.get(
      `http://localhost:8080/api/account/get/${accountId}`, 
      {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}, "withCredentials": true}
    )
    .then(res => {
      setValue(res.data.records[0]);
      setLoadingScreen(false);
      setSubmitBtnStatus(false);
    })
  }, []);
  const updateInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  };
  const updateAccount = () => {
    const loginAxios = axios.create({
      withCredentials: true,
    });
    setSubmitBtnStatus(true);
    loginAxios.put(`http://localhost:8080/api/account/update`, value)
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
          <Card className="position-relative">
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