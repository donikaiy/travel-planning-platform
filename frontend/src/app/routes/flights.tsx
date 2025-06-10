import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx";
import Footer from "@/components/Footer/footer.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import * as React from "react";
import SaveButton from "@/components/SaveButton/saveButton.tsx";
import {Button} from "@/components/ui/button.tsx";
import { useTravelPlan } from "@/contexts/travelContext";
import type {Flight} from "@/features/flights/flight";
import {useGetAllFlightsRoundTrip} from "@/features/flights/api/useFlights.ts";
import CardFlight from "@/features/flights/components/CardFlight/cardFlight";

const Flights = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {data: flights} = useGetAllFlightsRoundTrip(location.state && {
        departureCityId: location.state.departureCityId,
        destinationCityId: location.state.destinationCityId,
        departAt: location.state.departAt,
        returnAt: location.state.returnAt,
    });

    const {setSelectedFlights} = useTravelPlan();
    const [selectedFlightsState, setSelectedFlightsState] = React.useState<Flight[]>([]);


    const handleSelectFlight = (flight: Flight) => {
        const isSelected = selectedFlightsState.some(selectedFlight => selectedFlight.flightId == flight.flightId);

        if (isSelected) {
            setSelectedFlightsState(prevState => prevState.filter(selectedFlight => selectedFlight.flightId !== flight.flightId))
        } else {
            setSelectedFlightsState(prevState => [...prevState, flight])
        }
    }

    const handleSaveFlights = () => {
        if (setSelectedFlightsState.length > 0) {
            setSelectedFlights(selectedFlightsState)
        }

        navigate('/hotels', {state: {cityId: location.state.destinationCityId}})
    }

    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8 p-8 mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800">Flights</h2>

                {flights &&
                flights.departureFlights &&
                flights.returnFlights &&
                flights.departureFlights.length > 0 &&
                flights.returnFlights.length > 0 ? (
                    <>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {flights?.departureFlights.map(flight => (
                                <CardFlight flightId={flight.flightId} originCityId={flight.originCityId}
                                            destinationCityId={flight.destinationCityId} departAt={flight.departAt}
                                            arriveAt={flight.arriveAt}
                                            numberOfStops={flight.numberOfStops} price={flight.price}
                                            imageUrl={flight.imageUrl} airline={flight.airline}
                                            originCity={flight.originCity}
                                            destinationCity={flight.destinationCity}
                                            selectedFlightsState={selectedFlightsState.some(f => f.flightId === flight.flightId)}
                                            handleSelectFlight={() => handleSelectFlight(flight)}/>
                            ))}
                            {flights?.returnFlights.map(flight => (
                                <CardFlight flightId={flight.flightId} originCityId={flight.originCityId}
                                            destinationCityId={flight.destinationCityId} departAt={flight.departAt}
                                            arriveAt={flight.arriveAt}
                                            numberOfStops={flight.numberOfStops} price={flight.price}
                                            imageUrl={flight.imageUrl} airline={flight.airline}
                                            originCity={flight.originCity}
                                            destinationCity={flight.destinationCity}
                                            selectedFlightsState={selectedFlightsState.some(f => f.flightId === flight.flightId)}
                                            handleSelectFlight={() => handleSelectFlight(flight)}/>
                            ))}
                        </div>

                        <div className="flex justify-center mt-6">
                            <SaveButton handleSave={handleSaveFlights} selectedItemState={selectedFlightsState}/>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-xl font-bold text-center text-gray-700">No flights for these dates</p>
                        <div className="flex justify-center mt-6">
                            <Button className="hover:bg-gray-700 bg-gray-800 text-white px-6 py-3 rounded"
                                    onClick={() => navigate('/hotels', {state: {cityId: location.state.destinationCityId}})}>Skip</Button>
                        </div>
                    </>
                )
                }
                <Footer/>
            </section>
        </main>
    );
};

export default Flights;
