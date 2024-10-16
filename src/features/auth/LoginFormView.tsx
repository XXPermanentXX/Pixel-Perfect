import { formState } from "@/store/models/types";
import FormInput from "@/ui/FormInput"

interface LoginFormViewProps {
    formState: formState
}

const LoginFormView: React.FC<LoginFormViewProps> = ({formState}) => {
    const {username, password} = formState;
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
                    <FormInput label="username" value={username} onValueChange={}/>
                    <FormInput label="password" value={password} onValueChange={}/>
            </div>
        </div>
    )
} 

export default LoginFormView