import React, { useState } from 'react'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';

const Form = ( {card, updateCards} ) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [completeFlag, setCompleteFlag] = useState(false);
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const images = ['image1','image2','image3','image4','image5','image6','image7','image8','image9','image10','image11']
    const colors = ['#a2d8f2','#d2ffa8','#f9ceae','#aabfff','#b7fc94','#c3a8f4','#f4da90','#f47a90','#fcb0dc','#988bf9','#9eb8ef','#f3fca1','#f4e06e','#93ffe6','#ff8c95','#f2e47b','#cdf9a7','#f9c37c','#f3c4fc','#a8fff9','#fffc84']
    const addCard = (e) => {
        e.preventDefault();
        function getRandomInt(max) {return Math.floor(Math.random() * max)}
        const image = images[getRandomInt(11)]
        function getRandomInt2(max) {return Math.floor(Math.random() * max)}
        const color = colors[getRandomInt2(22)]
        axios
            .post('http://localhost:8000/api/memory', {
                title,
                location,
                description,
                completeFlag: false,
                date,
                image: image,
                background: color
            }, {withCredentials: true, credentials: 'include'})
            .then(res => {
                updateCards(res.data.Memory)
                setTitle('');
                setLocation('');
                setDescription('');
                setDate('');
            })
            .catch(err => 
                setErrors(err.response.data.error.errors)
            );
    };
    return (  
        <div>  
            <Card className='Dashboard-form' elevation={3} style={{backgroundColor: '#edbe04', borderRadius: '20px'}}>
            <form onSubmit={addCard}>
                {errors?.title ? (<p className='text-secondary text-danger'>{errors.title.message} </p>): null }
                <input 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder='Title'
                    type='text'
                />
                {errors?.location ? (<p className='text-secondary text-danger'>{errors.location.message} </p>): null }
                <input 
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    className='Form-locationInput' 
                    placeholder='Location' 
                    type='text' /> 
                <textarea 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className='Form-descriptionInput' 
                    placeholder='Notes (optional)' 
                    type='text' /> 
                <input 
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    className='Form-descriptionInput' 
                    placeholder='Date (optional, ex: 06/2023)' 
                    type='text' />
                <Button type='submit' className='tweetBox_tweetButton' value='Post'>Create</Button>
            </form>
            </Card>
        </div> 
    )
}

export default Form;