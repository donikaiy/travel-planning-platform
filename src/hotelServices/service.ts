import hotelServiceRepository from ".//repository";

export const getAllServicesByHotelId = async (hotelId: number) => {
    return hotelServiceRepository.getAllServicesByHotelId(hotelId)
}
