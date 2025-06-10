import { useGetCountryById } from "@/features/countries/api/useCountry";
import {useParams} from "react-router-dom";
import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx";
import GalleryPrimaryMultiVertical from "@/components/GalleryPrimaryMultiVertical/galleryPrimaryMultiVertical";
import TitleTextSection from "@/components/TitleTextSection/titleTextSection.tsx";
import ImageSmallBlackBackground from "@/components/ImageSmallBlackBackground/imageSmallBlackBackground";
import ListCheckIcon from "@/components/ListCheckIcon/listCheckIcon.tsx";
import Footer from "@/components/Footer/footer";

const Country = () => {
    const {countryId} = useParams();
    const {data: country} = useGetCountryById(Number(countryId))

    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8 p-8 mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800">{country?.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px]">
                    {country?.gallery.map((gallery, index) => (
                        <GalleryPrimaryMultiVertical index={index} imageUrl={gallery.imageUrl}/>
                    ))}
                </div>

                <TitleTextSection title="History" text={country?.history}/>

                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold text-gray-700">Cuisine</h2>
                    <ul className="space-y-3">
                        {country?.cuisines.map(cuisine => (
                            <ListCheckIcon key={cuisine.cuisineId} text={cuisine.text} />
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold text-gray-700">Famous Cities
                        in {country?.name}</h2>
                    <div className="flex flex-row gap-4 overflow-x-auto">
                        {country?.cities.map((city) => (
                            <ImageSmallBlackBackground index={city.cityId} imageUrl={city.imageUrl}
                                                       alt={`Image of ${city.name}`} name={city.name}/>
                        ))}
                    </div>
                </div>

                <Footer/>
            </section>
        </main>
    )
}

export default Country
