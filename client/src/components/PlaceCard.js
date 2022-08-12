import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const PlaceCard = ( {card, handleVisit, handleDelete} ) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#560319',
                contrastText: '#560319'
            }
        }
    });
    const [background, setBackground] = useState(card.background);
    const [image, setImage] = useState(card.image);
    const [completeFlag, setCompleteFlag] = useState(card.completeFlag);
    return (  
        <div>
            <Card elevation={5} className='Dashboard-card' style={{backgroundColor: `${background}`, borderRadius: '20px'}}>
                <CardContent >
                    <div className='Card'>
                        <Typography color='#560319' gutterBottom variant='h5' component='div' borderRadius='5px' minWidth='200px' textAlign='center'>
                            {card.location}
                        </Typography>
                        <span className='Delete' onClick={() => handleDelete(card._id)}>&times;</span>
                    </div>
                    <Typography variant='body2' color='#560319' borderRadius='5px' minWidth='200px' minHeight='100px' textAlign='center'>
                        {card.description}
                    </Typography>
                </CardContent>
                {image ? <img className='cardImage' src={require(`../Image/${image}.jpeg`)}/> : null }
                <CardActions>
                    <ThemeProvider theme={theme}>
                        <Button href={`/memory/edit/${card._id}`}>Edit</Button>
                        <Button href={`/memory/${card._id}`}>View</Button>
                        {completeFlag === false ?
                            <Button onClick={() => {handleVisit(card._id); setCompleteFlag(true)}}>Check!</Button>
                        : <Button>Visited!</Button> }
                    </ThemeProvider>
                </CardActions>
            </Card>
        </div> 
    )
}

export default PlaceCard;