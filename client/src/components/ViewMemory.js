import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const ViewMemory = () => {
    const {id} = useParams();
    const [memory, setMemory] = useState({});
    const [image, setImage] = useState('');
    const [completeFlag, setCompleteFlag] = useState(false);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/memory/${id}`, {withCredentials: true, credentials: 'include'})
            .then(res => {
                setMemory(res.data);
                setImage(res.data.image);
                setCompleteFlag(res.data.completeFlag);
            })
            .catch(err => console.log(err));
        }, [])
    return (
        <div className='View-div'>
            <div>
                <div>
                    {image ? <img className='cardImage' src={require(`../Image/${image}.jpeg`)}/> : null }
                    <div>
                        <p>Title:</p>
                        <p>{memory.title}</p>
                    </div>
                    <div>
                        <p>Location:</p>
                        <p>{memory.location}</p>
                    </div>
                    <div>
                        <p>Description:</p>
                        <p>{memory.description}</p>
                    </div>
                    <div>
                        <p>Completed?</p>
                        {completeFlag === true ? <p>Visited!</p> : <p>On my list!</p>}
                    </div>
                    <div>
                        <p>Date of the Trip:</p>
                        <p>{memory.date}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ViewMemory;