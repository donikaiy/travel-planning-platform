import flightRepository from "../flights/repository";

export const getAllFlights = async () => {
    return await flightRepository.getAllFlights()
}
