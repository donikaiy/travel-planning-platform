import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./routes/home.tsx"

const Index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default Index
