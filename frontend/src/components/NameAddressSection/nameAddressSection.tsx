import {MapPin} from "lucide-react";

type NameAddressSectionProps = {
    name: string | undefined,
    location: string | undefined,
}

const NameAddressSection = ({name, location}: NameAddressSectionProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-bold text-center text-gray-800">
                {name}
            </h2>
            <div className="flex flex-row gap-2 items-center">
                <MapPin size={20} className="text-gray-600" />
                <p className="text-lg text-center text-gray-600">{location}</p>
            </div>
        </div>
    )
}

export default NameAddressSection
