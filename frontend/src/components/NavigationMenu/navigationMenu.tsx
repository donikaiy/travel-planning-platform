import { AlignJustify } from 'lucide-react'
import { Link } from "react-router-dom"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"

const Navigation = () => {
    const menuItems = [
        { label: "Plan a Trip", href: "/" },
        { label: "Destinations", href: "/destinations" },
        { label: "Tours", href: "/tours" },
        { label: "Travel Guide", href: "/travel-guide" },
    ]

    const leftMenuItems = menuItems.slice(0, 2)
    const rightMenuItems = menuItems.slice(2)

    return (
        <div className="absolute top-0 w-full z-10">
            <div className="container mx-auto px-4 py-4">

                {/* Desktop Navigation */}
                <div className="hidden lg:flex justify-center items-center gap-12">
                    {/* Left Nav */}
                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-8">
                            {leftMenuItems.map((item) => (
                                <NavigationMenuItem key={item.label}>
                                    <Link
                                        to={item.href}
                                        className="text-md font-medium font-[Figtree] text-white hover:text-white/80 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Centered Logo */}
                    <Link to="/" className="text-3xl font-bold text-white italic">
                        Lorrie
                    </Link>

                    {/* Right Nav */}
                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-8">
                            {rightMenuItems.map((item) => (
                                <NavigationMenuItem key={item.label}>
                                    <Link
                                        to={item.href}
                                        className="text-md font-medium font-[Figtree] text-white hover:text-white/80 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Mobile Navigation */}
                <div className="flex justify-between items-center lg:hidden">
                    {/* Mobile Logo */}
                    <Link to="/" className="text-2xl font-bold text-white italic">
                        Lorrie
                    </Link>

                    {/* Mobile Menu */}
                    <Menubar className="border-none bg-transparent">
                        <MenubarMenu>
                            <MenubarTrigger className="cursor-pointer p-2 text-white hover:bg-white/10 data-[state=open]:bg-white/10">
                                <AlignJustify className="h-5 w-5" />
                            </MenubarTrigger>
                            <MenubarContent align="end" className="w-[200px]">
                                {menuItems.map((item, index) => (
                                    <div key={item.label}>
                                        <Link to={item.href}>
                                            <MenubarItem className="text-sm font-medium font-[Figtree] cursor-pointer">
                                                {item.label}
                                            </MenubarItem>
                                        </Link>
                                        {index < menuItems.length - 1 && <MenubarSeparator />}
                                    </div>
                                ))}
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>
        </div>
    )
}

export default Navigation
