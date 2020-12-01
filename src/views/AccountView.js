import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bulma-components';
import MyNavbar from '../components/MyNavbar';
import MyTable from '../components/MyTable';

export default function AccountView() {
  const [accounts, setAccounts] = useState([]);
  const fields = ['Id', 'Name', 'Type', 'Industry', 'Rating'];
  const getAccounts = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/account/get`, 
      {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}, "withCredentials": true}
    );
    if(result.status===200){
      setAccounts(result.data.records); 
    }
  };
  useEffect(() => {
    getAccounts();
  }, []);
  return (
    <Fragment>
      <MyNavbar></MyNavbar>
      <section className="dashboard">
        <Container>
          <Card>
            <Card.Content>
              <div className="columns">
                <div className="column is-9">
                  <h2 className="title mb-4">List of Accounts</h2>
                </div>
                <div className="column is-3 has-text-right">
                  <a href={"./create-account/"} className='button is-primary'>CREATE ACCOUNT</a>
                </div>
              </div>
              <MyTable object="account" setData={setAccounts} data={accounts} fields={fields}></MyTable>
            </Card.Content>
          </Card>
        </Container>
      </section>
    </Fragment>
    
  )
}