import {Card} from "@/components/Card/card.tsx";
import type {RestaurantWithRating} from "@/features/restaurants/restaurant";

type CardRestaurantProps = RestaurantWithRating & {
    selectedRestaurantsState?: boolean;
    handleSelectRestaurant?: () => void;
}

const cardRestaurant = ({
                            restaurantId,
                            imageUrl,
                            name,
                            rating,
                            priceSymbols,
                            location,
                            selectedRestaurantsState,
                            handleSelectRestaurant
                        }: CardRestaurantProps) => {
    return (
        <Card key={restaurantId} imageUrl={imageUrl}
              alt={`Image of ${name}`} rating={rating}
              onClick={handleSelectRestaurant}
              className={`border-1 rounded-lg  block transition-transform hover:scale-[1.02] overflow-hidden shadow-md duration-300 ${
                  selectedRestaurantsState
                      ? "border-gray-800"
                      : "border-none"
              }`} content={
            <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center justify-between gap-4">
                    <h2 className="text-lg font-['Agbalumo'] font-semibold text-gray-700 truncate">{name}</h2>
                    <p className="text-md font-medium font-[Figtree] text-gray-600">{priceSymbols}</p>
                </div>
                <p className="text-md font-medium font-[Figtree] text-gray-600 truncate">{location}</p>
            </div>
        }/>
    )
}

export default cardRestaurant
