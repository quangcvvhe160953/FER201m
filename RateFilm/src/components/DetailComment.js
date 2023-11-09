import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useContext, useRef } from 'react'
import { UserContent } from '../App'
import Films from './Films';

import { createBrowserHistory } from 'history';


export default function Detail() {

  


    const navigate = useNavigate()
    const history = createBrowserHistory();
    const { allfilms } = useContext(UserContent)
    const { setAllfilms } = useContext(UserContent)

    const refMark = useRef();
    const refComment = useRef();
    const { catename } = useParams();
    const { id } = useParams();
    const { email } = useParams();
    // console.log(catename);


    const film = allfilms.find(f => (f.category.includes(catename) && f.id === parseInt(id)));
    console.log(film.name);
    const filmStore = JSON.parse(localStorage.getItem("film"));
    console.log(filmStore)
    const filmComments = filmStore.comments;
    console.log(filmComments)
    const addReview = () => {
      const currentUser = JSON.parse(localStorage.getItem("user"));
        const existedCommentUser = filmComments.some(c => c.email == currentUser.email);
        if(existedCommentUser){
            var mark = refMark.current.value;
            var comment = refComment.current.value;
            filmStore = filmStore.map(f => {
                if(existedCommentUser.email == f.email){
                    return { ...f, mark, comment };
                }
            })
            localStorage.setItem("film", JSON.stringify(filmStore));
            // navigate("/detail/" + catename + "/" + id);
        } 
        else{
            var mark = refMark.current.value;
            var comment = refComment.current.value;
            const newUserComment = {
                name: currentUser.name,
                email: currentUser.email, 
                comment: comment, 
                mark: mark
            }
            filmStore.comments.push(newUserComment);
            localStorage.setItem("film", JSON.stringify(filmStore));
            console.log(newUserComment);
            // navigate("/detail/" + catename + "/" + id);
        }
    }

    return (
        <div >
          
            <div className='row mt-5 justify-content-center'>
              <div className='col-5'><img src={require(`./images/${film.img}`)} width='100%' height={'80%'} alt="" /></div>
              <div className='col-6'>
                <h1>{film.name}</h1>
      
                <p><span style={{fontWeight : "bolder"}}>Category:</span>{film.category}</p>
                <p><span style={{fontWeight : "bolder"}}>Mark:</span>{film.mark}</p>
                <p><span style={{fontWeight : "bolder"}}>Description:</span>{film.description}</p>
      
                
                <h1>Review Detail</h1>
                <p><span>Mark:</span>
                <input type="number" ref={refMark}/>
                </p>
                
                <p><span>Comment:</span><br/>
                <textarea rows="4" cols="50" ref={refComment}/>
                </p>

                <button onClick={addReview} className='btn btn-success'>Review</button><hr/>

                <h1>Comments</h1>
                {
                  filmComments.map(f => {
                    if(f.comment != null){
                    return (
                    <p><span style={{fontWeight : "bolder"}}>{f.name}:</span>{f.comment}</p>
                    )}})
                }
              </div>
            </div>
          
        </div>
      );
}



