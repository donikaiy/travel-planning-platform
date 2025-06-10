import {Button} from "@/components/ui/button.tsx";
import {Card} from "@/components/Card/card.tsx";
import {useNavigate} from "react-router-dom";
import type {Hotel} from "../../hotel";

type CardHotelProps = Hotel & {
    selectedHotelsState?: boolean;
    handleSelectHotel?: () => void;
}

const CardHotel = ({
                       hotelId,
                       imageUrl,
                       name,
                       rating,
                       price,
                       selectedHotelsState,
                       handleSelectHotel
                   }: CardHotelProps) => {
    const navigate = useNavigate();

    return (
        <Card key={hotelId} imageUrl={imageUrl}
              alt={`Image of ${name}`} rating={rating} onClick={handleSelectHotel}
              className={`block transition-transform hover:scale-[1.02] rounded-lg overflow-hidden shadow-md border-1 duration-300 ${
                  selectedHotelsState
                      ? "border-gray-800"
                      : "border-none"
              }`} content={
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-['Agbalumo'] font-semibold text-gray-700 truncate">{name}</h2>
                    <p className="text-md font-medium font-[Figtree] text-gray-600">from
                        €{price} / per night</p>
                </div>
                <Button className="bg-gray-800 hover:bg-gray-700 font-['Figtree']" onClick={() => navigate(`/hotels/${hotelId}`)}>Hotel
                    Info</Button>
            </div>
        }/>
    )
}

export default CardHotel
