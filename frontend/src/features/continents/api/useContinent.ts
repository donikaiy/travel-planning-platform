import {useQuery} from "@tanstack/react-query";
import {ContinentService} from "@/features/continents/api/continents.ts";

export const useGetAllContinents = () => {
    return useQuery({
        queryKey: ["continents"],
        queryFn: ContinentService.getAllContinents,
    })
}
