import type {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import type {RestaurantWithRating} from "@/features/restaurants/restaurant";
import AdminDataTable from "@/components/AdminDataTable/adminDataTable.tsx";
import React from "react";
import DeleteDialog from "@/components/DeleteDialog/deleteDialog.tsx";
import {toast} from "sonner";
import RestaurantAdminDetachedModal
    from "@/features/restaurants/components/RestaurantAdminDetachedModal/restaurantAdminDetachedModal.tsx";
import {useDeleteRestaurantById, useGetAllRestaurants} from "@/features/restaurants/api/useRestaurants.ts";

const AdminRestaurants = () => {
    const {data: restaurants, isLoading} = useGetAllRestaurants()
    const deleteMutation = useDeleteRestaurantById({
        onSuccess: () => {
            toast.success("Restaurant deleted successfully")
        },
        onError: () => {
            toast.error("Restaurant deletion failed")
        }
    })

    const columns = React.useMemo<ColumnDef<RestaurantWithRating>[]>(() => [
        {
            accessorKey: "restaurantId",
            header: "Restaurant ID",
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
            accessorKey: "priceSymbols",
            header: "Price Symbols",
        },
        {
            accessorKey: "rating",
            header: "Rating",
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
                        <RestaurantAdminDetachedModal row={row.original} mode="edit"/>
                        <DeleteDialog buttonName="Delete" title="Delete restaurant" description="This action cannot be undone. Are you sure you want to permanently
        delete this restaurant from our servers?" id={row.original.restaurantId} deleteMutation={deleteMutation}/>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            enableSorting: false,
            enableColumnFilter: false,
        }
    ], [deleteMutation])

    const memoizedData: RestaurantWithRating[] | undefined = React.useMemo(() => restaurants, [restaurants]);

    if (isLoading) return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center text-2xl font-medium text-gray-800">
            Loading...
        </div>
    );

    return (
        <AdminDataTable breadcrumbPage="Restaurants" columns={columns} data={memoizedData} createButton={
            <RestaurantAdminDetachedModal mode="create"/>
        }/>
    )
}

export default AdminRestaurants;
