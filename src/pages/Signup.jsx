// src/Signup.jsx
import { useState } from 'react';
import axios from 'axios';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import { Icon } from 'react-icons-kit';
import AlertNotify from '../components/alertNotify';

const VITE_API = import.meta.env.VITE_API


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [username, setUserName] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const [, setPasswordType] = useState('password');
  const [showPassword, setShowPassword] = useState(false);

  const [openNotify, setOpenNotify] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    message: '',
    severity: '',
  })

  const handleToggle = () => {
    if (password === 'password') {
        setPasswordType('text');
    } else {
        setPasswordType('password');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErr('Passwords do not match');
      return;
    }

    setErr('')
    setLoading(true);


    try {
      const requestBody = { username, email, password };
        const response =await axios.post(`${VITE_API}/users/`, requestBody,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
      });

      if(response.status === 201) {
        setAlertConfig({
          message: 'User created successfully',
          severity: 'success',
        })
        setOpenNotify(true);
        window.location.href = '/';
      } 
    } catch (error) {
      setAlertConfig({
        message: error.response.data.detail || 'Error creating user',
        severity: 'error',
      })
      setOpenNotify(true);
    } finally {
        setLoading(false);
      }

  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="bg-blue-950 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl text-white font-bold mb-6">Signup</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <input
              placeholder='Username'
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
           
          </div>
          <div className="mb-4">
            <input
              placeholder='Email'
              type={handleToggle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div className="relative">
              <input
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
              <button 
                type="button" 
                onClick={handleTogglePassword} 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-500 text-sm"
              >
                <Icon icon={showPassword ? eyeOff : eye} />
              </button>
            </div>
          <div className="mt-4">
            <div className='relative'>
                <input
                placeholder='Confirm Password'
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                onChange={(e) => setconfirmPassword(e.target.value)}
                required
                />
                <button 
                    type="button" 
                    onClick={handleTogglePassword} 
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-500 text-sm"
                    >
                    <Icon icon={showPassword ? eyeOff : eye} />
                </button>
            </div>
          </div>

          {err && (
            <div className='flex justify-center items-center bg-red-200 w-full h-9 mb-4 mt-4 rounded-full'>
              <p className="text-red-500 font-bold">{err}</p>
            </div>
          )}
           {loading ? (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 mt-5"
            >
              Login
            </button>
          )}
        </form>
      </div>
      <AlertNotify open={openNotify} handleClose={setOpenNotify} config={alertConfig}/>
    </div>
  );
}

export default Signup;
