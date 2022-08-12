import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import ViewMemory from './components/ViewMemory';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import EditMemory from './components/EditMemory'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
    const[isLoggedin, setIsLoggedin] = useState(false)
  return (
    <BrowserRouter>
      <div className='App'>
        <Header isLoggedin = {isLoggedin}/>
        <div className='App-body'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/memory/:id' element={<ViewMemory />} />
            <Route path='/memory/edit/:id' element={<EditMemory />} />
            <Route path='/login' element={<Login setIsLoggedin = {setIsLoggedin}/>} />
            <Route path='/register' element={<Register setIsLoggedin = {setIsLoggedin}/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;