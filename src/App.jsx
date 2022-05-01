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
    if (loggedInUser != undefined) {
      let foundUser = JSON.parse(loggedInUser)
      setUser(foundUser);
    } else {
      setUser('')
    }
  }, [])

  
  return (
    <div>

      {!user && <NavBar handleSignInOpen={setSignInOpen} setOpenModal={setSignUpOpen} />}
      {user && <NavBar user={user} logout={logout} />}

      <Modal open={signInOpen}>
      <SignIn completeSignUp={completeSignUp} setCompleteSignUp={setCompleteSignUp} setUser={setUser} setOpenModal={setSignInOpen} />
      </Modal>
      <Modal open={signUpOpen}>
        <SignUp  completeSignUp={completeSignUp} setCompleteSignUp={setCompleteSignUp} setUser={setUser} setOpenModal={setSignUpOpen} setSignIn={setSignInOpen} />
      </Modal>
      {user && <RecipeList recipes={recipes} />}
      {!user && <div>Please Signup or Login to view recipes</div>}
      
    </div>
  )
}
