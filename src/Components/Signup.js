import axios from "axios";
import React,{useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
// import DashBoard from "./DashBoard";



const Signup =()=>{
    const navigation = useNavigate()
    const {setToken} = useContext(UserContext)
    

    const [user,setUser] = useState({name:"",email:"",password:"",confirmPassword:""})
    
    let {name,email,password,confirmPassword} = user
    
    const [successOne,setSuccessOne] = useState("");
    const [errorOne,setErrorOne] = useState("");
    
    // console.log(user)
    function updateUser(e){
        let key = e.target.name
        let value = e.target.value
        setUser({...user,[key]:value})

    }

    async function implimentSignin(e){
        e.preventDefault()
        
        try{
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",
            {
            "name":name,
            "email":email,
            "password":password
            }
        )
        // console.log(response.data)
        setSuccessOne(response.data.message)
        setErrorOne("")
        setUser({
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        })
        setToken(response.data.data.token)
        localStorage.setItem("token",JSON.stringify(response.data.data.token))
        alert("SignIn successFull")
        }
        catch(err){
            setErrorOne(err.response.data.message)
            setSuccessOne("")
        }
        navigation("/DashBoard")

    }


    return(
        <div>
            <h1>Signup</h1>
            {
              successOne  && <h1>{successOne}</h1>
            }
            {
                errorOne && <h1>{errorOne}</h1>
            }
            <form onSubmit={implimentSignin}>
             <input type="text" placeholder="Enter Name" name="name" value={name} onChange={updateUser}/>
             <input type="email" placeholder="Email" name="email" value={email} onChange={updateUser}/>
             <input type="password" placeholder="Pasword" name="password" value={password} onChange={updateUser}/>
             <input type="password" placeholder="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={updateUser}/>
             <button type="submit" >submit</button>
            </form>
            <hr/>
        </div>
    )
}


export default Signup



