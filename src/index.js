import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./Context/ContextProvider";
import "./style.css"



const root = ReactDOM.createRoot(document.getElementById('root'));
// ReactDOM.render(<App />,document.getElementById("root"));
root.render(
    <ContextProvider>
        <BrowserRouter>
                   <App/>
        </BrowserRouter>
    </ContextProvider>
)