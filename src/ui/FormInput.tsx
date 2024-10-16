import {  Input } from "@nextui-org/react"

interface FormInputProps {
    label:string,
    value:string,
    onValueChange: (value)=>{value}
}

const FormInput: React.FC<FormInputProps> = ({label,value}) => {
    return (
        <div className="h-[80px] w-full">
            <Input 
                isRequired
                label={label}
                value={value}
                onValueChange={onValueChange}
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