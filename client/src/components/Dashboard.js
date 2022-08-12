import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import PlaceCard from './PlaceCard';
import { Grid } from '@mui/material';
import axios from 'axios';
import Form from './Form';
import {useNavigate} from 'react-router-dom';

const Dashboard = (props) => { 
    const [card, setCard] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/memory`, {withCredentials: true, credentials: 'include'})
            .then((response) => {
                setCard(response.data);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    navigate('/login')
                }
            });
    }, []);
    const updateCards = (newMemory) => {setCard([...card, newMemory])}
    const handleDelete = async (id) => {
        try{await
            axios
                .delete(`http://localhost:8000/api/memory/${id}`, {withCredentials: true, credentials: 'include'})
                const newCard = card.filter(card => card._id !== id)
                setCard(newCard)}
        catch(err){console.log(err)}
    };
    const handleVisit = (id) => {
        axios
            .put(`http://localhost:8000/api/memory/${id}`, {
                completeFlag: true,
            }, {withCredentials: true, credentials: 'include'})
            .then(res => console.log(res))
            .catch((err) => console.log(err.response))
    };
    return (
        <Container>
            <Grid container spacing={3}>
                <Form updateCards={updateCards} xs={12} md={6} lg={3}/>
                {card.map(card => (
                    <Grid item key={card._id} xs={12} md={6} lg={3}>
                <PlaceCard card={card} handleVisit={handleVisit} handleDelete={handleDelete} />
            </Grid>
            ))}
            </Grid> 
        </Container>
    )
}
export default Dashboard;