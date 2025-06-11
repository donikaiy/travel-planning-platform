import type {RestaurantWithRating} from "@/features/restaurants/restaurant";
import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {MapPlusIcon, PlusIcon} from "lucide-react";
import InputComponent from "@/components/Input/input.tsx";
import TextareaComponent from "@/components/Textarea/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {DrawerTrigger} from "@/components/ui/drawer.tsx";
import { toast } from "sonner";
import {useGetAllCountriesWithCities} from "@/features/countries/api/useCountry.ts";
import {useCreateRestaurant, useUpdateRestaurant} from "../../api/useRestaurants";
import TableCellViewer from "@/components/TableCellViewer/tableCellViewer";
import SelectCity from "@/features/cities/components/SelectCity/selectCity";

type RestaurantModalProps = {
    mode: "create" | "edit";
    row?: RestaurantWithRating;
};

const RestaurantAdminDetachedModal = ({mode, row}: RestaurantModalProps) => {
    const {data: countries} = useGetAllCountriesWithCities();
    const createRestaurant = useCreateRestaurant({
        onSuccess: () => {
            toast.success("Restaurant created successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
    const updateRestaurant = useUpdateRestaurant({
        onSuccess: () => {
            toast.success("Restaurant updated successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const [city, setCity] = React.useState<string>(row?.cityId ? String(row.cityId) : "");
    const [name, setName] = React.useState<string>(row?.name ?? "");
    const [location, setLocation] = React.useState<string>(row?.location ?? "");
    const [imageUrl, setImageUrl] = React.useState<string>(row?.imageUrl ?? "");
    const [priceSymbols, setPriceSymbols] = React.useState<string>(row?.priceSymbols ?? "");

    const handleSubmit = () => {
        const data = {
            cityId: Number(city),
            name,
            location,
            imageUrl,
            priceSymbols,
        };

        if (mode === "edit" && row?.restaurantId) {
            updateRestaurant.mutate({...data, restaurantId: row?.restaurantId})
        }

        if (mode === "create") {
            createRestaurant.mutate(data);
            setCity("");
            setName("");
            setLocation("");
            setImageUrl("");
            setPriceSymbols("");
        }
    }

    return (
        <TableCellViewer
            title={mode === "edit" ? "Edit" : "Create"}
            triggerButton={
                mode === "edit" ? (
                    <DrawerTrigger className="w-full font-medium font-[Figtree] text-gray-800 text-left">
                        Edit
                    </DrawerTrigger>
                ) : (
                    <DrawerTrigger className="self-end mr-4 w-[100px]">
                        <Button variant="outline"
                                className="text-sm font-medium font-[Figtree] text-gray-800"><PlusIcon/>Create</Button>
                    </DrawerTrigger>
                )
            }
            content={
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    <SelectCity
                        icon={<MapPlusIcon size="20"/>}
                        placeholder="City"
                        countries={countries}
                        selectedCity={city}
                        setSelectedCity={setCity}
                    />

                    <InputComponent
                        htmlFor="imageUrl"
                        label="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />

                    <InputComponent
                        htmlFor="restaurantName"
                        label="Restaurant Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextareaComponent
                        htmlFor="location"
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <Select onValueChange={(value: string) => setPriceSymbols(value)} value={priceSymbols}>
                        <SelectTrigger className="w-auto ttext-sm font-medium font-[Figtree] text-gray-700">
                            <SelectValue placeholder="Select a price symbol"/>
                        </SelectTrigger>
                        <SelectContent className="text-sm text-gray-700 font-[Figtree] font-medium">
                            <SelectItem value="$">$</SelectItem>
                            <SelectItem value="$$">$$</SelectItem>
                            <SelectItem value="$$$">$$$</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            }
            footer={
                <Button onClick={handleSubmit} className="text-sm font-[Figtree] bg-gray-800 hover:bg-gray-700">
                    {mode === "edit" ? "Save Changes" : "Create"}
                </Button>
            }
        />
    )
}

export default RestaurantAdminDetachedModal;
