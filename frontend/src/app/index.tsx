import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./routes/home.tsx"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Country from "@/app/routes/country.tsx";
import Flights from "./routes/flights.tsx";
import Destinations from "./routes/destinations.tsx";
import Hotels from "@/app/routes/hotels.tsx";
import Hotel from "@/app/routes/hotel.tsx";
import Restaurants from "@/app/routes/restaurants.tsx";
import Attractions from "./routes/attractions.tsx";
import Attraction from "@/app/routes/attraction.tsx";
import Tours from "./routes/tours.tsx";
import Tour from "@/app/routes/tour.tsx";
import TravelGuide from "./routes/travelGuide.tsx";
import TravelPlan from "@/app/routes/travelPlan.tsx";
import {TravelProvider} from "@/contexts/travelContext.tsx";
import * as React from "react";
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import AdminAttractions from "@/app/routes/admin/adminAttractions.tsx";
import AdminCities from "./routes/admin/adminCities.tsx";

const Index = () => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <TravelProvider>
                <SidebarProvider style={
                    {
                        "--sidebar-width": "15rem",
                        "overflow": "hidden"
                    } as React.CSSProperties
                }>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/destinations/:countryId" element={<Country/>}/>
                            <Route path="/flights" element={<Flights/>}/>
                            <Route path="/destinations" element={<Destinations/>}/>
                            <Route path="/hotels" element={<Hotels/>}/>
                            <Route path="/hotels/:hotelId" element={<Hotel/>}/>
                            <Route path="/restaurants" element={<Restaurants/>}/>
                            <Route path="/attractions" element={<Attractions/>}/>
                            <Route path="/attractions/:attractionId" element={<Attraction/>}/>
                            <Route path="/tours" element={<Tours/>}/>
                            <Route path="/tours/:tourId" element={<Tour/>}/>
                            <Route path="/travel-guide" element={<TravelGuide/>}/>
                            <Route path="/travel-plan" element={<TravelPlan/>}/>
                            <Route path="/admin">
                                <Route index element={<AdminCities/>}/>
                                <Route path="cities" element={<AdminCities/>}/>
                                <Route path="attractions" element={<AdminAttractions/>}/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </SidebarProvider>
            </TravelProvider>
        </QueryClientProvider>

    )
}

export default Index
