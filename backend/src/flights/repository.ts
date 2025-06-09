import type {Flight, FlightDb} from "./domain.d.ts";
import {connection} from "../repository.ts";
import type {CityDb} from "../cities/domain.d.ts";
import type {QueryResult, ResultSetHeader} from "mysql2";
import type { Exist } from "../types/exist.d.ts";

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

const getUniqueCityIdsFromFlights = async (): Promise<number[]> => {
    const [results] = await connection.query<CityDb[]>(
        'SELECT origin_city_id AS city_id FROM flights UNION SELECT destination_city_id AS city_id FROM flights'
    );

    return results.map(result => result.city_id);
};

const checkFlightExists = async (originCityId: number, destinationCityId: number, departAt: string, arriveAt: string, airline: string): Promise<boolean> => {
    const [result] = await connection.execute<Exist[]>('SELECT EXISTS(SELECT * FROM flights WHERE origin_city_id = ? AND destination_city_id = ? AND depart_at = ? AND arrive_at = ? AND airline = ?) AS exist', [originCityId, destinationCityId, departAt, arriveAt, airline])

    return result[0]?.exist === 1
}

const createFlight = async (originCityId: number, destinationCityId: number, departAt: string, arriveAt: string, numberOfStops: number, price: number, imageUrl: string, airline: string): Promise<Flight> => {
    const [result] = await connection.execute<ResultSetHeader>('INSERT INTO flights (origin_city_id, destination_city_id, depart_at, arrive_at, number_of_stops, price, image_url, airline) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [originCityId, destinationCityId, departAt, arriveAt, numberOfStops, price, imageUrl, airline]);

    return {
        flightId: result.insertId,
        originCityId,
        destinationCityId,
        departAt,
        arriveAt,
        numberOfStops,
        price,
        imageUrl,
        airline,
    }
}

const deleteFlightById = async (flightId: number): Promise<QueryResult> => {
    const [result] = await connection.execute('DELETE FROM flights WHERE flight_id = ?', [flightId]);

    return result
}

const updateFlightById = async (flightId: number, originCityId: number, destinationCityId: number, departAt: string, arriveAt: string, numberOfStops: number, price: number, imageUrl: string, airline: string): Promise<QueryResult> => {
    const [result] = await connection.execute('UPDATE flights SET origin_city_id = ?, destination_city_id = ?, depart_at = ?, arrive_at = ?, number_of_stops = ?, price = ?, image_url = ?, airline = ? WHERE flight_id = ?', [originCityId, destinationCityId, departAt, arriveAt, numberOfStops, price, imageUrl, airline, flightId]);

    return result
}

export default {getAllFlights, getUniqueCityIdsFromFlights, checkFlightExists, createFlight, deleteFlightById, updateFlightById}

