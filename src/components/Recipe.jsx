import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Recipe(props) {

  const [readMore, setReadMore] = useState(false);


  const {
    name,
    description,
    image
  } = props.recipe

  let cardHeight = readMore ? "auto" : 400

  return (
    <Card sx={{ maxWidth: 345, height: cardHeight }} elevation={20}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt="recipe-pic"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {readMore ? description : `${description.substring(0, 40)}...`}
            <span
            style={{ background: "transparent", border: "none", fontWeight: 'bold', marginLeft: 5 }}
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "show less" : "read more"}
          </span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
