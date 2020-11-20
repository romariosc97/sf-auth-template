import React, {useState} from 'react';
import { Button, Form } from 'react-bulma-components';
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
  const login = () => {
    if(username==''){
      setUsernameColor('danger');
      setUsernameHelp('No deje este campo en blanco.');
    }
    if(password==''){
      setPasswordColor('danger');
      setPasswordHelp('No deje este campo en blanco.');
    }
    if(username!='' && password!=''){
      setUsernameColor(null);
      setUsernameHelp('');
      setPasswordColor(null);
      setPasswordHelp('');
      const loginAxios = axios.create({
        
        //timeout: 10000,
        withCredentials: true,
      });
      loginAxios.post(`http://localhost:8080/api/auth/login`, {username:username, password:password})
      .then(res => {
        setRedirectLogin(<Redirect to="/dashboard" />);
      })
    } 
  };
  return (
    <section className="login">
      <div className="columns is-mobile is-vcentered">
        <div className="column is-half is-offset-one-quarter">
          <div className="has-text-centered">
            <h1 className="title">Authentication</h1>
          </div>
          <Field>
            <Control>
              <Label>Name</Label>
              <Input color={usernameColor} type="text" value={username} name="username" onChange={(e) => {
                setUsername(e.target.value);
              }} />
              <Help color="danger">{usernameHelp}</Help>
            </Control>
          </Field>
          <Field>
            <Control>
              <Label>Password</Label>
              <Input color={passwordColor} type="password" value={password} name="password" onChange={(e) => {
                setPassword(e.target.value);
              }} />
              <Help color="danger">{passwordHelp}</Help>
            </Control>
          </Field>
          <Button.Group className="is-centered">
            <Button onClick={login} color="primary">LOGIN</Button>
          </Button.Group>
          {redirectLogin}
        </div>
      </div>
    </section>
    
  )
}
