import * as React from "react";
import type {City} from "@/features/cities/city";
import TableCellViewer from "@/components/TableCellViewer/tableCellViewer.tsx";
import {Button} from "@/components/ui/button.tsx";
import InputComponent from "@/components/Input/input.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import type { Country } from "@/features/countries/country";
import {DrawerTrigger} from "@/components/ui/drawer.tsx";
import {EarthIcon, PlusIcon} from "lucide-react";
import { toast } from "sonner";
import { useGetAllCountries } from "@/features/countries/api/useCountry";
import {useCreateCity, useUpdateCity} from "@/features/cities/api/useCities.ts";

type CityModalProps = {
    mode: "create" | "edit";
    row?: City;
}

const CityAdminDetachedModal = ({mode, row}: CityModalProps) => {
    const {data: countries} = useGetAllCountries();
    const createCity = useCreateCity({
        onSuccess: () => {
            toast.success("City created successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
    const updateCity = useUpdateCity({
        onSuccess: () => {
            toast.success("City updated successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const [selectedCountry, setSelectedCountry] = React.useState<string>(
        row?.countryId ? String(row.countryId) : ""
    );
    const [name, setName] = React.useState<string>(row?.name ?? "");
    const [imageUrl, setImageUrl] = React.useState<string>(row?.imageUrl ?? "");

    const handleSubmit = () => {
        const data = {
            countryId: Number(selectedCountry),
            name,
            imageUrl,
        }

        if (mode === "edit" && row?.cityId) {
            updateCity.mutate({...data, cityId: row?.cityId})
        }

        if (mode === "create") {
            createCity.mutate(data);
            setSelectedCountry("");
            setName("");
            setImageUrl("");
        }
    }

    const handleChange = (value: string) => {
        setSelectedCountry(value);
    };

    const selectedCountryName = React.useMemo(() => {
        const selected = countries?.find((c) => c.countryId === Number(selectedCountry));
        return selected?.name ?? "";
    }, [selectedCountry, countries]);

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
                    <Select value={selectedCountry} onValueChange={handleChange}>
                        <SelectTrigger className="w-auto">
                            <div className={`flex gap-2 items-center text-sm font-medium font-[Figtree] ${selectedCountry ? 'text-gray-700' : 'text-muted-foreground'}`}>
                                <EarthIcon size="20" className={`${selectedCountry ? 'text-gray-700' : 'text-muted-foreground'}`}/>{" "}
                                {selectedCountry ? selectedCountryName : <SelectValue placeholder="Select a country" />}
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {countries?.map((country: Country) => (
                                    <SelectItem
                                        key={country.countryId}
                                        value={country.countryId.toString()}
                                        className="text-gray-800 ps-2 text-sm font-[Figtree]"
                                    >
                                        {country.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <InputComponent
                        htmlFor="imageUrl"
                        label="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />

                    <InputComponent
                        htmlFor="cityName"
                        label="City Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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

export default CityAdminDetachedModal;
