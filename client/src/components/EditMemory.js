import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

const ViewMemory = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    // const [memory, setMemory] = useState({});
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:8000/api/memory/${id}`, {withCredentials: true, credentials: 'include'})
            .then(res => {
                setTitle(res.data.title);
                setLocation(res.data.location);
                setDescription(res.data.description);
                setDate(res.data.date);
            })
            .catch(err => console.log(err));
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/memory/${id}`, {
                title,
                location,
                description,
                date
            }, {withCredentials: true, credentials: 'include'})
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error.response);
            })
    };
    return (
        <div className='Edit-div'>
            <form onSubmit={handleSubmit}>
                <div className='Input'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                </div>
                <div className='Input'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' value={location} onChange={(e) => {setLocation(e.target.value)}}/>
                </div>
                <div className='Input'>
                    <label htmlFor='description'>Description</label>
                    <textarea type='text' value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                </div>
                <div className='Input'>
                    <label htmlFor='date'>Date</label>
                    <input type='text' value={date} onChange={(e) => {setDate(e.target.value)}}/>
                </div>
                <button className='btn btn-primary btn-lg Submit'>Submit</button>
            </form>
        </div>
    )
};

export default ViewMemory;