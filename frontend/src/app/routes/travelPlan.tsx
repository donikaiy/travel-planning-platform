import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx";
import Footer from "@/components/Footer/footer.tsx";
import {useTravelPlan} from "@/contexts/travelContext.tsx";
import CardFlight from "@/features/flights/components/CardFlight/cardFlight.tsx";
import CardHotel from "@/features/hotels/components/CardHotel/cardHotel";
import CardRestaurant from "@/features/restaurants/components/CardRestaurant/cardRestaurant";
import CardAttraction from "@/features/attractions/components/CardAttraction/cardAttraction.tsx";

const TravelPlan = () => {
    const {selectedFlights, selectedHotels, selectedRestaurants, selectedAttractions} = useTravelPlan()

    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8 p-8 mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800">Travel Plan</h2>

                {selectedFlights.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold text-gray-700">Flights</h3>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

                            {selectedFlights.map(selectedFlight => (
                                <CardFlight flightId={selectedFlight.flightId}
                                            originCityId={selectedFlight.originCityId}
                                            destinationCityId={selectedFlight.destinationCityId}
                                            departAt={selectedFlight.departAt} arriveAt={selectedFlight.arriveAt}
                                            numberOfStops={selectedFlight.numberOfStops} price={selectedFlight.price}
                                            imageUrl={selectedFlight.imageUrl} airline={selectedFlight.airline}
                                            originCity={selectedFlight.originCity}
                                            destinationCity={selectedFlight.destinationCity}/>
                            ))}
                        </div>
                    </div>
                )}

                {selectedHotels.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold text-gray-700">Hotels</h3>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {selectedHotels.map(selectedHotel => (
                                <CardHotel hotelId={selectedHotel.hotelId} galleryId={selectedHotel.galleryId}
                                           cityId={selectedHotel.cityId}
                                           name={selectedHotel.name} location={selectedHotel.location}
                                           about={selectedHotel.about} price={selectedHotel.price}
                                           preferredGalleryEntryId={selectedHotel.preferredGalleryEntryId}
                                           imageUrl={selectedHotel.imageUrl}
                                           rating={selectedHotel.rating}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {selectedRestaurants.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold text-gray-700">Restaurants</h3>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {selectedRestaurants.map(selectedRestaurant => (
                                <CardRestaurant restaurantId={selectedRestaurant.restaurantId}
                                                cityId={selectedRestaurant.cityId}
                                                name={selectedRestaurant.name} location={selectedRestaurant.location}
                                                imageUrl={selectedRestaurant.imageUrl}
                                                priceSymbols={selectedRestaurant.priceSymbols}
                                                rating={selectedRestaurant.rating}
                                />
                            ))}
                        </div>
                    </div>
                )}


                {selectedAttractions.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold text-gray-700">Attractions</h3>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {selectedAttractions.map(selectedAttraction => (
                                <CardAttraction attractionId={selectedAttraction.attractionId}
                                                cityId={selectedAttraction.cityId}
                                                name={selectedAttraction.name} location={selectedAttraction.location}
                                                imageUrl={selectedAttraction.imageUrl}
                                                description={selectedAttraction.description}
                                                openingHours={selectedAttraction.openingHours}
                                                bestTimeToVisit={selectedAttraction.bestTimeToVisit}
                                                ticketsWebsite={selectedAttraction.ticketsWebsite}
                                                additionalInformation={selectedAttraction.additionalInformation}
                                />
                            ))}
                        </div>
                    </div>)}

                <Footer/>
            </section>
        </main>
    )
}

export default TravelPlan
