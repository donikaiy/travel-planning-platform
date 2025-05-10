import {Flight, FlightDb} from "./domain";
import {connection} from "../repository";
import {CityDb} from "../cities/domain";

export type Filters = {
    departureCityId?: number,
    destinationCityId?: number,
    departAt?: string,
}

const getAllFlights = async (filters: Filters = {}): Promise<Flight[]> => {
    const params: any[] = [];
    let query = 'SELECT * FROM flights WHERE 1=1';

    if (filters.departureCityId !== undefined) {
        query += ' AND origin_city_id = ?';
        params.push(filters.departureCityId);
    }

    if (filters.destinationCityId !== undefined) {
        query += ' AND destination_city_id = ?';
        params.push(filters.destinationCityId);
    }

    if (filters.departAt !== undefined) {
        query += ' AND DATE(depart_at) = ?';
        params.push(filters.departAt);
    }

    const [results] = await connection.query<FlightDb[]>(query, params);

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

