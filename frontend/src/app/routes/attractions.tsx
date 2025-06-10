import * as React from "react";
import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx";
import Footer from "@/components/Footer/footer.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import SaveButton from "@/components/SaveButton/saveButton.tsx";
import { useTravelPlan } from "@/contexts/travelContext";
import {useGetAllAttractions} from "@/features/attractions/api/useAttractions.ts";
import type { Attraction } from "@/features/attractions/attraction";
import CardAttraction from "@/features/attractions/components/CardAttraction/cardAttraction.tsx";

const Attractions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {data: attractions} = useGetAllAttractions(location.state && {
        cityId: location.state.cityId,
    });

    const {setSelectedAttractions} = useTravelPlan();
    const [selectedAttractionsState, setSelectedAttractionsState] = React.useState<Attraction[]>([]);


    const handleSelectAttraction = (attraction: Attraction) => {
        const isSelected = selectedAttractionsState.some(selectedAttraction => selectedAttraction.attractionId == attraction.attractionId);

        if (isSelected) {
            setSelectedAttractionsState(prevState => prevState.filter(selectedAttraction => selectedAttraction.attractionId !== attraction.attractionId))
        } else {
            setSelectedAttractionsState(prevState => [...prevState, attraction])
        }
    }

    const handleSaveAttractions = () => {
        if (setSelectedAttractionsState.length > 0) {
            setSelectedAttractions(selectedAttractionsState)
        }

        navigate('/travel-plan', {state: {cityId: location.state.cityId}})
    }

    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8 p-8 mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800">Attractions</h2>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {attractions?.map((attraction) => (
                        <CardAttraction attractionId={attraction.attractionId} cityId={attraction.cityId}
                                        name={attraction.name} location={attraction.location}
                                        imageUrl={attraction.imageUrl} description={attraction.description}
                                        openingHours={attraction.openingHours}
                                        bestTimeToVisit={attraction.bestTimeToVisit}
                                        ticketsWebsite={attraction.ticketsWebsite}
                                        additionalInformation={attraction.additionalInformation}
                                        handleSelectAttraction={() => handleSelectAttraction(attraction)}
                                        selectedAttractionState={selectedAttractionsState.some(a => a.attractionId === attraction.attractionId)}/>
                    ))}
                </div>

                <div className="flex justify-center mt-6">
                    <SaveButton handleSave={handleSaveAttractions} selectedItemState={selectedAttractionsState}/>
                </div>

                <Footer/>
            </section>
        </main>
    );
};

export default Attractions;
