import React,{useState} from "react";
import UserContext from "./UserContext";



const ContextProvider =(props)=>{

    const [token,setToken] = useState("")

    // console.log(token)

    return (
        <UserContext.Provider value={{
            token:token,
            setToken:setToken
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default ContextProvider