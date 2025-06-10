import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx";
import Footer from "@/components/Footer/footer.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import * as React from "react";
import SaveButton from "@/components/SaveButton/saveButton.tsx";
import { useTravelPlan } from "@/contexts/travelContext";
import { useGetAllRestaurants } from "@/features/restaurants/api/useRestaurants";
import type { RestaurantWithRating } from "@/features/restaurants/restaurant";
import CardRestaurant from "@/features/restaurants/components/CardRestaurant/cardRestaurant.tsx";

const Restaurants = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {data: restaurants} = useGetAllRestaurants(location.state && {
        cityId: location.state.cityId,
    });

    const {setSelectedRestaurants} = useTravelPlan();
    const [selectedRestaurantsState, setSelectedRestaurantsState] = React.useState<RestaurantWithRating[]>([]);


    const handleSelectRestaurant = (restaurant: RestaurantWithRating) => {
        const isSelected = selectedRestaurantsState.some(selectedRestaurant => selectedRestaurant.restaurantId == restaurant.restaurantId);

        if (isSelected) {
            setSelectedRestaurantsState(prevState => prevState.filter(selectedRestaurant => selectedRestaurant.restaurantId !== restaurant.restaurantId))
        } else {
            setSelectedRestaurantsState(prevState => [...prevState, restaurant])
        }
    }

    const handleSaveRestaurants = () => {
        if (setSelectedRestaurantsState.length > 0) {
            setSelectedRestaurants(selectedRestaurantsState)
        }

        navigate('/attractions', {state: {cityId: location.state.cityId}})
    }

    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8 p-8 mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800">Restaurants</h2>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {restaurants?.map(restaurant => (
                        <CardRestaurant restaurantId={restaurant.restaurantId} cityId={restaurant.cityId}
                                        name={restaurant.name} location={restaurant.location}
                                        imageUrl={restaurant.imageUrl}
                                        priceSymbols={restaurant.priceSymbols}
                                        rating={restaurant.rating}
                                        handleSelectRestaurant={() => handleSelectRestaurant(restaurant)}
                                        selectedRestaurantsState={selectedRestaurantsState.some(r => r.restaurantId === restaurant.restaurantId)}/>
                    ))}
                </div>

                <div className="flex justify-center mt-6">
                    <SaveButton handleSave={handleSaveRestaurants} selectedItemState={selectedRestaurantsState}/>
                </div>

                <Footer/>
            </section>
        </main>
    )
}

export default Restaurants
