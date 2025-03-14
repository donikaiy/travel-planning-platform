import {getAllServicesByHotelId} from "../hotel_services/service";
import hotelRepository from "../hotels/repository";
import {getAllRoomsByHotelId} from "../rooms/service";
import {getAllNearbyAttractionsByHotelId} from "../nearby_attractions/service";
import {getRatingByHotelId} from "../famousHotelsRating/service";

export const getAllHotels = async () => {
    const hotels = await hotelRepository.getAllHotels();

    const hotelIds = hotels.map(hotel => hotel.hotelId)

    const rating = await getRatingByHotelId(hotelIds)

    return hotels.map(hotel => {
        return {
            ...hotel,
            rating: rating.get(hotel.hotelId) || []
        }
    })
}

export const getHotelByIdService = async (hotelId: number) => {
    const hotelById = await hotelRepository.getHotelById(hotelId)

    if (hotelById.length === 0) {
        throw new Error(`Hotel with id ${hotelId} not found`);
    }

    const [services, rooms, nearbyAttractions] = await Promise.all([
        getAllServicesByHotelId(hotelId),
        getAllRoomsByHotelId(hotelId),
        getAllNearbyAttractionsByHotelId(hotelId)
    ])

    return {
        hotel: hotelById[0],
        services: services,
        rooms: rooms,
        nearbyAttractions: nearbyAttractions,
    }
}

