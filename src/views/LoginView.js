import React, {useState} from 'react';
import { Button, Form, Card } from 'react-bulma-components';
import { Redirect } from "react-router-dom";
import axios from 'axios';
const { Input, Field, Control, Label, Help } = Form;

export default function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameColor, setUsernameColor] = useState(null);
  const [passwordColor, setPasswordColor] = useState(null);
  const [usernameHelp, setUsernameHelp] = useState('');
  const [passwordHelp, setPasswordHelp] = useState('');
  const [redirectLogin, setRedirectLogin] = useState('');
  const [loginBtnStatus, setLoginBtnStatus] = useState(false);
  const login = async (e) => {
    if(username===''){
      setUsernameColor('danger');
      setUsernameHelp('No deje este campo en blanco.');
    }
    if(password===''){
      setPasswordColor('danger');
      setPasswordHelp('No deje este campo en blanco.');
    }
    if(username!=='' && password!==''){
      setLoginBtnStatus(true);
      setUsernameColor(null);
      setUsernameHelp('');
      setPasswordColor(null);
      setPasswordHelp('');
      const loginAxios = axios.create({
        //timeout: 10000,
        withCredentials: true,
      });
      const result = await loginAxios.post(`http://localhost:8080/api/auth/login`, {username:username, password:password})
      if(result.status===200){
        setRedirectLogin(<Redirect to="/dashboard" />);
        setLoginBtnStatus(false);
      }
    } 
  };
  return (
    <section className="login">
      <div className="columns is-mobile is-vcentered">
        <div className="column is-4 is-offset-4">
        <Card>
            <Card.Content>
              <div className="column is-10 is-offset-1 my-4">
                <div className="has-text-centered">
                  <div>
                    <img src="https://seeklogo.com/images/B/bulma-logo-45B5145BF4-seeklogo.com.png" width="30" alt="Bulma"/>
                  </div>
                  <h2 className="title mb-4">Authentication</h2>
                </div>
                <Field>
                  <Control>
                    <Label>Email</Label>
                    <Input onKeyUp={(e)=>{if(e.keyCode===13){login(e)}}} color={usernameColor} type="text" value={username} name="username" onChange={(e) => {
                      setUsername(e.target.value);
                    }} />
                    <Help color="danger">{usernameHelp}</Help>
                  </Control>
                </Field>
                <Field>
                  <Control>
                    <Label>Password</Label>
                    <Input onKeyUp={(e)=>{if(e.keyCode===13){login(e)}}} color={passwordColor} type="password" value={password} name="password" onChange={(e) => {
                      setPassword(e.target.value);
                    }} />
                    <Help color="danger">{passwordHelp}</Help>
                  </Control>
                </Field>
                <Button.Group className="is-centered">
                  <Button loading={loginBtnStatus} disabled={loginBtnStatus} onClick={login} color="primary">LOGIN</Button>
                  <a className="button is-info" href="http://localhost:8080/api/auth/oauth">OAUTH</a>
                </Button.Group>
                {redirectLogin}
              </div>
            </Card.Content>
          </Card>
          
        </div>
      </div>
    </section>
    
  )
}
