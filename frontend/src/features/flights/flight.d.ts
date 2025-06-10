export type FlightUpdate = FlightCreate & {
    flightId: number,
}

export type Flight = FlightCreate & {
    flightId: number,
    originCity: string,
    destinationCity: string,
}

export type FlightCreate = {
    originCityId: number,
    destinationCityId: number,
    departAt: Date,
    arriveAt: Date,
    numberOfStops: number,
    price: number,
    imageUrl: string,
    airline: string,
}

export type Flights = {
    departureFlights: Flight[],
    returnFlights: Flight[]
}
