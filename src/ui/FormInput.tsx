import {  Input } from "@nextui-org/react"

interface FormInputProps {
    label:string,
}

const FormInput: React.FC<FormInputProps> = ({label}) => {
    return (
        <div className="h-[80px] w-full">
            <Input 
                isRequired
                label={label}
                radius="sm"
                variant="bordered"
                classNames={{
                    input:["text-white"],
                    inputWrapper: ["border-default-400 data-[hover=true]:border-default-500"],
                }}
                // todo
            />
        </div>
    )
}

export default FormInput