import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./routes/home.tsx"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Country from "@/app/routes/country.tsx";
import Flights from "./routes/flights.tsx";
import Destinations from "./routes/destinations.tsx";
import Hotels from "@/app/routes/hotels.tsx";
import Hotel from "@/app/routes/hotel.tsx";

const Index = () => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/destinations/:countryId" element={<Country/>}/>
                    <Route path="/flights" element={<Flights/>}/>
                    <Route path="/destinations" element={<Destinations/>}/>
                    <Route path="/hotels" element={<Hotels/>}/>
                    <Route path="/hotels/:hotelId" element={<Hotel/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>

    )
}

export default Index
