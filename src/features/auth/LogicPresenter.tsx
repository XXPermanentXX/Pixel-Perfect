import React, { useState } from "react"
import LoginFormView from "./LoginFormView"

const LoginComponent: React.FC = () => {
    // const [formState,setFormState] = useState({
    //     username: "",
    //     password: "",
    // });


    return (
        <LoginFormView formState={formState} />
    )

}

export default LoginComponent