import React, { useState,useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";



const DashBoard =()=>{

    const {token,setToken} = useContext(UserContext)
    const [welcome,setWelcome] = useState("")

    // console.log(welcome)
    const [dashMsg,setDashMsg] = useState("")
    const navigation = useNavigate()

    useEffect(()=>{
        token && implimentDashBoard()
    },[token])
    useEffect(()=>{
        if(!token){
            let jsonToken = localStorage.getItem("token")
            if (!jsonToken){
                navigation("/Login")
            }else{
                setToken(JSON.parse(jsonToken))
            }
        }
    },[])


    async function implimentDashBoard(){
        try{
            const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            setDashMsg(response.data.data.message)
            setWelcome(response.data.data.user.name)
        }
        catch(err){
            console.log(err)
        }
    }


    async function handlingLogOut(){
        // const logOutButton = document.getElementsByClassName("displayButton")
        // logOutButton.classList.add("toDelete")
        try{
            const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            setToken("")
            setWelcome("")
            setDashMsg("")
            alert("LogOut sucessfull")
            navigation("/Login")
        }
        catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <div className="logOutButton">
                <button onClick={handlingLogOut}>Log Out</button>
            </div>
            <div className="displayButton">
                <h1>Welcome {welcome}</h1>
               {
                   dashMsg && <h1>{dashMsg}</h1> 
                }
                {/* <button onClick={implimentDashBoard}>Refresh Msg</button> */}
            </div>
        </div>
    )
}


export default DashBoard
