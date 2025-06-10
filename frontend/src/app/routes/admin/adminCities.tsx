import type {ColumnDef} from "@tanstack/react-table";
import React from "react";
import type {City} from "@/features/cities/city";
import {MoreHorizontal} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import AdminDataTable from "@/components/AdminDataTable/adminDataTable.tsx";
import DeleteDialog from "@/components/DeleteDialog/deleteDialog.tsx";
import { toast } from "sonner";
import CityAdminDetachedModal from "@/features/cities/components/CityAdminDetachedModal/cityAdminDetachedModal.tsx";
import {useDeleteCityById, useGetAllCities} from "@/features/cities/api/useCities";

const AdminCities = () => {
    const {data: cities, isLoading} = useGetAllCities()
    const deleteMutation = useDeleteCityById({
        onSuccess: () => {
            toast.success("City deleted successfully")
        },
        onError: () => {
            toast.error("City deletion failed")
        }
    });

    const columns = React.useMemo<ColumnDef<City>[]>(() => [
        {
            accessorKey: "cityId",
            header: "City ID",
        },
        {
            accessorKey: "countryId",
            header: "Country ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "imageUrl",
            header: "Image Url",
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
                        <CityAdminDetachedModal row={row.original} mode="edit" />
                        <DeleteDialog buttonName="Delete" title="Delete city" description="This action cannot be undone. Are you sure you want to permanently
        delete this city from our servers?" id={row.original.cityId} deleteMutation={deleteMutation}/>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            enableSorting: false,
            enableColumnFilter: false,
        },
    ], [deleteMutation])

    const memoizedData: City[] | undefined = React.useMemo(() => cities, [cities]);

    if (isLoading) return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center text-2xl font-medium text-gray-800">
            Loading...
        </div>
    );

    return (
        <AdminDataTable breadcrumbPage="Cities" columns={columns} data={memoizedData} createButton={
            <CityAdminDetachedModal mode="create" />
        }/>
    )
}

export default AdminCities
