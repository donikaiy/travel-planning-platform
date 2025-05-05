import {Flight, FlightDb} from "./domain";
import {connection} from "../repository";
import {CityDb} from "../cities/domain";

const getAllFlights = async (): Promise<Flight[]> => {
    const [results] = await connection.query<FlightDb[]>('SELECT * FROM flights');

    return results.map(flightDb => {
        const flight: Flight = {
            flightId: flightDb.flight_id,
            originCityId: flightDb.origin_city_id,
            destinationCityId: flightDb.destination_city_id,
            departAt: flightDb.depart_at,
            arriveAt: flightDb.arrive_at,
            numberOfStops: flightDb.number_of_stops,
            price: flightDb.price,
            imageUrl: flightDb.image_url,
            airline: flightDb.airline,
        }

        return flight
    })
}

const getUniqueCityIdsFromFlights = async () => {
    const [results] = await connection.query<CityDb[]>(
        'SELECT origin_city_id AS city_id FROM flights UNION SELECT destination_city_id AS city_id FROM flights'
    );

    return results.map(result => result.city_id);
};


export default {getAllFlights, getUniqueCityIdsFromFlights}

