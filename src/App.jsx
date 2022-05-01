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

  const [openModal, setOpenModal] = useState(false);

  const logout =  () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser('')

  } 
 
  
  if (localStorage.getItem('token')) {
    console.log('token is there')
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
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  })

  

  return (
    <div>

      {!user && <NavBar handleSignInOpen={setOpenModal} />}
      {user && <NavBar user={user} logout={logout} />}


      <SignIn setUser={setUser} />

      <RecipeList recipes={recipes} />
    </div>
  )
}
