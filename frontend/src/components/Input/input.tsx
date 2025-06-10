import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import * as React from "react";

type InputProps = {
    htmlFor: string,
    label: string,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: "text" | "number",
}

const InputComponent = ({htmlFor, label, value, onChange, type = "text"}: InputProps) => {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={htmlFor} className="text-sm font-medium font-[Figtree] text-gray-800">{label}</Label>
            <Input type={type} id={htmlFor} value={value} onChange={onChange}
                   className="text-sm font-medium font-[Figtree] text-gray-700 focus-visible:ring-0"/>
        </div>
    )
}

export default InputComponent
