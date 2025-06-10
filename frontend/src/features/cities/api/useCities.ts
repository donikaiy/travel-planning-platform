import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {CityService} from "@/features/cities/api/cities.ts";
import type {City, CityCreate} from "../city";

export const useGetAllCities = () => {
    return useQuery({
        queryKey: ['cities'],
        queryFn: () => CityService.getAllCities(),
    })
}

export const useCreateCity = ({
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
        mutationFn: (newCity: CityCreate) =>
            CityService.createCity(
                newCity.countryId,
                newCity.name,
                newCity.imageUrl
            ),

        onMutate: async (newCity) => {
            onStart?.();

            await queryClient.cancelQueries({ queryKey: ["cities"] });

            const previousCities = queryClient.getQueryData<CityCreate[]>(["cities"]);

            queryClient.setQueryData<CityCreate[]>(["cities"], (old = []) => [
                newCity,
                ...old,
            ]);

            return { previousCities };
        },

        onError: (error, _variables, context) => {
            if (context?.previousCities) {
                queryClient.setQueryData(["cities"], context.previousCities);
            }
            onError?.(error as Error);
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["cities"] });
        },
    });
};

export const useUpdateCity = ({
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
        mutationFn: (newCity: City) =>
            CityService.updateCityById(
                newCity.cityId,
                newCity.countryId,
                newCity.name,
                newCity.imageUrl
            ),

        onMutate: async (updatedCity) => {
            onStart?.();

            await queryClient.cancelQueries({ queryKey: ["cities"]});

            const previousCities = queryClient.getQueryData<City[]>([
                "cities"
            ]);

            queryClient.setQueryData<City[]>(["cities"], (old = []) =>
                old.map((city) =>
                    city.cityId === updatedCity.cityId
                        ? { ...city, ...updatedCity }
                        : city
                )
            );

            return { previousCities};
        },

        onError: (error, _updatedCity, context) => {
            if (context?.previousCities) {
                queryClient.setQueryData(["cities"], context.previousCities);
            }
            onError?.(error as Error);
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["cities"] });
        },
    });
};

export const useDeleteCityById = ({
                                      onError,
                                      onSuccess,
                                  }: {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cityId: number) => CityService.deleteCityById(cityId),

        onMutate: async (cityId: number) => {
            await queryClient.cancelQueries({queryKey: ["cities"]});

            const previousCities = queryClient.getQueryData<City[]>(["cities"]);

            queryClient.setQueryData<City[]>(["cities"], old =>
                old ? old.filter(city => city.cityId !== cityId) : []
            );

            return {previousCities};
        },

        onError: (error, _cityId, context) => {
            onError?.(error);

            if (context?.previousCities) {
                queryClient.setQueryData(["cities"], context.previousCities);
            }
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ["cities"]});
        },
    });
};
