import * as React from "react"
import {useParams} from "react-router-dom"
import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx"
import ImageSmallBlackBackground from "@/components/ImageSmallBlackBackground/imageSmallBlackBackground.tsx";
import Footer from "@/components/Footer/footer.tsx";
import Itinerary from "@/components/Itinerary/itinerary.tsx";
import {useGetTourById} from "@/features/tours/api/useTours.ts";

const Tour = () => {
    const {tourId} = useParams()
    const {data: tour} = useGetTourById(Number(tourId))

    const [selectedDay, setSelectedDay] = React.useState<number>(1)

    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8 p-8 mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800">{tour?.name}</h2>

                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
                    <Itinerary tour={tour!} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>

                    <img
                        src={tour?.imageUrl}
                        alt={`Image of ${tour?.name}`}
                        className="rounded-lg w-full h-64 object-cover flex-1"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Famous Hotels</h2>
                    <div className="flex flex-row gap-4 overflow-x-auto">
                        {tour?.hotels?.map((hotel, index) => (
                            <ImageSmallBlackBackground linkTo={`/hotels/${hotel.hotelId}`} index={index}
                                                       imageUrl={hotel.imageUrl} alt={`Image of ${hotel.name}`}
                                                       name={hotel.name}/>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Famous Restaurants</h2>
                    <div className="flex flex-row gap-4 overflow-x-auto">
                        {tour?.restaurants?.map((restaurant, index) => (
                            <ImageSmallBlackBackground index={index} imageUrl={restaurant.imageUrl}
                                                       alt={`Image of ${restaurant.name}`} name={restaurant.name}/>

                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Famous Attractions</h2>
                    <div className="flex flex-row gap-4 overflow-x-auto">
                        {tour?.attractions?.map((attraction, index) => (
                            <ImageSmallBlackBackground linkTo={`/hotels/${attraction.attractionId}`} index={index}
                                                       imageUrl={attraction.imageUrl}
                                                       alt={`Image of ${attraction.name}`} name={attraction.name}/>
                        ))}
                    </div>
                </div>

                <Footer/>
            </section>
        </main>
    )
}

export default Tour
