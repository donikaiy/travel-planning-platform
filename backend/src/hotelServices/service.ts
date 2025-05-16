import hotelServiceRepository from "./repository.ts";

export const getAllServicesByHotelId = async (hotelId: number) => {
    return hotelServiceRepository.getAllServicesByHotelId(hotelId)
}
