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

  const [average, setAverage] = useState(0)


  const [vote, setVote] = useState({ idfilm: 0, email: '', name: '', mark: '', comment: '' })


  const { catename } = useParams();
  const { id } = useParams();

  const handleVote = () => {
    window.location.href = '/login'
  }



  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const usersFromStorage = localStorage.getItem("user");
    if (usersFromStorage) {
      setUser(JSON.parse(usersFromStorage));
    }
    console.log(usersFromStorage);
  }, []);





  ///ADD COMMENT TO LOCALSTORAGE  
  const handleComment = (e) => {
    e.preventDefault()

    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    if (!Array.isArray(comments)) {
      comments = [];
    }

    const mark = e.target.mark.value;
    const comment = e.target.comment.value;
    console.log(mark);
    console.log(comment);
    if (parseFloat(mark) < 0 || parseFloat(mark) > 10 || !mark.trim() || isNaN(mark)) {
      alert('Please input mark from 0 to 10 !')
    } else {
      let markfloat = parseFloat(mark);

      const checkExist = comments.findIndex(c => c.email === user.email && c.idfilm === id);
      if (checkExist !== -1) {

        const updatedComment = { ...comments[checkExist], mark, comment };
        comments.splice(checkExist, 1, updatedComment);
        localStorage.setItem(`comments`, JSON.stringify(comments));
      } else {

        const newComment = { idfilm: id, email: user.email, name: user.name, mark, comment };
        comments.push(newComment);
        localStorage.setItem(`comments`, JSON.stringify(comments));
      }

      // Tinh trung binh diem cua 1 bo phim
      const marksBySameId = comments.filter(c => c.idfilm === id);
      const sum = marksBySameId.reduce((sum, comment) => sum + parseFloat(comment.mark), 0);
      const average = parseFloat(sum / marksBySameId.length);
      setAverage(average);
      localStorage.setItem(`${id}`, JSON.stringify(average));
      window.location.href = `/detail/${catename}/${id}`
    }
  }


  ///lay comment tren localstorage de display ra man hinh
  const list = JSON.parse(localStorage.getItem("comments")) || [];

  const commentslist = list.filter(f => f.idfilm === id);
  console.log(commentslist);

  //lay ra value cua average
  let averageValue = 0;
  const storedValue = localStorage.getItem(`${id}`);
  if (storedValue && !isNaN(parseFloat(storedValue))) {
    averageValue = parseFloat(storedValue).toFixed(1);
  }

  const film = allfilms.find(f => (f.category.includes(catename) && f.id === parseInt(id)));
  console.log(film.name);




  ///tim ra comment va danh gia diem cua 1 nguoi toi  1 bai viet
  const listnwew = JSON.parse(localStorage.getItem("comments")) || [];
  const [userFilter, setUserFilter] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const usersFromStorage = localStorage.getItem("user");
    if (usersFromStorage) {
      setUserFilter(JSON.parse(usersFromStorage));
    }
    console.log(usersFromStorage);
  }, []);

  const userComment = listnwew.find(f => (f.idfilm === id && f.email.trim().includes(userFilter.email)))
  console.log(userComment);





  return (
    <div >

      <div className='row mt-5 justify-content-center'>
        <div className='col-5'><img src={require(`./images/${film.img}`)} width='100%' height={'80%'} alt="" /></div>
        <div className='col-6'>
          <h1>{film.name}</h1>

          <p><span style={{ fontWeight: "bolder" }}>Category:</span>{film.category}</p>
          <p><span style={{ fontWeight: "bolder" }}>Mark:</span>{averageValue}</p>
          <p><span style={{ fontWeight: "bolder" }}>Description:</span>{film.description}</p>
          <hr />
          {localStorage.getItem("loggedin") ?
            (
              <>
                <h1>Detail vote</h1>
                <form onSubmit={handleComment}>
                  <label for="mark">Mark:&nbsp;</label><input type='text' id='mark' name='mark' placeholder={userComment ? (userComment.mark) : ""} /><br />
                  <div className='row mt-4'>
                    &nbsp;&nbsp;&nbsp;<label for="comment">Comment: </label>
                    <div className='col-12'>
                      <textarea rows="4" cols="50" id='comment' name="comment" placeholder={userComment ? (userComment.comment) : ""}>
                      </textarea>
                    </div>
                  </div>
                  <button type='sub' className='btn btn-success' >Vote</button>
                </form>
                <hr />
              </>
            ) :
            (
              <>
                <button className='btn btn-success' onClick={handleVote}>Vote</button><hr />

              </>
            )
          }
          <h1>Comments</h1>
          <div className='mt-3'>
            {commentslist ? (
              commentslist.map((comment) => (
                comment.comment ? (
                  <div key={comment.name}>
                    <div className='d-inline-flex'>
                      &nbsp;&nbsp; <div style={{ fontWeight: 'bolder' }}>{comment.name}:</div> &nbsp; {comment.comment}
                    </div>
                  </div>
                ) : null
              ))
            ) : null}
          </div>
        </div>
      </div>

    </div>
  );
}



