import React from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import DashBoard from "./Components/DashBoard";
import {Routes,Route} from "react-router-dom"


const App =()=>{
    // const [token,setToken] = useState("")

    

    return(
        <div>
            <Routes>
                <Route path="/"  element={<Signup />} />
                <Route path="/Login" element={<Login />}/>
                <Route path="/DashBoard" element={<DashBoard />}/>
            </Routes>
        </div>
    )
}

export default App