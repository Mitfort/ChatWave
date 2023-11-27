import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../firebase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import User from "../Models/User";

const Register = ({setDisplayRegister}) => {
  const [firstPage,setFirstPage] = useState(true);
  const [newUser,setNewUser] = useState(new User);
  const [newPassword, setNewPassword] = useState("");

  const handlePageSwap = () => {
    setFirstPage(!firstPage);
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try{
      const res = await createUserWithEmailAndPassword(auth, newUser.email, newPassword);

      await setDoc(doc(db,"users",res.user.uid),{
        userID: res.user.uid,
        login: newUser.login,
        email: newUser.email,
        first_name: newUser.fname,
        last_name: newUser.lname,
        nickname: `${newUser.lname}${newUser.fname[0]}`,
        birthday: newUser.birthday,
        createdAt: new Date(),
        photoURL: "",
        friends: [],
        invitations: []
      });

      const login = document.querySelector("#login");
      const register = document.querySelector("#register");

      register.classList.remove("active");
      login.classList.add("active");
      setDisplayRegister(false);
    }
    catch(err){
      console.log(err);
    }
  
  }

  return (
    <>
      <form onSubmit={handleRegisterSubmit} id="registerForm" className="authForm">
        {firstPage ? (
          <div>
            <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" value={newUser.email} name="email" onInput={(e) => setNewUser({...newUser,email: e.target.value})}></input>
                <div></div>
            </div>
                        
            <div className="form-field">
                <label htmlFor="login">Login</label>
                <input type="text" id="login" value={newUser.login} name="login" onInput={(e) => setNewUser({...newUser,login: e.target.value})}></input>
                <div></div>
            </div>
                                
            <div className="form-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={newPassword} name="password" onInput={(e) => setNewPassword(e.target.value)}></input>
                <div></div>
            </div>

            <div className="form-button" onClick={handlePageSwap}>NEXT</div>
          </div>
        ) : 
          (
            <div>
              <div className="form-field">
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" value={newUser.fname} name="fname" onInput={(e) => setNewUser({...newUser,fname: e.target.value})}></input>
                <div></div>
              </div>
                          
              <div className="form-field">
                  <label htmlFor="lname">Last Name</label>
                  <input type="text" id="lname" value={newUser.lname} defaultValue=" " name="lname" onInput={(e) => setNewUser({...newUser,lname: e.target.value})}></input>
                  <div></div>
              </div>
                                  
              <div className="form-field">
                  <label htmlFor="bornIn">Your Birthday</label>
                  <input type="date" id="bornIn" name="bornIn" value={newUser.birthday} onInput={(e) => setNewUser({...newUser,birthday: e.target.value})}></input>
                  <div></div>
              </div>

              <button type="submit" className="form-button">REGISTER</button>

              <button type="button" className="form-button" onClick={handlePageSwap}>Back</button>
            </div>
          )
        }
      </form>
    </>
  )
}
export default Register