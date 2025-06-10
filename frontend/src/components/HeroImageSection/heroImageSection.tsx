import Navigation from "@/components/NavigationMenu/navigationMenu.tsx";
import beach_landscape from '@/assets/beach_landscape.png'
import mobile_image from '@/assets/mobileImage.jpg'
import ScrollArrow from "@/components/ScrollArrow/scrollArrow.tsx";

const HeroImageSection = () => {
    return (
        <>
            <img
                src={beach_landscape}
                alt="Beach"
                className="relative w-full h-screen hidden lg:block object-cover"
            />
            <img src={mobile_image} alt="Landscape"
                 className="relative w-full h-screen object-cover lg:hidden brightness-75"/>
            <Navigation/>
            <ScrollArrow/>
        </>
    )
}

export default HeroImageSection
