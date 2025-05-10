import flightRepository, {Filters} from "../flights/repository";
import {getCitiesByIds} from "../cities/service";

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

export const getDepartureAndReturnFlights = async ({
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
