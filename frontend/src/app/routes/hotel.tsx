import {useParams} from "react-router-dom";
import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx";
import GalleryPrimaryMultiHorizontal
    from "@/components/GalleryPrimaryMultiHorizontal/galleryPrimaryMultiHorizontal.tsx";
import NameAddressSection from "@/components/NameAddressSection/nameAddressSection.tsx";
import TitleTextSection from "@/components/TitleTextSection/titleTextSection.tsx";
import ImageBlackBackground from "@/components/ImageBlackBackground/imageBlackBackground.tsx";
import Footer from "@/components/Footer/footer.tsx";
import ListCheckIcon from "@/components/ListCheckIcon/listCheckIcon.tsx";
import ImageSmallBlackBackground from "@/components/ImageSmallBlackBackground/imageSmallBlackBackground.tsx";
import {useGetHotelById} from "@/features/hotels/api/useHotels.ts";

const Hotel = () => {
    const {hotelId} = useParams();
    const {data: hotel} = useGetHotelById(Number(hotelId));

    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8">
                <div className="flex flex-col gap-8 p-8 pb-0 mx-auto">
                    <NameAddressSection name={hotel?.name} location={hotel?.location}/>

                    <div className="flex flex-col xl:flex-row gap-8 items-center">
                        <GalleryPrimaryMultiHorizontal data={hotel}/>

                        <div className="flex flex-col gap-8 flex-1">
                            <TitleTextSection title="About" text={hotel?.about}/>

                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-semibold text-gray-700">Hotel Amenities & Services</h3>
                                <ul className="space-y-3">
                                    {hotel?.services.map((service) => (
                                        <ListCheckIcon key={service.hotelServiceId} text={service.text}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 pl-8">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-semibold text-gray-700">Rooms</h2>
                        <div className="flex flex-row gap-4 overflow-x-auto no-scrollbar">
                            {hotel?.rooms.map((room) => (
                                <ImageBlackBackground key={room.roomId} imageUrl={room.imageUrl}
                                                      alt={`Image of ${room.name}`} text={room.name}/>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-semibold text-gray-700">Nearby Attractions</h2>
                        <div className="flex flex-row gap-4 overflow-x-auto">
                            {hotel?.nearbyAttractions.map((attraction) => (
                                <ImageSmallBlackBackground index={attraction.attractionId}
                                                           imageUrl={attraction.imageUrl}
                                                           alt={`Image of ${attraction.name}`} name={attraction.name}
                                                           linkTo={`/attractions/${attraction.attractionId}`}/>
                            ))}
                        </div>
                    </div>
                </div>

                <Footer/>
            </section>
        </main>
    );
};

export default Hotel;
