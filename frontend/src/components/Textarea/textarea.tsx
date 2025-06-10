import {Label} from "@/components/ui/label.tsx";
import * as React from "react";
import {Textarea} from "@/components/ui/textarea.tsx";

type TextareaProps = {
    htmlFor: string,
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextareaComponent = ({htmlFor, label, value, onChange}: TextareaProps) => {
    return (
        <div className="grid w-full gap-1.5">
            <Label htmlFor={htmlFor} className="text-sm font-medium font-[Figtree] text-gray-800">{label}</Label>
            <Textarea id={htmlFor} value={value} onChange={onChange}
                      className="text-sm font-medium font-[Figtree] text-gray-700 focus-visible:ring-0"/>
        </div>
    )
}

export default TextareaComponent;
