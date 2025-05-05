import {RowDataPacket} from "mysql2";

export type Flight = {
    flightId: number,
    originCityId: number,
    destinationCityId: number,
    departAt: string,
    arriveAt: string,
    numberOfStops: number,
    price: number,
    imageUrl: string,
    airline: string,
}

export type FlightDb = RowDataPacket & {
    flight_id: number,
    origin_city_id: number,
    destination_city_id: number,
    depart_at: string,
    arrive_at: string,
    number_of_stops: number,
    price: number,
    image_url: string,
    airline: string,
}
