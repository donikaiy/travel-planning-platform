import roomRepository from '../rooms/repository';

export const getAllRoomsByHotelId = async (hotelId: number) => {
    return await roomRepository.getAllRoomsByHotelId(hotelId)
}
