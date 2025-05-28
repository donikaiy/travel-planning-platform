import roomRepository from '../rooms/repository.ts';

export const getAllRoomsByHotelId = async (hotelId: number) => {
    return roomRepository.getAllRoomsByHotelId(hotelId)
}
