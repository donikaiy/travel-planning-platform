import {useParams} from "react-router-dom";
import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx";
import TitleTextSection from "@/components/TitleTextSection/titleTextSection.tsx";
import Footer from "@/components/Footer/footer.tsx";
import NameAddressSection from "@/components/NameAddressSection/nameAddressSection.tsx";
import {useGetAttractionById} from "@/features/attractions/api/useAttractions.ts";

const Attraction = () => {
    const {attractionId} = useParams();
    const {data: attraction} = useGetAttractionById(Number(attractionId));

    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8 p-8 mx-auto">
                <NameAddressSection name={attraction?.name} location={attraction?.location}/>

                <div className="flex flex-col xl:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <img
                            src={attraction?.imageUrl}
                            alt={attraction?.name}
                            className="object-cover w-full h-64 md:h-80 xl:h-96 rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col flex-1 gap-8">
                        <TitleTextSection title="About" text={attraction?.description}/>
                        <TitleTextSection title="Operating hours" text={attraction?.openingHours}/>
                        <TitleTextSection title="Best time to visit" text={attraction?.bestTimeToVisit}/>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <TitleTextSection title="Official Website" text="For more information you can check the official
                            website - " link={attraction?.ticketsWebsite}/>
                    <TitleTextSection title="Additional information" text={attraction?.additionalInformation}/>
                </div>

                <Footer/>
            </section>
        </main>
    );
};

export default Attraction;
