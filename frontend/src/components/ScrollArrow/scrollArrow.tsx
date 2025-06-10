import * as React from 'react'
import {ChevronDown} from "lucide-react";

const ScrollArrow = () => {
    const [isVisible, setIsVisible] = React.useState<boolean>(true)

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToNextSection = () => {
        const viewHeight = window.innerHeight

        window.scrollTo({
            top: viewHeight,
            behavior: 'smooth'
        })
    }

    return (
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"}`}>
            <button onClick={scrollToNextSection} className="flex items-center justify-center w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300 animate-bounce shadow-lg">
                <ChevronDown className="w-6 h-6 text-white" />
            </button>
        </div>
    )
}

export default ScrollArrow
