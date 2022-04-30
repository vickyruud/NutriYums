import React from 'react';
import Recipe from './Recipe';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function RecipeList({ recipes }) {


  const arrayRecipeItem = recipes.map(recipe => {
    return (
      <Grid key={recipe.id} item xs={2}>
        <Recipe  recipe={recipe} /> 
      </Grid>
    )
  })

  return (
       <Box sx={{ flexGrow: 1, paddingTop: 2 }}>
        <Grid container spacing={4}>
        {arrayRecipeItem}  
      </Grid>
    </Box>
  )
}

export default RecipeList