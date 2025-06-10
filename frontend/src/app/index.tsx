import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./routes/home.tsx"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const Index = () => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>

    )
}

export default Index
