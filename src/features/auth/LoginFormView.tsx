import { formState } from "@/models/types";
import FormInput from "@/ui/FormInput"
import { useState } from "react";
import { EyeSlashFilledIcon } from "@/ui/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/ui/EyeFilledIcon";
import { Button ,Link, Spinner} from "@nextui-org/react";
interface LoginFormViewProps {
    formState: formState,
    fieldValidity: {
        username:boolean,
        password:boolean,
    }
    onInputChange:any,
    submitLogin:any,
    isLoading:boolean,
    errorMessage: any,
    
}

const LoginFormView: React.FC<LoginFormViewProps> = ({formState,fieldValidity, onInputChange,submitLogin,isLoading,errorMessage}) => {
    const {username, password} = formState;
    const [isVisible,setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible)
    return (
        <div className="mx-auto flex max-w-xl flex-col items-center">
            <div className="flex flex-col items-center space-y-5">
                <h2 className="text-center font-semibold">Try PixelPerfect</h2>
                <p className="max-w-lg text-center">
                We are currently in closed beta, please contact us through <br />
                “REQUEST A DEMO” and we qwill get back to you.
                </p>
            </div>
            <div className="flex w-[400px] flex-col space-y-4 pb-10 pt-16">
                    <FormInput 
                        type="text" 
                        label="username" 
                        value={username} 
                        onValueChange={onInputChange("username")}
                        isInvalid={!fieldValidity.username ? 1 : false} 
                        errorMessage={"Please enter your username"}
                    />
                    <FormInput 
                        type={isVisible ? "text" : "password"} 
                        label="password" 
                        value={password} 
                        onValueChange={onInputChange("password")}
                        isInvalid={!fieldValidity.password || errorMessage ? 1 : false}
                        errorMessage={!fieldValidity.password ? "Please enter your password" : errorMessage}
                        endContent={
                            password !== "" && (
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" /> : <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />}
                            </button>
                            )
                        }/>
            </div>
            <div className="flex justify-center space-x-10">
                <Button as={Link} href="/" size="lg" radius="full" variant="solid" color="primary" className="w-48 bg-white text-primary">
                    BACK
                </Button>
                <Button size="lg" radius="full" variant="solid" color="primary" className="w-48" isLoading={isLoading} spinner={<Spinner color="white" size="sm" />} onClick={submitLogin}>
                    LOGIN
                </Button>
            </div>
        </div>
    )
} 

export default LoginFormView