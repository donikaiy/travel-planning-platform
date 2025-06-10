import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx";
import {Camera, Check, Sun} from "lucide-react";
import Footer from "@/components/Footer/footer.tsx";
import {CardLink} from "@/components/Card/card.tsx";
import {useGetAllTours} from "@/features/tours/api/useTours.ts";

const Tours = () => {
    const {data: tours} = useGetAllTours();

    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8 p-8 mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800">Tours</h2>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {tours?.map((tour) => (
                        <CardLink linkTo={`/tours/${tour.tourId}`} key={tour.tourId} imageUrl={tour.imageUrl}
                                  alt={`Image of ${tour.name}`} rating={tour.rating} content={
                            <div className="flex flex-col gap-4">
                                <h2 className="text-lg font-['Agbalumo'] font-semibold text-gray-800 truncate">{tour.name}</h2>
                                <div className="flex flex-row items-center gap-2">
                                    <Sun size={16} className="text-gray-600"/>
                                    <p className="text-sm font-medium font-[Figtree] text-gray-600">{tour.daysNights}</p>
                                </div>
                                <div className="flex flex-row items-start gap-2">
                                    <Camera size={24} className="text-gray-600"/>
                                    <p className="text-sm font-medium font-[Figtree] text-gray-600">{tour.description}</p>
                                </div>
                                <div className="flex flex-row items-start gap-2">
                                    <Check size={16} className="text-gray-600"/>
                                    <p className="text-sm font-medium font-[Figtree] text-gray-600">{tour.highlights}</p>
                                </div>
                            </div>
                        }/>
                    ))}
                </div>

                <Footer/>
            </section>
        </main>
    )
}

export default Tours
