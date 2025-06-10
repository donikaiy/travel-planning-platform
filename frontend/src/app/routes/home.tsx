import Navigation from "@/components/NavigationMenu/navigationMenu.tsx";
import ListCheckIcon from "@/components/ListCheckIcon/listCheckIcon.tsx";
import Timeline from "@/components/Timeline/timeline.tsx";
import Itinerary from "@/components/Itinerary/itinerary.tsx";
import {TourData} from "@/utils/tourData.ts";
import * as React from "react";
import Footer from "@/components/Footer/footer.tsx";
import {useGetAllCountriesWithCities} from "@/features/countries/api/useCountry.ts";
import SearchSection from "@/features/cities/components/SearchSection/searchSection";


const Home = () => {
    const {data: countries} = useGetAllCountriesWithCities();

    const [selectedDay, setSelectedDay] = React.useState<number>(1)

    return (
        <div>
            <section className="relative">
                <img
                    src="src/assets/landscape.jpg"
                    alt="landscape"
                    className="relative h-screen w-full hidden lg:block object-cover"
                />
                <img
                    src="src/assets/mobileImage.jpg"
                    alt="landscape"
                    className="relative w-full lg:hidden object-cover brightness-75"
                />

                <Navigation/>

                <div
                    className="absolute inset-0 flex flex-col gap-8 lg:flex-row justify-center lg:justify-around items-center px-4">
                    <div className="flex flex-col gap-6 text-white text-center max-w-2xl">
                        <p className="text-2xl lg:text-6xl">Plan Your Perfect Trip Effortlessly</p>
                        <p className="text-md font-[Figtree] font-medium">
                            Welcome to your ultimate trip planning companion! We simplify your travel experience by
                            providing all the essential information you need, from flights to attractions.
                        </p>
                    </div>

                    <div className="w-full max-w-xl">
                        <SearchSection countries={countries}/>
                    </div>
                </div>
            </section>

            <div className="flex flex-col gap-8 lg:gap-16 p-8 lg:px-16">
                <section className="flex flex-col lg:flex-row lg:items-center gap-8">
                    <div className="flex flex-col gap-2 lg:w-1/2">
                        <h3 className="text-gray-800">We Make Travel Easy</h3>
                        <h2 className="text-[28px] lg:text-[36px] font-semibold text-gray-800">About Us</h2>
                        <p className="text-md font-medium font-[Figtree] text-gray-700">
                            Planning your perfect trip has never been easier! Our platform provides all the essential
                            information you need in one place. Simply enter your destination and travel dates, and we'll
                            generate a complete list of available flights, hotels, must-visit attractions, and top-rated
                            restaurants. Compare options, explore details, and make informed choices—all without the
                            hassle
                            of searching multiple websites.
                        </p>
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-center lg:w-1/2">
                        <img
                            src="src/assets/beach.png"
                            alt="Image of beach"
                            className="max-w-[80px] md:max-w-[100px] lg:max-w-[140px] aspect-[3/5] object-cover rounded-lg transition-all duration-300"
                        />
                        <img
                            src="src/assets/desert.png"
                            alt="Image of desert"
                            className="max-w-[120px] md:max-w-[140px] lg:max-w-[180px] aspect-[2/3] object-cover rounded-lg transition-all duration-300"
                        />
                        <img
                            src="src/assets/mountain.png"
                            alt="Image of mountain"
                            className="max-w-[80px] md:max-w-[100px] lg:max-w-[140px] aspect-[3/5] object-cover rounded-lg transition-all duration-300"
                        />
                    </div>
                </section>

                <section className="flex flex-col lg:flex-row lg:items-center gap-8">
                    <div className="lg:w-1/2 flex justify-center">
                        <img
                            src="src/assets/landmarks.png"
                            alt="Image of landmarks"
                            className=" transition-all duration-300"
                        />
                    </div>
                    <div className="flex flex-col gap-2 lg:w-1/2">
                        <h3 className="text-gray-800">Your Ultimate Travel Guide</h3>
                        <h2 className="text-[28px] lg:text-[36px] font-semibold text-gray-800">Why Choose Us</h2>
                        <ListCheckIcon text="Comprehensive Trip Insights"
                                       info="Enter your destination and travel dates, and instantly get essential details on flights, hotels, attractions, dining, and more—all in one place."/>
                        <ListCheckIcon text="All the Essentials, Instantly"
                                       info="Get a full breakdown of travel options, including where to stay, what to see, and where to eat—no need for endless research."/>
                        <ListCheckIcon text="Hassle-Free Planning"
                                       info="Skip the guesswork—find the best times to visit attractions, where to buy tickets, and how to make the most of your trip effortlessly."/>
                    </div>
                </section>

                <section className="flex flex-col gap-8 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-1/2">
                        <h2 className="text-[28px] lg:text-[36px] text-center lg:text-left font-semibold text-gray-800"> Your
                            Ultimate Travel Guide</h2>
                        <p className="text-md font-medium font-[Figtree] text-gray-700 max-w-150">Using
                            our intuitive platform is simple—just enter your travel details, and instantly access
                            everything
                            you need for your trip.</p>
                    </div>
                    <div >
                        <Timeline/>
                    </div>
                </section>

                <section className="flex flex-col gap-4 items-center">
                    <h2 className="text-[28px] lg:text-[36px] text-center lg:text-left font-semibold text-gray-800">{TourData.name}</h2>
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
                        <Itinerary tour={TourData} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
                        <img
                            src={TourData.imageUrl}
                            alt={`Image of ${TourData.name}`}
                            className="rounded-lg w-full h-64 object-cover flex-1"
                        />
                    </div>
                </section>

                <Footer/>
            </div>
        </div>
    );
};

export default Home;
