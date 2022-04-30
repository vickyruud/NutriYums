import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RecipeList from './components/RecipeList';
import NavBar from './components/NavBar';

export default function App() {

  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({});

  const fetchRecipes = () => {
    axios.get('api/recipes')
      .then(response => {
        console.log(response.data)
        setRecipes(response.data)
    })
  }

  useEffect(() => {
    fetchRecipes();
  }, [])

  return (
    <div>
      <NavBar />
      <RecipeList recipes={recipes} />
    </div>
  )
}
