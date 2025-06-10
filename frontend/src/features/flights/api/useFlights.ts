import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { FlightService } from "./flights";
import type {Flight, FlightCreate, FlightUpdate } from "../flight";
import { formatDateToSQL } from "@/utils/formatDate";


export type FlightParamsProps = {
    departureCityId?: number,
    destinationCityId?: number,
    departAt?: string,
    returnAt?: string,
}

export const useGetAllFlights = () => {
    return useQuery({
        queryKey: ['flights'],
        queryFn: () => FlightService.getAllFlights(),
    })
}

export const useGetAllFlightsRoundTrip = (
    params?: FlightParamsProps
) => {
    return useQuery({
        queryKey: ['flights', params || {}],
        queryFn: () => FlightService.getAllFlightsRoundTrip(params),
    })
}

export const useCreateFlight = ({
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
        mutationFn: (newFlight: FlightCreate) =>
            FlightService.createFlight(
                newFlight.originCityId,
                newFlight.destinationCityId,
                formatDateToSQL(newFlight.departAt),
                formatDateToSQL(newFlight.arriveAt),
                newFlight.numberOfStops,
                newFlight.price,
                newFlight.imageUrl,
                newFlight.airline
            ),

        onMutate: async (newFlight) => {
            onStart?.();

            await queryClient.cancelQueries({queryKey: ["flights"]});

            const previousFlights = queryClient.getQueryData<FlightCreate[]>(["flights"]);

            queryClient.setQueryData<FlightCreate[]>(["flights"], (old = []) => [
                newFlight,
                ...old,
            ]);

            return {previousFlights};
        },

        onError: (error, _variables, context) => {
            if (context?.previousFlights) {
                queryClient.setQueryData(["flights"], context.previousFlights);
            }
            onError?.(error as Error);
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ["flights"]});
        },
    });
};

export const useUpdateFlight = ({
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
        mutationFn: (newFlight: FlightUpdate) =>
            FlightService.updateFlightById(
                newFlight.flightId,
                newFlight.originCityId,
                newFlight.destinationCityId,
                formatDateToSQL(newFlight.departAt),
                formatDateToSQL(newFlight.arriveAt),
                newFlight.numberOfStops,
                newFlight.price,
                newFlight.imageUrl,
                newFlight.airline
            ),


        onMutate: async (updatedFlight) => {
            onStart?.();

            await queryClient.cancelQueries({queryKey: ["flights"]});

            const previousFlights = queryClient.getQueryData<Flight[]>([
                "flights"
            ]);

            queryClient.setQueryData<Flight[]>(["flights"], (old = []) =>
                old.map((flight) =>
                    flight.flightId === updatedFlight.flightId
                        ? {...flight, ...updatedFlight}
                        : flight
                )
            );

            return {previousFlights};
        },

        onError: (error, _updatedFlight, context) => {
            if (context?.previousFlights) {
                queryClient.setQueryData(["flights"], context.previousFlights);
            }
            onError?.(error as Error);
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ["flights"]});
        },
    });
};

export const useDeleteFlightById = ({
                                        onError,
                                        onSuccess,
                                    }: {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (flightId: number) => FlightService.deleteFlightById(flightId),

        onMutate: async (flightId: number) => {
            await queryClient.cancelQueries({queryKey: ["flights"]});

            const previousFlights = queryClient.getQueryData<Flight[]>(["flights"]);

            queryClient.setQueryData<Flight[]>(["flights"], old =>
                old ? old.filter(flight => flight.flightId !== flightId) : []
            );

            return {previousFlights};
        },

        onError: (error, _flightId, context) => {
            onError?.(error);

            if (context?.previousFlights) {
                queryClient.setQueryData(["flights"], context.previousFlights);
            }
        },

        onSuccess: () => {
            onSuccess?.();
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ["flights"]});
        },
    });
};

