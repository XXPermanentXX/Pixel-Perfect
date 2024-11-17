import FormInput from "@/ui/FormInput";
import { FormInputProps } from "@/models/types";
import { companySizes, industries } from "../../models/staticDataModel";
import FormSelect from "@/ui/FormSelect";
const RequestDemoFormView = ({ formState, fieldValidity, onInputChange, submitRequest, isLoading }: FormInputProps) => {
    const { firstName, lastName, email, requestContent } = formState;
    return (
        <div className="mx-auto flex flex-col max-w-lg items-center">
            <div className="space-y-5">
                <h2 className="text-center font-semibold">Request Demo</h2>
                <p className="max-w-lg text-center">
                    How can PixelPerfect AI leverage your marketing and sales? <br />
                    Send a request and our team will contact you shortly.
                </p>
            </div>
            <div className="w-full flex flex-col space-y-2 pb-6 pt-12">
                <div className="flex space-x-10">
                    <FormInput label="First name" value={firstName} onValueChange={onInputChange("firstName")} isInvalid={!fieldValidity.firstName ? 1: false} errorMessage="Please enter your first name" />
                    <FormInput label="Last name" value={lastName} onValueChange={onInputChange("lastName")} isInvalid={!fieldValidity.lastName ? 1: false} errorMessage="Please enter your last name" />
                </div>
                <div className="flex flex-col space-x-10">
                    <FormInput type="email" label="Work email" value={email} onValueChange={onInputChange("email")} isInvalid={!fieldValidity.email ? 1: false} errorMessage="Please enter your email" />
                </div>
                <div>
                    <FormSelect label="Company size" placeholder="Select a number.." items={companySize} onValueChange={onInputChange("company")} isInvalid={!fieldValidity.company ? 1: false} errorMessage="Please enter your company" />
                </div>
                
            </div>
            
        </div>
        
    )
};

export default RequestDemoFormView;


