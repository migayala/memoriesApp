import React from 'react';
import axios from 'axios';
import { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

function Register({setIsLoggedin}) {
    const navigate = useNavigate();
    const[errors, setErrors] = useState({});
    const [user,setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleChange= (e) =>{setUser({...user,[e.target.name]: e.target.value})}
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register', user, {withCredentials: true, credentials: 'include'})
            .then((res)=> {
                setIsLoggedin(true);
                navigate('/')
            })
            .catch((err)=>{
                // console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            })
    };
    return (
        <div>
            <div className='vh-100 background'>
                <div className='container-fluid h-custom'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col-md-8 col-xl-4 offset-xl-1' >
                            <div className='card bg-glass vh-50 mt-3'>
                                <div className='card-body px-4 py-5 px-md-5'>
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <h3 className='text-center pb-3'> Register</h3>
                                        </div>
                                        <div className='form-outline mb-4 '>
                                            {errors?.firstName ? (<p className='text-secondary text-danger'>{errors.firstName.message} </p>): null }
                                            <input type='text' name='firstName' className='form-control form-control-lg' 
                                            placeholder='First Name' value={user.firstName} onChange={handleChange}/>
                                            {/* <label className='form-label'>First Name</label> */}
                                        </div>
                                        <div className='form-outline mb-4'>
                                            {errors?.lastName ? (<p className='text-secondary text-danger'>{errors.lastName.message} </p>): null }
                                            <input type='text' name='lastName' className='form-control form-control-lg'
                                            placeholder='Last Name' value={user.lastName} onChange={handleChange}/>
                                            {/* <label className='form-label'>Last Name</label> */}
                                        </div>
                                        <div className='form-outline mb-4'>
                                            {errors?.email ? (<p className='text-secondary text-danger'>{errors.email.message} </p>): null }
                                            <input type='email' name='email' className='form-control form-control-lg'
                                            placeholder='Email' value={user.email} onChange={handleChange}/>
                                            {/* <label className='form-label'>Email address</label> */}
                                        </div>
                                        <div className='form-outline mb-3'>
                                            {errors?.password ? (<p className='text-secondary text-danger'>{errors.password.message} </p>): null }
                                            <input type='password' name='password' className='form-control form-control-lg'
                                            placeholder='Password' value={user.password} onChange={handleChange}/>
                                            {/* <label className='form-label'>Password</label> */}
                                        </div>
                                        <div className='form-outline mb-3'>
                                            {errors?.confirmPassword ? (<p className='text-secondary text-danger'>{errors.confirmPassword.message} </p>): null }
                                            <input type='password' name='confirmPassword' className='form-control form-control-lg'
                                            placeholder='Confirm Password' value={user.confirmPassword} onChange={handleChange}/>
                                            {/* <label className='form-label'>Confirm Password</label> */}
                                        </div>
                                        <div className='text-center text-lg-start mt-4 pt-2'>
                                            <button type='submit' className='btn btn-primary btn-lg'>Register</button>
                                            <p className='small fw-bold mt-2 pt-1 mb-0'> Have an account already? 
                                                <Link to={'/login'}>Login</Link>
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
    )
}

export default Register