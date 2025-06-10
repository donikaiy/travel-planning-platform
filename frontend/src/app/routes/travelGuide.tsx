import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx";
import {travelTips} from "@/utils/travelGuide.ts";
import {Circle} from "lucide-react";
import Footer from "@/components/Footer/footer.tsx";

const TravelGuide = () => {
    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8 p-8 mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800">Travel Guide</h2>

                <div className="flex flex-col gap-4">
                    {travelTips.map((tip) => (
                        <div key={tip.id} className="flex flex-col gap-2">
                            <h2 className="text-xl font-semibold text-gray-700">
                                {tip.id}. {tip.title}
                            </h2>
                            <ul className="flex flex-col gap-1 pl-4">
                                {tip.tips.map((item, index) => (
                                    <li key={index}
                                        className="flex flex-row  items-center gap-2 text-md font-medium font-[Figtree] text-gray-600">
                                        <Circle size={8}/>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Footer/>
            </section>
        </main>
    )
}

export default TravelGuide
