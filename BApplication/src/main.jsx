import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ListScreen } from './components/ListScreen';
import { DetailScreen } from './components/DetailScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/questions/filter",
     element: <ListScreen />
  },
  {
    path: "/questions/:questionId",
    element: <DetailScreen />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
