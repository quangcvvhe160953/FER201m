import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useContext, useRef } from 'react'
import { UserContent } from '../App'
import { createBrowserHistory } from 'history';


function Search() {

    const navigate = useNavigate()
    const history = createBrowserHistory();
    const { allfilms } = useContext(UserContent)
    const { setAllfilms } = useContext(UserContent)
   



    const { searchval } = useParams();
    const s = String(searchval)
    console.log(s);
    const { filteredFilm, setFilteredFilm } = useContext(UserContent)
    useEffect((e) => {

        setFilteredFilm(allfilms.filter((film) => film.name.toLowerCase().includes(s.toLowerCase())));

    }, [allfilms]);






    const CatenameID = allfilms.reduce((aprev, anext) => {

        if (!aprev.includes(anext.category)) {
            aprev.push(anext.category);
        }
        return aprev;
    }, []);




    const filter = (name) => {

        name.includes("all") ? setFilteredFilm(allfilms) : setFilteredFilm(allfilms.filter((p) => p.category.includes(name)))
        history.push("/films/" + name)
    }






    return (


        <div>
          


                <div class="row justify-content-center mt-3 mb-2">
                    <h2 class='btn btn-outline-success border-success rounded-circle mr-3' onClick={() => filter("all")}>All</h2>
                    

                        {CatenameID.map((category) => (
                           
                                <h2 class='btn btn-outline-success border-success rounded-circle mr-3 ml-3' onClick={() => filter(category)}>{category}</h2>
                          
                        ))}
               
                 </div>


            <div class="container card mb-5 mt-2">
                
                <ul class="mt-3" style={{ textDecoration: 'none', fontSize: '7px' }}>
                    <div class="row">
                        {filteredFilm.map((p) => (
                            <div class="col-3 border-3  mb-5" style={{ width: '150x', height: '400px' }}>
                                <li class="card btn" onClick={() => navigate(`/detail/${p.category}/${p.id}`)}>
                                    <img src={require(`./images/${p.img}`)} width='100%' height={'200px'} alt="" />
                                    <br />
                                    <p class="text-center" style={{ fontSize: '12px', fontWeight: 'bolder' }}>{p.name}</p>

                                    <p style={{ fontSize: '10px', fontWeight: 'bolder' }}>Public year : {p.publicdate}</p>
                                    <p style={{ fontSize: '10px', fontWeight: 'bolder' }}>Category : {p.category}</p>
                                    <p style={{ fontSize: '10px', fontWeight: 'bolder' }}>Vote Rate :{parseFloat(JSON.parse(localStorage.getItem(`${p.id}`)))  ? (parseFloat(JSON.parse(localStorage.getItem(`${p.id}`))).toFixed(1)) : "0" }</p>
                                    <p class="btn btn-success" style={{ fontSize: '12px', fontWeight: 'bolder' }}>VOTE</p>
                                </li>
                            </div>
                        ))}
                    </div>
                   
                </ul>
                
            </div>
        </div>



    )
}



export default Search;