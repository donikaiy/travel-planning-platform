import type {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import type {Attraction} from "@/features/attractions/attraction";
import AdminDataTable from "@/components/AdminDataTable/adminDataTable.tsx";
import * as React from "react";
import DeleteDialog from "@/components/DeleteDialog/deleteDialog.tsx";
import { toast } from "sonner";
import {useDeleteAttractionById, useGetAllAttractions} from "@/features/attractions/api/useAttractions";
import AttractionAdminDetachedModal
    from "@/features/attractions/components/AttractionAdminDetachedModal/attractionAdminDetachedModal.tsx";

const AdminAttractions = () => {
    const {data: attractions, isLoading} = useGetAllAttractions()
    const deleteMutation = useDeleteAttractionById({
        onSuccess: () => {
            toast.success("Attraction deleted successfully")
        },
        onError: () => {
            toast.error("Attraction deletion failed")
        }
    })

    const columns = React.useMemo<ColumnDef<Attraction>[]>(() => [
        {
            accessorKey: "attractionId",
            header: "Attraction ID",
        },
        {
            accessorKey: "cityId",
            header: "City ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "location",
            header: "Location",
        },
        {
            accessorKey: "imageUrl",
            header: "Image Url",
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({row}) => {
                const description = row.getValue("description") as string;
                return (
                    <div className="line-clamp-3 max-w-xl text-sm text-muted-foreground">
                        {description}
                    </div>
                )
            }
        },
        {
            accessorKey: "openingHours",
            header: "Opening Hours",
            cell: ({row}) => {
                const openingHours = row.getValue("openingHours") as string;
                return (
                    <div className="line-clamp-3 max-w-xl text-sm text-muted-foreground">
                        {openingHours}
                    </div>
                )
            }
        },
        {
            accessorKey: "bestTimeToVisit",
            header: "Best Time To Visit",
            cell: ({row}) => {
                const bestTimeToVisit = row.getValue("bestTimeToVisit") as string;
                return (
                    <div className="line-clamp-3 max-w-xl text-sm text-muted-foreground">
                        {bestTimeToVisit}
                    </div>
                )
            }
        },
        {
            accessorKey: "ticketsWebsite",
            header: "Ticket Website",
            cell: ({row}) => {
                const ticketsWebsite = row.getValue("ticketsWebsite") as string;
                return (
                    <div className="line-clamp-3 max-w-xl text-sm text-muted-foreground">
                        {ticketsWebsite}
                    </div>
                )
            }
        },
        {
            accessorKey: "additionalInformation",
            header: "Additional Information",
            cell: ({row}) => {
                const additionalInformation = row.getValue("additionalInformation") as string;
                return (
                    <div className="line-clamp-3 max-w-xl text-sm text-muted-foreground">
                        {additionalInformation}
                    </div>
                )
            }
        },
        {
            id: "actions",
            header: "",
            cell: ({row}) => (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2">
                            <MoreHorizontal className="h-4 w-4"/>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end"
                                         className="flex flex-col items-start text-sm font-medium font-[Figtree] text-gray-700 p-3 gap-3">
                        <AttractionAdminDetachedModal row={row.original} mode="edit"/>
                        <DeleteDialog buttonName="Delete" title="Delete attraction" description="This action cannot be undone. Are you sure you want to permanently
        delete this attraction from our servers?" id={row.original.attractionId} deleteMutation={deleteMutation}/>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            enableSorting: false,
            enableColumnFilter: false,
        }
    ], [deleteMutation])

    const memoizedData: Attraction[] | undefined = React.useMemo(() => attractions, [attractions]);

    if (isLoading) return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center text-2xl font-medium text-gray-800">
            Loading...
        </div>
    );

    return (
        <>
            <AdminDataTable breadcrumbPage="Attractions" columns={columns} data={memoizedData} createButton={
                <AttractionAdminDetachedModal mode="create" />
            }/>
        </>
    )
}

export default AdminAttractions;
