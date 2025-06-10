import axiosInstance from "@/utils/axios";
import type {Flight, FlightCreate, Flights} from "../flight";
import type { FlightParamsProps } from "./useFlights";

const getAllFlights = async (): Promise<Flight[]> => {
    try {
        const res = await axiosInstance.get('/flights');

        return res.data;
    } catch (err: any) {
        return err.message;
    }
}

const getAllFlightsRoundTrip = async (
    params?: FlightParamsProps
): Promise<Flights> => {
    try {
        const res = await axiosInstance.get('/flights/round-trip', {params});
        console.log(res.data);

        return res.data;
    } catch (err: any) {
        return err.message;
    }
}

const createFlight = async (originCityId: number, destinationCityId: number, departAt: string, arriveAt: string, numberOfStops: number, price: number, imageUrl: string, airline: string): Promise<FlightCreate> => {
    try {
        const res = await axiosInstance.post(`/flights`, {
            originCityId,
            destinationCityId,
            departAt,
            arriveAt,
            numberOfStops,
            price,
            imageUrl,
            airline
        })

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const updateFlightById = async (flightId: number, originCityId: number, destinationCityId: number, departAt: string, arriveAt: string, numberOfStops: number, price: number, imageUrl: string, airline: string): Promise<Flight> => {
    try {
        const res = await axiosInstance.put(`/flights`, {
            flightId,
            originCityId,
            destinationCityId,
            departAt,
            arriveAt,
            numberOfStops,
            price,
            imageUrl,
            airline
        })

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const deleteFlightById = async (flightId: number) => {
    try {
        const res = await axiosInstance.delete(`/flights`, {
            data: {
                flightId
            }
        });

        return res.data;
    } catch (err: any) {
        return err.message;
    }
}

export const FlightService = {
    getAllFlights,
    getAllFlightsRoundTrip,
    createFlight,
    updateFlightById,
    deleteFlightById
}

