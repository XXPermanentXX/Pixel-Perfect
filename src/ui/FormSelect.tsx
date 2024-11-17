import { FormInputProps } from "@/models/types";
import { Select, SelectItem } from "@nextui-org/react";

interface SelectOption {
  label: string;
  value: string;
}

const FormSelect = ({label, placeholder, items, value, onSelectionChange, ...props}: FormInputProps ) => {
  const options: SelectOption[] = items ? items.map((item) => ({
    label: item,
    value: item,
  })) : [];
    return (
        <div className="h-[80px] w-full">
            <Select
                isRequired
                label={label}
                radius="sm"
                variant="bordered"
                onSelectionChange={(val) => onSelectionChange(Array.from(val)[0])}
                className={{
                    value: ["group-data-[has-value=true]:text-white"],
                    selectorIcon: ["text-foreground-400"],
                    trigger: ["text-foreground-400 data-[hover=true]:border-default-500"],
                } as any}
                {...props}
            >
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};

export default FormSelect;  

