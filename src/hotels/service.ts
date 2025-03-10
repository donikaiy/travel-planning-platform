import {getAllServicesByHotelId} from "../hotel_services/service";
import hotelRepository from "../hotels/repository";
import {getAllRoomsByHotelId} from "../rooms/service";
import {getAllNearbyAttractionsByHotelId} from "../nearby_attractions/service";

export const getAllHotels = async () => {
    return await hotelRepository.getAllHotels()
}

export const getHotelByIdService = async (hotelId: number) => {
    const hotelById = await hotelRepository.getHotelById(hotelId)

    if (hotelById.length === 0) {
        throw new Error(`Hotel with id ${hotelId} not found`);
    }

    const services = await getAllServicesByHotelId(hotelId)

    const rooms = await getAllRoomsByHotelId(hotelId)

    const nearbyAttractions = await getAllNearbyAttractionsByHotelId(hotelId)

    return {
        hotel: hotelById[0],
        services: services,
        rooms: rooms,
        nearbyAttractions: nearbyAttractions,
    }
}

