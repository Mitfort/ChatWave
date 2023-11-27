import { useContext } from "react";
import Home from "./Pages/Home.jsx";
import Start from "./Pages/Start.jsx";

import { BrowserRouter , Navigate, Route, Routes} from "react-router-dom";
import { AuthContext } from "./Context/AuthContext.jsx";
import { Settings } from "@mui/icons-material";

function App() {
  const {currentUser} = useContext(AuthContext);
  
  const ProtectedRoute = ({children}) => {
    if(!currentUser || currentUser == null){
      return <Navigate to={"/"}/>
    }

    return children;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Start/>}/>
            <Route path="/Home" element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }/>
            <Route path="/Settings" element={
              <ProtectedRoute>
                <Settings/>
              </ProtectedRoute>
            }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
