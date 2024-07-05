import { useState } from "react";
import Register from "./Register";
import Login from "./Login"


function LeftTabsExample() {
    const [auth, setauth] = useState("login")

    return (
        <div className="register-page">
            <div className="register-container">
            <div className="register-tab">
                <div className={"register-tab__login" + (auth === "login" ? " active" : "")} onClick={()=>setauth("login")}>
                    Login
                </div>
                <div className={"register-tab__register" + (auth === "register" ? " active" : "") } onClick={()=>setauth("register")}>
                    Register
                </div>
            </div>

            <div className="register-container__form">
                {auth === "login" ? <Login/>  : <Register/>}
            </div>
            </div>
    
        </div>

    );
}

export default LeftTabsExample;
