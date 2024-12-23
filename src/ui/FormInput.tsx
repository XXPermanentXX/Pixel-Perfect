import { FormInputProps } from "@/models/types"
import {  Input } from "@nextui-org/react"



const FormInput: React.FC<FormInputProps> = ({type,label,value,onValueChange, ...props}) => {
    return (
        <div className="h-[80px] w-full">
            <Input 
                isRequired
                type= {type}
                label={label}
                value={value}
                onValueChange={onValueChange}
                radius="sm"
                variant="bordered"
                classNames={{
                    input:["text-white"],
                    inputWrapper: ["border-default-400 data-[hover=true]:border-default-500"],
                }}
                //  allows any additional props to be passed in and override defaults
                {...props}
            />
        </div>
    )
}

export default FormInput