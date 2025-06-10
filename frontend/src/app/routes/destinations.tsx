import HeroImageSection from "@/components/HeroImageSection/heroImageSection.tsx";
import {Link} from "react-router-dom";
import Footer from "@/components/Footer/footer.tsx";
import {useGetAllContinents} from "@/features/continents/api/useContinent.ts";

const Destinations = () => {
    const {data: continents} = useGetAllContinents()

    return (
        <main className="min-h-screen">
            <HeroImageSection/>

            <section className="flex flex-col gap-8 p-8 mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800">Destinations</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                    {continents?.map(continent => (
                        <div>
                            <div className="relative rounded-lg shadow-lg overflow-hidden h-[120px]"
                                 key={continent.continentId}>
                                <img src={continent.imageUrl} alt={continent.name}
                                     className="w-full h-full object-cover object-center"/>
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <h2 className="text-white text-2xl font-bold italic">{continent.name}</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-2">
                                {continent.countries.map(country => (
                                    <Link
                                        key={country.countryId}
                                        to={`/destinations/${country.countryId}`}
                                        className="font-medium font-['Figtree'] text-gray-700 hover:text-gray-600 transition-colors text-center sm:text-left"
                                        aria-label={`Visit ${country.name} in ${continent.name}`}
                                    >
                                        {country.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <Footer />
            </section>
        </main>
    )
}

export default Destinations
