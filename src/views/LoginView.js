import React, {useState} from 'react';
import { Button, Form, Card, Notification } from 'react-bulma-components';
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
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const validateFields = () => {
    if(username===''){
      setUsernameColor('danger');
      setUsernameHelp('No deje este campo en blanco.');
    }
    if(password===''){
      setPasswordColor('danger');
      setPasswordHelp('No deje este campo en blanco.');
    }
  };
  const restartFields = () => {
    setLoginBtnStatus(true);
    setUsernameColor(null);
    setUsernameHelp('');
    setPasswordColor(null);
    setPasswordHelp('');
  };
  const login = async (e) => {
    validateFields();
    if(username!=='' && password!==''){
      restartFields();
      const loginAxios = axios.create({
        withCredentials: true,
      });
      try {
        await loginAxios.post(`http://localhost:8080/api/auth/login`, {username:username, password:password}, {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}});
        setRedirectLogin(<Redirect to="/dashboard" />);
      } catch (error) {
        setNotificationStatus(true);
        setNotificationText(error.message);
        setLoginBtnStatus(false);
        setTimeout(
          () =>{
            setNotificationStatus(false);
            //setNotificationText('');
          }, 
          3000
        );
      }
    } 
  };

  return (
    <section className="login">
      {/*notificationStatus===true ? <Notification className="notification-fixed is-light" color="warning">{notificationText}</Notification> : ''*/}
      {<Notification className={"notification-fixed is-light"+(notificationStatus===true ? " active" : '')} color="danger"><b>{notificationText}</b></Notification>}
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
                  {/*<Button loading={loginBtnStatus} disabled={loginBtnStatus} onClick={loginOauth} color="primary">OAUTH REQUEST</Button>*/}
                  <Button renderAs="a" loading={loginBtnStatus} disabled={loginBtnStatus} onClick={()=>{setLoginBtnStatus(true)}} className="button is-info" href="http://localhost:8080/api/auth/oauth">OAUTH</Button>
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
