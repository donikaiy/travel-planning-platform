import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import type {CountryWithCities} from "@/features/countries/country";

type SelectCityProps = {
    icon: React.ReactNode;
    placeholder: string;
    countries: CountryWithCities[] | undefined;
    selectedCity: string;
    setSelectedCity: (value: string) => void;

};

const SelectCity = ({ icon, placeholder, countries, selectedCity, setSelectedCity }: SelectCityProps) => {
    const handleChange = (value: string) => {
        setSelectedCity(value);
    };

    const selectedCityName = React.useMemo(() => {
        const selectedCityIdNum = Number(selectedCity);
        for (const country of countries || []) {
            const found = country.cities.find(city => city.cityId === selectedCityIdNum);
            if (found) return found.name;
        }
        return "";
    }, [selectedCity, countries]);

    return (
        <Select value={selectedCity} onValueChange={handleChange}>
            <SelectTrigger className="w-auto">
                <div className={`flex gap-2 items-center text-sm font-medium font-[Figtree] ${selectedCity ? 'text-gray-700' : 'text-muted-foreground'}`}>
                    {icon}{" "}
                    {selectedCity ? selectedCityName : <SelectValue placeholder={placeholder} />}
                </div>
            </SelectTrigger>
            <SelectContent>
                {countries?.map((country) => (
                    <SelectGroup key={country.countryId}>
                        <SelectLabel className="text-gray-700 ps-2 text-sm">
                            {country.name}
                        </SelectLabel>
                        {country.cities.map((city) => (
                            <SelectItem
                                key={city.cityId}
                                value={city.cityId.toString()}
                                className="text-gray-800 ps-2 text-sm font-[Figtree]"
                            >
                                {city.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectCity;
