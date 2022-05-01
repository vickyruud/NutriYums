import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material';
import './signUp.css'
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';


function SignUp(props) {
  const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: '#0068d3' };
  const textFieldStyle = { margin: '10px 0 0 0' };

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPasswordConfirmation] = useState("")
  const [email, setEmail] = useState("")


    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }
  const handlePasswordConfirmationChange = (evt) => {
        setPasswordConfirmation(evt.target.value)
    }
  
    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }

  const handleSubmit = (evt) => {
    let id = uuidv4();
    let user = {
      username,
      email,
      password,
      password_confirmation,
      id
    }
    console.log(user);
      evt.preventDefault();
    fetch(`http://localhost:5000/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        props.setOpenModal(false)
      })
      .catch(err => console.log(err));
      setUsername("")
      setPassword("")
      setEmail("")
      props.setCompleteSignUp(true);
      props.setSignIn(true);
      props.setOpenModal(false)
   
  }
   

  return (
    <Grid>
      <Paper elevation={20} style = {paperStyle} id="signup-paper">
        <Grid align='center'>
          <Avatar style={avatarStyle}>
          <DinnerDiningIcon />
          </Avatar>
          <h2 style ={headerStyle}>Sign Up</h2>
          <Typography variant='caption'>Please fill this form to create an account</Typography>
        </Grid>
        <form className='signup-form' onSubmit={handleSubmit}>
          <TextField onChange={handleUsernameChange} style={textFieldStyle} variant='standard' fullWidth label='Username' placeholder='Enter your username' autoFocus/>
          <TextField onChange={handleEmailChange} style={textFieldStyle} variant='standard' fullWidth label='Email' placeholder='Enter your email'/>
          <TextField onChange={handlePasswordChange} style={textFieldStyle} variant='standard' fullWidth label='Password' type="password" placeholder='Enter a password' />
          <TextField onChange={handlePasswordConfirmationChange} style={textFieldStyle} variant='standard' fullWidth label='Confirm Password' type="password" placeholder='Confirm your password' />
          <div className='signup-buttons'>
          <Button id='signup-submit-button' type='submit' variant='contained' color='primary'>Sign up</Button>
          <Button id='signup-cancel-button' onClick={() => props.setOpenModal(false)} variant='contained' color='primary'>Cancel</Button>
          </div>
        </form>
      </Paper>
    </Grid>
  )
}

export default SignUp