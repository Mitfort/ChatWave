import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useContext, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [isError,setIsError] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const passowrd = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth,email,passowrd);
      navigate("/Home");
    }catch(err){
      setIsError(true);
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={handleLoginSubmit} className="authForm">
        <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email"></input>
        </div>
                            
        <div className="form-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"></input>
        </div>

        <button type="submit" className="form-button">SIGN IN</button>

        {isError ? <span style={{color:"red", textAlign: 'center', marginTop: '20px'}}>Wrong Email Or Password</span> : <></>}
      </form>
    </>
  )
}
export default Login