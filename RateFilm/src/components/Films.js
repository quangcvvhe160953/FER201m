import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useContext, useRef } from 'react'
import { UserContent } from '../App'
import { createBrowserHistory } from 'history';


function Films() {
    const {status, setStatus} = useContext(UserContent)
    console.log(status);
    const navigate = useNavigate()
    const history = createBrowserHistory();
    const { allfilms } = useContext(UserContent)
    const { setAllfilms } = useContext(UserContent)
    console.log(allfilms);
    

    const { catename } = useParams();
    const { filteredFilm } = useContext(UserContent)
    const { setFilteredFilm } = useContext(UserContent)
    useEffect((e) => {
        if (catename.includes("all")) {
            setFilteredFilm(allfilms);
        } else if (catename) {
            setFilteredFilm(allfilms.filter((p) => p.category.includes(catename)));

        }
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



        <div class="row mb-5">

           

            <div class="col-2 card ">
                <h2 class='btn btn-success mt-5 mb-2' onClick={() => filter("all")}>All</h2>
                <div class="row justify-content-center">
      
                    {CatenameID.map((category) => (
                        <div class="col-8 mb-4 ">
                            <div class='btn btn-outline-success col-12' onClick={() => filter(category)}>{category}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div class="background-element col-10 card">


                <div class="mt-5">
                    <ul style={{ textDecoration: 'none', fontSize: '7px' }}>
                        <div class="row">
                            {filteredFilm.map((p) => (
                                <div class="col-3 border-3  mb-5" style={{ width: '150x', height: '400px' }}>
                                    <li class="card btn" onClick={() => navigate(`/detail/${p.category}/${p.id}`)}>
                                        <img  src={require(`./images/${p.img}`)} width='100%' height={'200px'} alt="" />
                                        <br/>
                                        <p class="text-center" style={{ fontSize: '14px',fontWeight: 'bolder' }}>{p.name}</p>
                                      
                                        <p style={{ fontSize: '12px',fontWeight: 'bolder'  }}>Public year : {p.publicdate}</p>
                                        <p style={{ fontSize: '12px',fontWeight: 'bolder'  }}>Category : {p.category}</p>
                                        <p style={{ fontSize: '12px',fontWeight: 'bolder'  }}>Vote Rate : {parseFloat(JSON.parse(localStorage.getItem(`${p.id}`)))  ? (parseFloat(JSON.parse(localStorage.getItem(`${p.id}`))).toFixed(1)) : "0" }</p>
                                        <p class="btn btn-success" style={{ fontSize: '12px',fontWeight: 'bolder'  }}>VOTE</p>
                                    </li>
                                </div>
                            ))}
                        </div>
                    </ul>
                </div>
            </div>
        </div>


    )
}



export default Films;