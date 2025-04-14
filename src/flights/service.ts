import flightRepository  from "../flights/repository";
import {getCitiesByIds} from "../cities/service";

export const getAllFlights = async () => {
    const [allFlights, cityIds] = await Promise.all([
        flightRepository.getAllFlights(),
        flightRepository.getUniqueCityIdsFromFlights()
    ])

    const cities = await getCitiesByIds(cityIds)

    const cityMap = new Map<number, string>();

    cities.forEach((city) => cityMap.set(city.cityId, city.name))

    return allFlights.map(flight => ({
        ...flight,
        originCity: cityMap.get(flight.originCityId),
        destinationCity: cityMap.get(flight.destinationCityId)
    }))
}
