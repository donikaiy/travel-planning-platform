import {Check} from "lucide-react";

type ListCheckIconProps = {
    key?: number,
    text: string,
    info?: string
}

const ListCheckIcon = ({key, text, info}: ListCheckIconProps) => {
    return (
        <li key={key} className="flex flex-col gap-2 items-start">
            <div className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5"/>
                <span className="text-md font-medium font-[Figtree] text-gray-700">{text}</span>
            </div>
            {info && <p className="text-md font-medium font-[Figtree] text-gray-700">{info}</p>}
        </li>
    )
}

export default ListCheckIcon;
