import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './index.css'

export default function MultiActionAreaCard({image, title}) {
    const imgURL = 'http://localhost:8081/loadcoverimage';
    
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    width="100%"
                    image={`${imgURL}/${image}`}
                    alt="image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {/* <Button size="small" color="primary" className='view-more-btn'>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                </Button> */}

                {/* <Button size="small" color="primary" className='view-more-btn'>
                <IconButton aria-label="add to card">
                    <ShoppingCartIcon />
                </IconButton>
                </Button> */}
            </CardActions>
        </Card>
    );
}