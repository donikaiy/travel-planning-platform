import * as React from "react";
import {MapPlusIcon, PlusIcon} from "lucide-react";
import TableCellViewer from "@/components/TableCellViewer/tableCellViewer.tsx";
import TextareaComponent from "@/components/Textarea/textarea.tsx";
import InputComponent from "@/components/Input/input.tsx";
import {Button} from "@/components/ui/button";
import type {Attraction} from "../../attraction";
import {DrawerTrigger} from "@/components/ui/drawer.tsx";
import { toast } from "sonner";
import SelectCity from "@/features/cities/components/SelectCity/selectCity.tsx";
import {useGetAllCountriesWithCities} from "@/features/countries/api/useCountry.ts";
import {useCreateAttraction, useUpdateAttraction} from "@/features/attractions/api/useAttractions.ts";

type AttractionModalProps = {
    mode: "create" | "edit";
    row?: Attraction;
};

const AttractionAdminDetachedModal = ({mode, row}: AttractionModalProps) => {
    const {data: countries} = useGetAllCountriesWithCities();
    const createAttraction = useCreateAttraction({
        onSuccess: () => {
            toast.success("Attraction created successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const updateAttraction = useUpdateAttraction({
        onSuccess: () => {
            toast.success("Attraction updated successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const [city, setCity] = React.useState<string>(row?.cityId ? String(row.cityId) : "");
    const [name, setName] = React.useState<string>(row?.name ?? "");
    const [location, setLocation] = React.useState<string>(row?.location ?? "");
    const [imageUrl, setImageUrl] = React.useState<string>(row?.imageUrl ?? "");
    const [description, setDescription] = React.useState<string>(row?.description ?? "");
    const [openingHours, setOpeningHours] = React.useState<string>(row?.openingHours ?? "");
    const [bestTimeToVisit, setBestTimeToVisit] = React.useState<string>(row?.bestTimeToVisit ?? "");
    const [ticketsWebsite, setTicketsWebsite] = React.useState<string>(row?.ticketsWebsite ?? "");
    const [additionalInformation, setAdditionalInformation] = React.useState<string>(row?.additionalInformation ?? "");

    const handleSubmit = () => {
        const data = {
            cityId: Number(city),
            name,
            location,
            imageUrl,
            description,
            openingHours,
            bestTimeToVisit,
            ticketsWebsite,
            additionalInformation,
        };

        if (mode === "edit" && row?.attractionId) {
            updateAttraction.mutate({...data, attractionId: row?.attractionId})
        }

        if (mode === "create") {
            createAttraction.mutate(data);
            setCity("");
            setName("");
            setLocation("");
            setImageUrl("");
            setDescription("");
            setOpeningHours("");
            setBestTimeToVisit("");
            setTicketsWebsite("");
            setAdditionalInformation("");
        }
    };

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
                        htmlFor="attractionName"
                        label="Attraction Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextareaComponent
                        htmlFor="location"
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <TextareaComponent
                        htmlFor="description"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <TextareaComponent
                        htmlFor="openingHours"
                        label="Opening Hours"
                        value={openingHours}
                        onChange={(e) => setOpeningHours(e.target.value)}
                    />

                    <TextareaComponent
                        htmlFor="bestTimeToVisit"
                        label="Best Time To Visit"
                        value={bestTimeToVisit}
                        onChange={(e) => setBestTimeToVisit(e.target.value)}
                    />

                    <TextareaComponent
                        htmlFor="ticketsWebsite"
                        label="Tickets Website"
                        value={ticketsWebsite}
                        onChange={(e) => setTicketsWebsite(e.target.value)}
                    />

                    <TextareaComponent
                        htmlFor="additionalInformation"
                        label="Additional Information"
                        value={additionalInformation}
                        onChange={(e) => setAdditionalInformation(e.target.value)}
                    />
                </div>
            }
            footer={
                <Button onClick={handleSubmit} className="text-sm font-[Figtree] bg-gray-800 hover:bg-gray-700">
                    {mode === "edit" ? "Save Changes" : "Create"}
                </Button>
            }
        />
    );
};

export default AttractionAdminDetachedModal;
