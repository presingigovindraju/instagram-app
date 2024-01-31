import axios from "axios";
import React,{useState,useContext} from "react";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";



const Login =()=>{

    const [user,setUser] = useState({email:"",password:""})
    
    let {email,password} = user
    const navigation = useNavigate()

    const {setToken} = useContext(UserContext)
    
    const [successOne,setSuccessOne] = useState("");
    const [errorOne,setErrorOne] = useState("");
    
    function updateUser(e){
        let key = e.target.name
        let value = e.target.value
        setUser({...user,[key]:value})
    }

    async function implimentLogin(e){
        e.preventDefault()
        
        try{
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login",
            {
            "email":email,
            "password":password
            }
        )
        // console.log(response.data)
        setSuccessOne(response.data.message)
        setErrorOne("")
        setUser({
            email:"",
            password:"",
        })
        setToken(response.data.data.token)
        localStorage.setItem("token",JSON.stringify(response.data.data.token))
        setErrorOne("");
        alert("LogIn successFull")
        }
        catch(err){
            setErrorOne(err.response.data.message)
            setSuccessOne("")
        }
         navigation("/DashBoard")
    }


    return(
        <div>
            <h1>Login</h1>
            {
              successOne  && <h1>{successOne}</h1>
            }
            {
                errorOne && <h1>{errorOne}</h1>
            }
            <form onSubmit={implimentLogin}>
             <input type="email" placeholder="Email" name="email" value={email} onChange={updateUser}/>
             <input type="password" placeholder="Pasword" name="password" value={password} onChange={updateUser}/>
             <button type="submit">submit</button>
            </form>
        </div>
    )
}


export default Login



