import SidebarNavigation from "@/components/SidebarNavigation/sidebarNavigation.tsx";
import {adminNavigation} from "@/utils/adminNavigation.ts";
import {SidebarInset, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import DataTable from "@/components/DataTable/dataTable.tsx";
import * as React from "react";

type AdminDataTableProps = {
    breadcrumbPage: string,
    columns: any,
    data: any,
    createButton: React.ReactNode,
}

const AdminDataTable = ({breadcrumbPage, columns, data, createButton}: AdminDataTableProps) => {
    return (
        <>
            <SidebarNavigation variant="inset" data={adminNavigation}/>
            <SidebarInset className="overflow-x-auto flex flex-col gap-2">
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-1"/>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/admin" className="text-sm font-medium font-[Figtree] text-gray-700">
                                    Admin
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbPage
                                    className="text-sm font-medium font-[Figtree] text-gray-800">{breadcrumbPage}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                {createButton}
                <div className="p-4 pt-0">
                    <DataTable columns={columns} data={data ?? []}/>
                </div>
            </SidebarInset>
        </>
    )
}

export default AdminDataTable
