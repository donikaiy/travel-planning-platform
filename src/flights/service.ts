import flightRepository  from "../flights/repository";
import {getCitiesByIds} from "../cities/service";
import {Flight} from "./domain";

export const getAllFlights = async (filters = {}) => {
    const [{outboundFlights, returnFlights}, cityIds] = await Promise.all([
        flightRepository.getAllFlights(filters),
        flightRepository.getUniqueCityIdsFromFlights()
    ])

    const cities = await getCitiesByIds(cityIds)

    const cityMap = new Map<number, string>();

    cities.forEach((city) => cityMap.set(city.cityId, city.name))

    const mapFlightWithCityNames = (flight: Flight) => ({
        ...flight,
        originCity: cityMap.get(flight.originCityId),
        destinationCity: cityMap.get(flight.destinationCityId)
    })

    return [
        ...outboundFlights.map(flight => mapFlightWithCityNames(flight)),
        ...returnFlights.map(flight => mapFlightWithCityNames(flight))
    ];
}
