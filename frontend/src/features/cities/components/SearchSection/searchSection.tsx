import * as React from "react";
import {Calendar as CalendarIcon, PlaneLandingIcon, PlaneTakeoffIcon, UsersIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useNavigate} from "react-router-dom";
import type {CountryWithCities} from "@/features/countries/country";
import SelectCity from "@/features/cities/components/SelectCity/selectCity.tsx";
import type {DateRange} from "react-day-picker";

type SearchSectionProps = {
    countries: CountryWithCities[] | undefined;
}

const SearchSection = ({countries}: SearchSectionProps) => {
    const [departureCity, setDepartureCity] = React.useState<string>("")
    const [destinationCity, setDestinationCity] = React.useState<string>("")
    const [date, setDate] = React.useState<DateRange | undefined>()
    const [adults, setAdults] = React.useState<number>()
    const navigate = useNavigate();

    const check = () => {
        if (!departureCity || !destinationCity || !date || !adults) {
            alert("Please fill in all fields")
            return
        }

        const formattedDeparture = format(date.from!, "yyyy-MM-dd");
        const formattedReturn = format(date.to!, "yyyy-MM-dd");

        navigate('/flights', {state: {departureCityId: departureCity, destinationCityId: destinationCity, departAt: formattedDeparture, returnAt: formattedReturn}})
    }

    return (
        <div className="flex flex-col gap-4 mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
            <SelectCity icon={<PlaneTakeoffIcon size="20"/>} placeholder="Departure from"
                        countries={countries} selectedCity={departureCity}
                        setSelectedCity={setDepartureCity}/>

            <SelectCity icon={<PlaneLandingIcon size="20"/>} placeholder="Arrival at"
                        countries={countries} selectedCity={destinationCity}
                        setSelectedCity={setDestinationCity}/>

            <div className="flex flex-col flex-1 lg:flex-row gap-4">
                <div className="w-full lg:w-1/2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={`w-full justify-start text-left text-sm font-medium font-[Figtree] hover:text-muted-foreground ${date ? 'text-gray-800' : 'text-muted-foreground'}`}
                            >
                                <CalendarIcon/>
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Choose dates</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="range"
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div
                    className={`w-full lg:w-1/2 relative ${adults ? 'text-gray-800' : 'text-muted-foreground'} bg-white rounded-md`}>
                    <Input
                        className="ps-10 text-sm font-medium font-[Figtree] w-full"
                        placeholder="Adults"
                        type="number"
                        value={adults ?? ""}
                        onChange={(event) => setAdults(Number(event.target.value))}
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                        <UsersIcon size="20"/>
                    </div>
                </div>
            </div>


            <Button className="bg-gray-800 text-white text-sm font-[Figtree] hover:bg-gray-700" onClick={check}>Search</Button>
        </div>
    )
}

export default SearchSection
