import type {Flight} from "@/features/flights/flight";
import * as React from "react";
import TableCellViewer from "@/components/TableCellViewer/tableCellViewer.tsx";
import {MapPlusIcon, PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import InputComponent from "@/components/Input/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DrawerTrigger} from "@/components/ui/drawer.tsx";
import DateTimePicker from "@/components/DateTimePicker/dateTimePicker.tsx";
import {toast} from "sonner";
import { useGetAllCountriesWithCities } from "@/features/countries/api/useCountry";
import {useCreateFlight, useUpdateFlight} from "@/features/flights/api/useFlights.ts";
import SelectCity from "@/features/cities/components/SelectCity/selectCity.tsx";

type FlightModalProps = {
    mode: "create" | "edit";
    row?: Flight;
};

const FlightAdminDetachedModal = ({mode, row}: FlightModalProps) => {
    const {data: countries} = useGetAllCountriesWithCities();
    const createFlight = useCreateFlight({
        onSuccess: () => {
            toast.success("Flight created successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
    const updateFlight = useUpdateFlight({
        onSuccess: () => {
            toast.success("Flight updated successfully!");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const [originCity, setOriginCity] = React.useState<string>(row?.originCityId ? String(row.originCityId) : "");
    const [destinationCity, setDestinationCity] = React.useState<string>(row?.destinationCityId ? String(row.destinationCityId) : "");
    const [departAt, setDepartAt] = React.useState<Date | null>(row?.departAt ? new Date(row.departAt) : null);
    const [arriveAt, setArriveAt] = React.useState<Date | null>(row?.arriveAt ? new Date(row.arriveAt) : null);
    const [numberOfStops, setNumberOfStops] = React.useState<number>(row?.numberOfStops ?? 0);
    const [price, setPrice] = React.useState<number>(row?.price ?? 0.00);
    const [imageUrl, setImageUrl] = React.useState<string>(row?.imageUrl ?? "");
    const [airline, setAirline] = React.useState<string>(row?.airline ?? "");

    const handleSubmit = () => {
        if (!departAt || !arriveAt) {
            alert("Please select both departure and arrival date/time.");
            return;
        }

        const data = {
            originCityId: Number(originCity),
            destinationCityId: Number(destinationCity),
            departAt,
            arriveAt,
            numberOfStops,
            price,
            imageUrl,
            airline
        };

        if (mode === "edit" && row?.flightId) {
            updateFlight.mutate({...data, flightId: row.flightId});
        }

        if (mode === "create") {
            createFlight.mutate(data);
            setOriginCity("");
            setDestinationCity("");
            setDepartAt(null);
            setArriveAt(null);
            setNumberOfStops(0);
            setPrice(0.00);
            setImageUrl("");
            setAirline("");
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
                        placeholder="Departure City"
                        countries={countries}
                        selectedCity={originCity}
                        setSelectedCity={setOriginCity}
                    />

                    <SelectCity
                        icon={<MapPlusIcon size="20"/>}
                        placeholder="Destination City"
                        countries={countries}
                        selectedCity={destinationCity}
                        setSelectedCity={setDestinationCity}
                    />

                    <DateTimePicker value={departAt} onChange={setDepartAt}
                                    placeholder="Pick a departure date and time"/>

                    <DateTimePicker value={arriveAt} onChange={setArriveAt}
                                    placeholder="Pick an arrival date and time"/>

                    <InputComponent
                        htmlFor="imageUrl"
                        label="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />

                    <InputComponent
                        htmlFor="numberOfStops"
                        label="Number of Stops"
                        type="number"
                        value={numberOfStops}
                        onChange={(e) => setNumberOfStops(Number(e.target.value))}
                    />

                    <InputComponent
                        htmlFor="price"
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />

                    <Select onValueChange={(value: string) => setAirline(value)} value={airline}>
                        <SelectTrigger className="w-auto ttext-sm font-medium font-[Figtree] text-gray-700">
                            <SelectValue placeholder="Select an airline"/>
                        </SelectTrigger>
                        <SelectContent className="text-sm text-gray-700 font-[Figtree] font-medium">
                            <SelectItem value="Lufthansa">Lufthansa</SelectItem>
                            <SelectItem value="Wizz Air">Wizz Air</SelectItem>
                            <SelectItem value="Ryanair">Ryanair</SelectItem>
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

export default FlightAdminDetachedModal;
