import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RecipeList from './components/RecipeList';
import NavBar from './components/NavBar';
import SignIn from './modals/SignIn';
import SignUp from './modals/SignUp';
import { Modal } from '@mui/material';




export default function App() {

  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);

  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [completeSignUp, setCompleteSignUp] = useState(false);




  const logout =  () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser('')

  }  
  

  
 

  const fetchRecipes = () => {
    axios.get('api/recipes')
      .then(response => {
        setRecipes(response.data)
    })
  }
  

  useEffect(() => {
    fetchRecipes();
  }, []); 

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser !== undefined) {
      let foundUser = JSON.parse(loggedInUser)
      setUser(foundUser);
    } else {
      setUser('')
    }
  }, [])


  const responseSuccessGoogle = (response) => {
    axios({
      method: "POST",
      url: 'http://localhost:5000/api/googlelogin',
      data: {tokenId: response.tokenId}
    }).then(resp => {
      console.log(resp);
      localStorage.setItem("token", resp.data.token) 
      localStorage.setItem("user", JSON.stringify(resp.data.message)) 
      setUser(resp.data.message);
      setSignInOpen(false)
      setSignUpOpen(false);
    })
  }

  const responseErrorGoogle = (response) => {
    console.log('response');
    
  }

  
  return (
    <div>

      {!user && <NavBar handleSignInOpen={setSignInOpen} setOpenModal={setSignUpOpen} />}
      {user && <NavBar user={user} logout={logout} />}
        
      <Modal open={signInOpen}>
      <SignIn responseSuccessGoogle={responseSuccessGoogle} responseErrorGoogle={responseErrorGoogle} completeSignUp={completeSignUp} setCompleteSignUp={setCompleteSignUp} setUser={setUser} setOpenModal={setSignInOpen} />
      </Modal>
      <Modal open={signUpOpen}>
        <SignUp responseSuccessGoogle={responseSuccessGoogle} responseErrorGoogle={responseErrorGoogle}  completeSignUp={completeSignUp} setCompleteSignUp={setCompleteSignUp} setUser={setUser} setOpenModal={setSignUpOpen} setSignIn={setSignInOpen} />
      </Modal>
      {user && <RecipeList recipes={recipes} />}
      {!user && <div>Please Signup or Login to view recipes</div>}
      
    </div>
  )
}
