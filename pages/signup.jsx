import React from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import axios from "axios";
import { handleLogin } from '../utils/auth';


const INITIAL_USER = {
  name: "",
  email: "",
  password: ""
}
function Signup() {
  
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setloading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(()=>{
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange() {
    const {name, value } = event.target;
    setUser(prevState=>({...prevState, [name]: value}));
  }
  
  async function handleSubmit() {
    event.preventDefault();
    try {
      setloading(true);
      setError('');
      const url =`${baseUrl}/api/signup`;            
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data);
    } catch(error) {
      catchErrors(error, setError);
      
    } finally{
      setloading(false);
    }
  }
  return (
    <>
    <Message
      attached
      icon="settings"
      header="Get Started"
      content="Create a new account"
      color="teal"
    />
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
      <Message
        error
        header="Oops!"
        content={error}
      />
      <Segment>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          label="Name"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={user.name}
        />
         <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={user.email}
        />
         <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={user.password}
        />
        <Button
          icon="signup"
          type="submit"
          color="orange"
          content="Signup"
          disabled={disabled  || loading}
        />
      </Segment>
    </Form>
    <Message attached="bottom">
        <Icon name="help"/>
        Existing user?{" "}
        <Link href="/login">
          <a>Log in here</a>
        </Link>{" "} instead.
      </Message>
    </>
  );
}

export default Signup;
