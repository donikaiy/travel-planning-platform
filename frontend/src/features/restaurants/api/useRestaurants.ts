import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { RestaurantService } from "./restaurants";
import type {Restaurant, RestaurantCreate } from "../restaurant";


export type RestaurantParamsProps = {
    destinationCityId?: number,
}

export const useGetAllRestaurants = (params?: RestaurantParamsProps) => {
    return useQuery({
        queryKey: ['restaurants', params || {}],
        queryFn: () => RestaurantService.getAllRestaurants(params),
    })
}

export const useCreateRestaurant = ({
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
        mutationFn: (newRestaurant: RestaurantCreate) =>
            RestaurantService.createRestaurant(
                newRestaurant.cityId,
                newRestaurant.name,
                newRestaurant.location,
                newRestaurant.imageUrl,
                newRestaurant.priceSymbols
            ),

        onMutate: async (newRestaurant) => {
            onStart?.();

            await queryClient.cancelQueries({ queryKey: ["restaurants"] });

            const previousRestaurants = queryClient.getQueryData<RestaurantCreate[]>(["restaurants"]);

            queryClient.setQueryData<RestaurantCreate[]>(["restaurants"], (old = []) => [
                newRestaurant,
                ...old,
            ]);

            return { previousRestaurants };
        },

        onError: (error, _variables, context) => {
            if (context?.previousRestaurants) {
                queryClient.setQueryData(["restaurants"], context.previousRestaurants);
            }
            onError?.(error as Error);
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["restaurants"] });
        },
    });
};

export const useUpdateRestaurant = ({
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
        mutationFn: (newRestaurant: Restaurant) =>
            RestaurantService.updateRestaurantById(
                newRestaurant.restaurantId,
                newRestaurant.cityId,
                newRestaurant.name,
                newRestaurant.location,
                newRestaurant.imageUrl,
                newRestaurant.priceSymbols
            ),

        onMutate: async (updatedRestaurant) => {
            onStart?.();

            await queryClient.cancelQueries({ queryKey: ["restaurants"]});

            const previousRestaurants = queryClient.getQueryData<Restaurant[]>([
                "restaurants"
            ]);

            queryClient.setQueryData<Restaurant[]>(["restaurants"], (old = []) =>
                old.map((restaurant) =>
                    restaurant.restaurantId === updatedRestaurant.restaurantId
                        ? { ...restaurant, ...updatedRestaurant }
                        : restaurant
                )
            );

            return { previousRestaurants};
        },

        onError: (error, _updatedRestaurant, context) => {
            if (context?.previousRestaurants) {
                queryClient.setQueryData(["restaurants"], context.previousRestaurants);
            }
            onError?.(error as Error);
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["restaurants"] });
        },
    });
};

export const useDeleteRestaurantById = ({
                                      onError,
                                      onSuccess,
                                  }: {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (restaurantId: number) => RestaurantService.deleteRestaurantById(restaurantId),

        onMutate: async (restaurantId: number) => {
            await queryClient.cancelQueries({queryKey: ["restaurants"]});

            const previousRestaurants = queryClient.getQueryData<Restaurant[]>(["restaurants"]);

            queryClient.setQueryData<Restaurant[]>(["restaurants"], old =>
                old ? old.filter(restaurant => restaurant.restaurantId !== restaurantId) : []
            );

            return {previousRestaurants};
        },

        onError: (error, _restaurantId, context) => {
            onError?.(error);

            if (context?.previousRestaurants) {
                queryClient.setQueryData(["restaurants"], context.previousRestaurants);
            }
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ["restaurants"]});
        },
    });
};

