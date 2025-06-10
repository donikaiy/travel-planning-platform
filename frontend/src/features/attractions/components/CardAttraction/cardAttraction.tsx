import {Button} from "@/components/ui/button.tsx";
import {Card} from "@/components/Card/card.tsx";
import {useNavigate} from "react-router-dom";
import type {Attraction} from "@/features/attractions/attraction";

type CardAttractionProps = Attraction & {
    selectedAttractionState?: boolean;
    handleSelectAttraction?: () => void;
}

const CardAttraction = ({
                            attractionId,
                            imageUrl,
                            name,
                            location,
                            handleSelectAttraction,
                            selectedAttractionState
                        }: CardAttractionProps) => {
    const navigate = useNavigate()

    return (
        <Card key={attractionId} imageUrl={imageUrl}
              alt={`Image of ${name}`} onClick={handleSelectAttraction}
              className={`block hover:scale-[1.02] rounded-lg overflow-hidden shadow-md border-1 transition-colors duration-300 ${
                  selectedAttractionState
                      ? "border-gray-800"
                      : "border-none"
              }`} content={
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-['Agbalumo'] font-semibold text-gray-700 truncate">{name}</h2>
                    <p className="text-md font-medium font-[Figtree] text-gray-600 truncate">{location}</p>
                </div>
                <Button className="bg-gray-800 hover:bg-gray-700 font-['Figtree']"
                        onClick={() => navigate(`/attractions/${attractionId}`)}>Attraction Info</Button>
            </div>
        }/>
    )
}

export default CardAttraction
