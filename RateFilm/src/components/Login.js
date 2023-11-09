import React, { useState , useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContent } from '../App'
import dataUser from "./User.json";
const Login = () => {
  const navigate = useNavigate();
  const {status, setStatus} = useContext(UserContent)

  
  const [errorMsg, setErrorMsg] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("loggedin")) {
      navigate("/films/all");
    }
  }, [navigate]);
  

  const handleLogin = (e) => {
    let count = 0;
    e.preventDefault();
    const loggedesuer = JSON.parse(localStorage.getItem("users"));
    if(loggedesuer){
    console.log(localStorage.getItem("users"));
    for (let index = 0; index < loggedesuer.length; index++) {
      const element = loggedesuer[index];
      
      if (element && element.email && element.password) {
        if (
          input.email === element.email &&
          input.password === element.password
        ) {
          count=0;
          localStorage.setItem("loggedin", true);
          localStorage.setItem("user", JSON.stringify(element));
          window.location.href = 'films/all'
          return;
        } else {
          count++;
        }
      }
    }
    if(count >0 ){
    setErrorMsg("Wrong username or pass word!");
    }
  }else if(!loggedesuer){
    alert("Account is not existed")
  }
  
  };

  return (
    <div className="mt-5" style={{
      backgroundSize: 'cover',
      width : '100%',
      backgroundImage:
        "url('https://st.quantrimang.com/photos/image/2020/07/14/Hinh-Nen-Nhe-Nhang-QTM-7.jpg')",
      position: 'fixed',
      top: 15,
      left: 0,
      height: '100vh'
    }}>
   
      <div className="mask d-flex align-item-center mt-5 h-80 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Login</h2>
                  <form onSubmit={handleLogin}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Examplelcg">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            [e.target.name]: e.target.value,
                          })
                        }
                        id="form3Examplelcg"
                        className="form-control form-control-lg"
                        placeholder="Enter email*"
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Examplelcg">
                        Password:
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            [e.target.name]: e.target.value,
                          })
                        }
                        id="form3Examplelcg"
                        className="form-control form-control-lg"
                        placeholder="Enter password*"
                        required
                      />
                    </div>
                    {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                    {/* {errorMsg1 && <p style={{ color: "red" }}>{errorMsg1}</p>} */}
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body text-while"
                      >
                        Login
                      </button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                      You don't have an account yet?
                      <a href="/register" className="fw-bold text-body">
                        <u>Register here</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
