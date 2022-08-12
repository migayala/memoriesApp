import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

function Login({setIsLoggedin}) {
    const navigate = useNavigate();
    const[errors, setErrors] = useState();
    const [user,setUser] = useState({
        email: '',
        password: '',
    });
    const handleChange= (e) =>{setUser({...user,[e.target.name]: e.target.value})}
    const handleSubmit= (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', user, {withCredentials: true, credentials: 'include'})
            .then((res)=> {
                setIsLoggedin(true);
                navigate('/')
            })
            .catch((err) => {
                // console.log(err.response.data.message);
                setErrors(err.response.data.message);
            })
    };
    return (
        <div>
            <div>
            <div className='vh-100 background'>
                <div className='container-fluid h-custom'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                    <div className='col-md-9 col-lg-6 col-xl-5'>
                        <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp' className='img-fluid' alt='Sample image' />
                    </div>
                        <div className='col-md-8 col-xl-4 offset-xl-1' >
                            <div className='card bg-glass vh-50'>
                                <div className='card-body px-4 py-5 px-md-5'>
                                    <form onSubmit= {handleSubmit}>
                                        <div>
                                            <h1 className='text-center pb-3'> Login</h1>
                                        </div>
                                        {errors ? (<p className='text-center text-danger'>{errors}</p>): null }
                                        <div className='form-outline mb-4'>
                                            <input type='email' name='email' className='form-control form-control-lg'
                                            placeholder='Email' value={user.email} onChange={handleChange}/>
                                            {/* <label className='form-label'>Email address</label> */}
                                        </div>
                                        <div className='form-outline mb-3'>
                                            <input type='password' name='password' className='form-control form-control-lg'
                                            placeholder='Password'value={user.password} onChange={handleChange}/>
                                            {/* <label className='form-label'>Password</label> */}
                                        </div>
                                        <div className='text-center text-lg-start mt-4 pt-2'>
                                            <button className='btn btn-primary btn-lg' type='submit' >Login</button>
                                            <p className='small fw-bold mt-2 pt-1 mb-0'>Don't have an account? 
                                                <Link to={'/register'}>Register</Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login