import { useState } from "react"
import Register from "../Components/Register";
import Login from "../Components/Login";

const Start = () => {

    const [displayRegister, setDisplayRegister] = useState(true);
    
    const setActive = (e) => {

        switch(e.target.firstChild.data){

            case "REGISTER":
                e.target.className = "active";
                e.target.nextElementSibling.className = "";
                setDisplayRegister(true);
                break;
            case "LOGIN":
                e.target.className = "active";
                e.target.previousSibling.className = "";
                setDisplayRegister(false);
                break;
        }

    }

    return (
        <div className="start-container">

            <nav>
                <button onClick={(e) => setActive(e)} className="active" id="register">REGISTER</button>
                <button onClick={(e) => setActive(e)} id="login">LOGIN</button>
            </nav>
            
            {displayRegister ? 
            (   
                <Register setDisplayRegister={setDisplayRegister}/>               
            ):
            (
                <Login/>
            )}
        </div>
    )
}
export default Start