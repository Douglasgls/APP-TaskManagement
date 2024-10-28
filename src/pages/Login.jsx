import React from "react";
import { useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import axios from "axios";
import AlertNotify from "../components/alertNotify";
import { Typography } from "@mui/material";


import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const VITE_API = import.meta.env.VITE_API 

function Login() {
    const [email, setEmail] = useState("");

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [password, setPassword] = useState("");

  
    const [openNotify, setOpenNotify] = React.useState(false);
    const [alertConfig, setAlertConfig] = React.useState({
        message: '',
        severity: '',
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = new URLSearchParams();
            requestBody.append('grant_type', 'password');
            requestBody.append('username', email);
            requestBody.append('password', password);
            requestBody.append('scope', '');
            requestBody.append('client_id', 'string');
            requestBody.append('client_secret', 'string');
            const response = await axios.post(VITE_API + '/auth/token', requestBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            if (response.status === 200) {
                setAlertConfig({
                    message: 'Login realizado com sucesso',
                    severity: 'success',
                })
                setOpenNotify(true);
                setInterval(() => {
                  localStorage.setItem('access_token', response.data.access_token);
                  window.location.href = '/dashboard/review';
                }, 1000)
            }
        } catch (error) {
          console.log(error);
          setAlertConfig({
            message: error.response.data.detail || 'Erro ao realizar login',
            severity: 'error',
        })
        setOpenNotify(true);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="bg-blue-950 p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between">
            <Typography
                component="h1"
                variant="h4"
                fontWeight="bold"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)',color: 'white',mb:6 }}
              >
                Sign in
          </Typography>
                <div className="w-20 h-20 mx-auto mb-6">
                    <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Google_Tasks_2021.svg/1079px-Google_Tasks_2021.svg.png"/> 
                </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 font-semibold mb-2">Email:</label>
                <Input
                    id="email"
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    sx={{ backgroundColor: 'white' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourEmail@gmail"
                 />
              </div>
              <div className="mb-4">
                <label 
                  className="block text-gray-400 font-semibold mb-2">Password:</label>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    placeholder="********"
                    sx={{ backgroundColor: 'white' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                    <InputAdornment position="end" sx={{  backgroundColor: 'white'}}>
                     <IconButton
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    }
                 />
              </div>
              <div className="flex items-center justify-between mb-6">
                <a href="#" className="text-gray-400 hover:text-white">Forgot Password?</a>
                <a href="/signup" className="text-gray-400 hover:text-white">Sign Up</a>
            </div>
              <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
          <AlertNotify open={openNotify} handleClose={setOpenNotify} config={alertConfig}/>
        </div>
      );
}

export default Login