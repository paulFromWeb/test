import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Modal from './components/modal'
import fakeData from './MOCK_DATA.json'

const root = ReactDOM.createRoot(document.getElementById('root'))
if (!!JSON.parse(localStorage.getItem('reminders')) === false) {
  localStorage.setItem('reminders', JSON.stringify(fakeData))
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path={`/reminders/:id`} element={<Modal />} />
        </Route>
      </Routes>
    </BrowserRouter>
    ,
  </React.StrictMode>
)
