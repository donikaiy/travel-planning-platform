import React from "react"
import {useIsMobile} from "@/hooks/use-mobile.ts";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

type TableCellViewerProps = {
    triggerButton: React.ReactNode,
    title: string;
    description?: string;
    content: React.ReactNode;
    footer?: React.ReactNode;
}

const TableCellViewer = ({triggerButton, title, description, content, footer}: TableCellViewerProps) => {
    const isMobile = useIsMobile();

    return (
        <Drawer direction={isMobile ? "bottom" : "right"}>
            {triggerButton}
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <DrawerTitle
                        className="text-center text-2xl font-medium font-[Figtree] text-gray-800">{title}</DrawerTitle>
                    <DrawerDescription>
                        {description}
                    </DrawerDescription>
                </DrawerHeader>

                {content}

                <DrawerFooter>
                    <DrawerClose asChild>
                        {footer}
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default TableCellViewer
