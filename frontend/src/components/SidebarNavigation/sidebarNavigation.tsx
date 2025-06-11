import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar.tsx";

type NavItem = {
    title: string;
    url: string;
    isActive?: boolean;
}

type SidebarNavigationProps = React.ComponentProps<typeof Sidebar> & {
    data: {
        navMain: NavItem[];
    };
}

const SidebarNavigation = ({data, ...props}: SidebarNavigationProps) => {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <span className="text-lg font-medium text-gray-800">Lorrie</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {data.navMain.map((item: NavItem) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a
                                        href={item.url}
                                        className="text-md font-medium font-[Figtree] text-gray-800"
                                    >
                                        {item.title}
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default SidebarNavigation;
