import flightRepository from "../flights/repository";

export const getAllFlights = async () => {
    return flightRepository.getAllFlights()
}
