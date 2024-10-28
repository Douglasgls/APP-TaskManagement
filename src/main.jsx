import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Task from './pages/Task.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import TaskWell from './pages/TaskWell.jsx';
import React from 'react';
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <App/>,
    children: [
      {
        path: "tasks",
        element: <Task/>
      },
      {
        path: "review",
        element: <TaskWell />
      }
    ]
  },

])


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
