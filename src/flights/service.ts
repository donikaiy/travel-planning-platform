import flightRepository, {getUniqueCityIdsFromFlights} from "../flights/repository";
import {getCitiesByIds} from "../cities/service";

export const getAllFlights = async () => {
    const [allFlights, cityIds] = await Promise.all([
        flightRepository.getAllFlights(),
        getUniqueCityIdsFromFlights()
    ])

    const cities = await getCitiesByIds(cityIds)

    const cityMap = new Map<number, string>();

    cities.forEach((city) => cityMap.set(city.cityId, city.name))

    return allFlights.map(flight => ({
        ...flight,
        originCityId: cityMap.get(flight.originCityId),
        destinationCityId: cityMap.get(flight.destinationCityId)
    }))
}
