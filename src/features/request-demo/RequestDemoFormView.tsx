import FormInput from "@/ui/FormInput";
import { FormInputProps } from "@/models/types";
import { companySizes, industries } from "../../models/staticDataModel";
import FormSelect from "@/ui/FormSelect";
import { Button, Link, Spinner } from "@nextui-org/react";

const RequestDemoFormView = ({ formState, fieldValidity, onInputChange, submitRequest, isLoading }:FormInputProps) => {
  const { firstName, lastName, email, requestContent } = formState;

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center">
      <div className="space-y-5">
        <h2 className="text-center font-semibold">Request a demo</h2>
        <p className="max-w-lg text-center">
          How can PixelPerfect AI leverage your marketing and sales? <br />
          Send a request and our team will contact you shortly.
        </p>
      </div>
      <div className="flex w-full flex-col space-y-2 pb-6 pt-12">
        <div className="flex space-x-10">
          <FormInput label="First name" value={firstName} onValueChange={onInputChange("firstName")} isInvalid={!fieldValidity.firstName ? 1 : false} errorMessage="Please enter your first name" />
          <FormInput label="Last name" value={lastName} onValueChange={onInputChange("lastName")} isInvalid={!fieldValidity.lastName ? 1 : false} errorMessage="Please enter your last name" />
        </div>
        <div>
          <FormInput type="email" label="Work email" value={email} onValueChange={onInputChange("email")} isInvalid={!fieldValidity.email ? 1 : false} errorMessage="Please enter a valid email" />
        </div>
        <div className="flex space-x-10">
          <FormSelect label="Company size" placeholder="Select a number.." items={companySizes} onSelectionChange={onInputChange("companySize")} isInvalid={!fieldValidity.companySize ? 1 : false} errorMessage="Please select your company size" />
          <FormSelect label="Industry" placeholder="Select an industry.." items={industries} onSelectionChange={onInputChange("industry")} isInvalid={!fieldValidity.industry ? 1 : false} errorMessage="Please select your industry" />
        </div>
        <div>
          <FormInput label="Product you want to promote" value={requestContent} onValueChange={onInputChange("requestContent")} isInvalid={!fieldValidity.requestContent ? 1 : false} errorMessage={"Please enter the project information"} />
        </div>
      </div>
      <div className="flex justify-center space-x-10">
        <Button as={Link} href="/" size="lg" radius="full" variant="solid" color="primary" className="w-48 bg-white text-primary">
          BACK
        </Button>
        <Button size="lg" radius="full" variant="solid" color="primary" className="w-48" isLoading={isLoading} spinner={<Spinner color="white" size="sm" />} onClick={submitRequest}>
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default RequestDemoFormView;
