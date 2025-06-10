import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { AttractionService } from "./attractions";
import type {Attraction, AttractionCreate } from "../attraction";


export type AttractionParamsProps = {
    destinationCityId?: number,
}

export const useGetAllAttractions = (params?: AttractionParamsProps) => {
    return useQuery({
        queryKey: ['attractions', params || {}],
        queryFn: () => AttractionService.getAllAttractions(params),
    })
}

export const useGetAttractionById = (attractionId: number) => {
    return useQuery({
        queryKey: ['attractions', attractionId],
        queryFn: () => AttractionService.getAttractionById(attractionId),
    })
}

export const useCreateAttraction = ({
                                 onStart,
                                 onSuccess,
                                 onError,
                             }: {
    onStart?: () => void;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newAttraction: AttractionCreate) =>
            AttractionService.createAttraction(
                newAttraction.cityId,
                newAttraction.name,
                newAttraction.location,
                newAttraction.imageUrl,
                newAttraction.description,
                newAttraction.openingHours,
                newAttraction.bestTimeToVisit,
                newAttraction.ticketsWebsite,
                newAttraction.additionalInformation
            ),

        onMutate: async (newAttraction) => {
            onStart?.();

            await queryClient.cancelQueries({ queryKey: ["attractions"] });

            const previousAttractions = queryClient.getQueryData<AttractionCreate[]>(["attractions"]);

            queryClient.setQueryData<AttractionCreate[]>(["attractions"], (old = []) => [
                newAttraction,
                ...old,
            ]);

            return { previousAttractions };
        },

        onError: (error, _variables, context) => {
            if (context?.previousAttractions) {
                queryClient.setQueryData(["attractions"], context.previousAttractions);
            }
            onError?.(error as Error);
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["attractions"] });
        },
    });
};

export const useUpdateAttraction = ({
                                        onStart,
                                        onSuccess,
                                        onError,
                                    }: {
    onStart?: () => void;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updatedAttraction: Attraction) =>
            AttractionService.updateAttractionById(
                updatedAttraction.attractionId,
                updatedAttraction.cityId,
                updatedAttraction.name,
                updatedAttraction.location,
                updatedAttraction.imageUrl,
                updatedAttraction.description,
                updatedAttraction.openingHours,
                updatedAttraction.bestTimeToVisit,
                updatedAttraction.ticketsWebsite,
                updatedAttraction.additionalInformation
            ),

        onMutate: async (updatedAttraction) => {
            onStart?.();

            await queryClient.cancelQueries({ queryKey: ["attractions"]});

            const previousAttractions = queryClient.getQueryData<Attraction[]>([
                "attractions"
            ]);

            queryClient.setQueryData<Attraction[]>(["attractions"], (old = []) =>
                old.map((attraction) =>
                    attraction.attractionId === updatedAttraction.attractionId
                        ? { ...attraction, ...updatedAttraction }
                        : attraction
                )
            );

            return { previousAttractions};
        },

        onError: (error, _updatedAttraction, context) => {
            if (context?.previousAttractions) {
                queryClient.setQueryData(["attractions"], context.previousAttractions);
            }
            onError?.(error as Error);
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["attractions"] });
        },
    });
};

export const useDeleteAttractionById = ({
                                            onError,
                                            onSuccess,
                                        }: {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (attractionId: number) => AttractionService.deleteAttractionById(attractionId),

        onMutate: async (attractionId: number) => {
            await queryClient.cancelQueries({queryKey: ["attractions"]});

            const previousAttractions = queryClient.getQueryData<Attraction[]>(["attractions"]);

            queryClient.setQueryData<Attraction[]>(["attractions"], old =>
                old ? old.filter(attraction => attraction.attractionId !== attractionId) : []
            );

            return {previousAttractions};
        },

        onError: (error, _attractionId, context) => {
            onError?.(error);

            if (context?.previousAttractions) {
                queryClient.setQueryData(["attractions"], context.previousAttractions);
            }
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ["attractions"]});
        },
    });
};


