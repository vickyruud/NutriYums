import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import './signIn.css'
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';


const SignIn = (props) => {
  const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: '#0068d3' };
  const textFieldStyle = { margin: '10px 0 0 0' };
  const loginButtonStyle = {margin: '10px 0 0 0'}

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  console.log(props.completeSignUp);

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }
   

  const handleSubmit = (evt) => {    
    
        evt.preventDefault()
        fetch(`http://localhost:5000/api/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
              email,
              password,
            })
        })
        .then(resp => resp.json())
          .then(data => {
          localStorage.setItem("token", data.token)
          localStorage.setItem("user", JSON.stringify(data.message))            
            props.setUser(data.message)
            props.setOpenModal(false)
            props.setSignUp(false);
        }).catch(error => { 
          console.log('login error', error.response.data.message);
        });
        // props.cancel()
    }
    
  
  

  
  return (
    <Grid>
      <Paper elevation={20} style = {paperStyle} id="login-paper">
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <DinnerDiningIcon />
          </Avatar>
          {props.completeSignUp ? <p>Successfully Signed Up! Please login below</p> : null}
          <h2 style ={headerStyle}>Login</h2>
        </Grid>
        <form className='login-form' onSubmit={handleSubmit}>
          <TextField onChange={handleEmailChange} style={textFieldStyle} variant='standard' fullWidth label='Email' placeholder='Enter your email'/>
          <TextField onChange={handlePasswordChange} style={textFieldStyle} variant='standard' fullWidth label='Password' type="password" placeholder='Enter a password' />
          <div className='signIn-buttons'>
          <Button style={loginButtonStyle} type='submit' variant='contained' color='primary'>Login</Button>
          <Button  onClick={() => props.setOpenModal(false)} style={loginButtonStyle} variant='contained' color='primary'>Cancel</Button>
          </div>
        </form>
      </Paper>
    </Grid>
  )
}

export default SignIn;