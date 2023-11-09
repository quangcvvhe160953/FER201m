import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom'
import './bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Films from './components/Films';
import data from './components/films.json'
import Detail from './components/Detail';
import Search from './components/Search';
import Login from "./components/Login";
import Register from "./components/Register.js";

import './App.css';
import Navbar from './components/Navbar';
import { useState, createContext, useEffect } from 'react';
export const UserContent = createContext()




function App() {


 
  

  const [allfilms, setAllfilms] = useState(data)

  const [filteredFilm, setFilteredFilm] = useState([]);

  return (
    <div>
      <UserContent.Provider
        value={{ filteredFilm, setFilteredFilm, allfilms, setAllfilms}}
      >
        <Navbar /> 

        <Router>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          
            <Route path="/films/:catename" element={<Films />}></Route>
            <Route path="/detail/:catename/:id" element={<Detail />}></Route>
            <Route path="/search/:searchval" element={<Search />}></Route>

          </Routes>
        </Router>

      </UserContent.Provider>
    </div>
  );
}

export default App;
