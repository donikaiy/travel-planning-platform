import type {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import type {Flight} from "@/features/flights/flight";
import AdminDataTable from "@/components/AdminDataTable/adminDataTable.tsx";
import DeleteDialog from "@/components/DeleteDialog/deleteDialog.tsx";
import React from "react";
import { toast } from "sonner";
import FlightAdminDetachedModal
    from "@/features/flights/components/FlightAdminDetachedModal/flightAdminDetachedModal.tsx";
import {useDeleteFlightById, useGetAllFlights} from "@/features/flights/api/useFlights.ts";

const AdminFlights = () => {
    const {data: flights, isLoading} = useGetAllFlights()
    const deleteMutation = useDeleteFlightById({
        onSuccess: () => {
            toast.success("Flight deleted successfully")
        },
        onError: () => {
            toast.error("Flight deletion failed")
        }
    })

    const columns = React.useMemo<ColumnDef<Flight>[]>(() => [
        {
            accessorKey: "flightId",
            header: "Flight ID",
        },
        {
            accessorKey: "originCityId",
            header: "Origin City ID",
        },
        {
            accessorKey: "originCity",
            header: "Origin City",
        },
        {
            accessorKey: "destinationCityId",
            header: "Destination City ID",
        },
        {
            accessorKey: "destinationCity",
            header: "Destination City",
        },
        {
            accessorKey: "departAt",
            header: "Depart At",
        },
        {
            accessorKey: "arriveAt",
            header: "Arrive At",
        },
        {
            accessorKey: "numberOfStops",
            header: "Number Of Stops",
        },
        {
            accessorKey: "price",
            header: "Price",
        },
        {
            accessorKey: "imageUrl",
            header: "Image URL",
        },
        {
            accessorKey: "airline",
            header: "Airline",
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
                        <FlightAdminDetachedModal row={row.original} mode="edit"/>
                        <DeleteDialog buttonName="Delete" title="Delete flight" description="This action cannot be undone. Are you sure you want to permanently
        delete this flight from our servers?" id={row.original.flightId} deleteMutation={deleteMutation}/>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            enableSorting: false,
            enableColumnFilter: false,
        }
    ], [deleteMutation])

    const memoizedData: Flight[] | undefined = React.useMemo(() => flights, [flights]);

    if (isLoading) return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center text-2xl font-medium text-gray-800">
            Loading...
        </div>
    );

    return (
        <AdminDataTable breadcrumbPage="Flights" columns={columns} data={memoizedData} createButton={
            <FlightAdminDetachedModal mode="create" />
        }/>
    )
}

export default AdminFlights
