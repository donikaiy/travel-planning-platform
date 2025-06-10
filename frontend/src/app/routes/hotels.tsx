import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx";
import Footer from "@/components/Footer/footer.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import * as React from "react";
import SaveButton from "@/components/SaveButton/saveButton.tsx";
import {useTravelPlan} from "@/contexts/travelContext.tsx";
import {useGetHotels} from "@/features/hotels/api/useHotels.ts";
import type {Hotel} from "@/features/hotels/hotel";
import CardHotel from "@/features/hotels/components/CardHotel/cardHotel.tsx";

const Hotels = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {data: hotels} = useGetHotels(location.state && {
        cityId: location.state.cityId
    });

    const {setSelectedHotels} = useTravelPlan();
    const [selectedHotelsState, setSelectedHotelsState] = React.useState<Hotel[]>([]);


    const handleSelectHotel = (hotel: Hotel) => {
        const isSelected = selectedHotelsState.some(selectedHotel => selectedHotel.hotelId == hotel.hotelId);

        if (isSelected) {
            setSelectedHotelsState(prevState => prevState.filter(selectedHotel => selectedHotel.hotelId !== hotel.hotelId))
        } else {
            setSelectedHotelsState(prevState => [...prevState, hotel])
        }
    }

    const handleSaveHotels = () => {
        if (setSelectedHotelsState.length > 0) {
            setSelectedHotels(selectedHotelsState)
        }

        navigate('/restaurants', {state: {cityId: location.state.cityId}})
    }

    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8 p-8 mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800">Hotels</h2>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {hotels?.map((hotel) => (
                        <CardHotel hotelId={hotel.hotelId} galleryId={hotel.galleryId} cityId={hotel.cityId}
                                   name={hotel.name} location={hotel.location} about={hotel.about} price={hotel.price}
                                   preferredGalleryEntryId={hotel.preferredGalleryEntryId} imageUrl={hotel.imageUrl}
                                   rating={hotel.rating} handleSelectHotel={() => handleSelectHotel(hotel)}
                                   selectedHotelsState={selectedHotelsState.some(h => h.hotelId === hotel.hotelId)}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-6">
                    <SaveButton handleSave={handleSaveHotels} selectedItemState={selectedHotelsState}/>
                </div>

                <Footer/>
            </section>
        </main>
    )
}

export default Hotels
