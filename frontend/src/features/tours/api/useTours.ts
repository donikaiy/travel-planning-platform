import {useQuery} from "@tanstack/react-query";
import {TourService} from "@/features/tours/api/tours.ts";

export const useGetAllTours = () => {
    return useQuery({
        queryKey: ['tours'],
        queryFn: TourService.getAllTours,
    })
}

export const useGetTourById = (tourId: number) => {
    return useQuery({
        queryKey: ['tours', tourId],
        queryFn: () => TourService.getTourById(tourId)
    })
}
