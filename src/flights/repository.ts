import {Flight, FlightDB} from "./domain";
import {connection} from "../repository";
import {CityDB} from "../cities/domain";

const getAllFlights = async (): Promise<Flight[]> => {
    const [results] = await connection.query<FlightDB[]>('SELECT * FROM flights');
    return results.map(flightDB => {
        const flight: Flight = {
            flightId: flightDB.flight_id,
            originCityId: flightDB.origin_city_id,
            destinationCityId: flightDB.destination_city_id,
            departAt: flightDB.depart_at,
            arriveAt: flightDB.arrive_at,
            numberOfStops: flightDB.number_of_stops,
            price: flightDB.price,
            imageUrl: flightDB.image_url,
            airline: flightDB.airline,
        }

        return flight
    })
}

export const getUniqueCityIdsFromFlights = async () => {
    const [results] = await connection.query<CityDB[]>(
        'SELECT DISTINCT origin_city_id AS city_id FROM flights UNION SELECT DISTINCT destination_city_id AS city_id FROM flights'
    );

    return results.map(result => result.city_id);
};


export default {getAllFlights, getUniqueCityIdsFromFlights}

