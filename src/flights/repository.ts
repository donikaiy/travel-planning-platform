import {Flight, FlightDb} from "./domain";
import {connection} from "../repository";
import {CityDb} from "../cities/domain";

type FiltersProps = {
    departureCityId?: string,
    destinationCityId?: string,
    departureDate?: string,
    returnDate?: string,
}

const getAllFlights = async (filters: FiltersProps = {}): Promise<{outboundFlights: Flight[], returnFlights: Flight[]}> => {
    const outboundParams: any[] = [];
    const returnParams: any[] = [];

    let outboundQuery = 'SELECT * FROM flights WHERE 1=1';
    let returnQuery = 'SELECT * FROM flights WHERE 1=1';

    //From A->B
    if (filters.departureCityId !== undefined) {
        outboundQuery += ' AND origin_city_id = ?';
        outboundParams.push(filters.departureCityId);
    }

    if (filters.destinationCityId !== undefined) {
        outboundQuery += ' AND destination_city_id = ?';
        outboundParams.push(filters.destinationCityId);
    }

    if (filters.departureDate !== undefined) {
        outboundQuery += ' AND DATE(depart_at) = ?';
        outboundParams.push(filters.departureDate);
    }

    //From B->A
    if (filters.departureCityId !== undefined && filters.destinationCityId !== undefined && filters.returnDate !== undefined) {
        returnQuery += ' AND origin_city_id = ? AND destination_city_id = ? AND DATE(depart_at) = ?';
        returnParams.push(filters.destinationCityId);
        returnParams.push(filters.departureCityId);
        returnParams.push(filters.returnDate);
    }


    const [outboundResults] = await connection.query<FlightDb[]>(outboundQuery, outboundParams);
    const [returnResults] = await connection.query<FlightDb[]>(returnQuery, returnParams);

    const mapFlight = (flightDb: FlightDb) => ({
        flightId: flightDb.flight_id,
        originCityId: flightDb.origin_city_id,
        destinationCityId: flightDb.destination_city_id,
        departAt: flightDb.depart_at,
        arriveAt: flightDb.arrive_at,
        numberOfStops: flightDb.number_of_stops,
        price: flightDb.price,
        imageUrl: flightDb.image_url,
        airline: flightDb.airline,
    })

    return {
        outboundFlights: outboundResults.map(mapFlight),
        returnFlights: returnResults.map(mapFlight)
    }
}

const getUniqueCityIdsFromFlights = async () => {
    const [results] = await connection.query<CityDb[]>(
        'SELECT origin_city_id AS city_id FROM flights UNION SELECT destination_city_id AS city_id FROM flights'
    );

    return results.map(result => result.city_id);
};


export default {getAllFlights, getUniqueCityIdsFromFlights}

