import hotelServiceRepository from "../hotel_services/repository";

export const getAllServicesByHotelId = async (hotelId: number) => {
    return hotelServiceRepository.getAllServicesByHotelId(hotelId)
}
