import {useQuery} from "@tanstack/react-query";
import {CountyService} from "@/features/countries/api/countries.ts";

export const useGetAllCountries = () => {
    return useQuery({
        queryKey: ['country'],
        queryFn: CountyService.getAllCountries,
    })
}

export const useGetAllCountriesWithCities = () => {
    return useQuery({
        queryKey: ['country', 'cities'],
        queryFn: CountyService.getAllCountriesWithCities,
    })
}

export const useGetCountryById = (countryId: number) => {
    return useQuery({
        queryKey: ['countries', countryId],
        queryFn: () => CountyService.getCountryById(countryId)
    })
}
