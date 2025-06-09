import flightRepository from "./repository.ts";
import type {Filters} from "./repository.ts"
import {getCitiesByIds} from "../cities/service.ts";
import {ALREADY_EXISTS} from "../utils/responseMessages.ts";

export const getAllFlights = async (filters: Filters = {}) => {
    const [flights, cityIds] = await Promise.all([
        flightRepository.getAllFlights(filters),
        flightRepository.getUniqueCityIdsFromFlights()
    ])

    const cities = await getCitiesByIds(cityIds)

    const cityMap = new Map<number, string>();

    cities.forEach((city) => cityMap.set(city.cityId, city.name))

    return flights.map((flight) => {
        return {
            ...flight,
            originCity: cityMap.get(flight.originCityId),
            destinationCity: cityMap.get(flight.destinationCityId)
        }
    })
}

export const getRoundTrip = async ({
                                                       departureCityId,
                                                       destinationCityId,
                                                       departAt,
                                                       returnAt
                                                   }: {
    departureCityId?: number,
    destinationCityId?: number,
    departAt?: string,
    returnAt?: string,
}) => {
    const departureFlights = await getAllFlights({departureCityId, destinationCityId, departAt})

    const returnFlights = await getAllFlights({
        departureCityId: destinationCityId,
        destinationCityId: departureCityId,
        departAt: returnAt
    })

    return {
        departureFlights,
        returnFlights
    }
}

export const checkFlightExists = async (originCityId: number, destinationCityId: number, departAt: string, arriveAt: string, airline: string) => {
    return flightRepository.checkFlightExists(originCityId, destinationCityId, departAt, arriveAt, airline)
}

export const createFlight = async (originCityId: number, destinationCityId: number, departAt: string, arriveAt: string, numberOfStops: number, price: number, imageUrl: string, airline: string) => {
    const flightExists = await checkFlightExists(originCityId, destinationCityId, departAt, arriveAt, airline)

    if (flightExists) {
        throw new Error(ALREADY_EXISTS)
    }

    return flightRepository.createFlight(originCityId, destinationCityId, departAt, arriveAt, numberOfStops, price, imageUrl, airline)
}

export const deleteFlightById = async (flightId: number) => {
    return flightRepository.deleteFlightById(flightId)
}

export const updateFlightById = async (flightId: number, originCityId: number, destinationCityId: number, departAt: string, arriveAt: string, numberOfStops: number, price: number, imageUrl: string, airline: string) => {
    return flightRepository.updateFlightById(flightId, originCityId, destinationCityId, departAt, arriveAt, numberOfStops, price, imageUrl, airline)
}

