import {getAllServicesByHotelId} from "../hotel_services/service";
import hotelRepository from "../hotels/repository";
import {getAllRoomsByHotelId} from "../rooms/service";
import {getAllNearbyAttractionsByHotelId} from "../nearby_attractions/service";
import {getRatingByHotelId} from "../famousHotelsRating/service";
import {Gallery} from "../gallery/gallery";
import {getAllGalleryImagesByGalleryEntries} from "../gallery/service";

export const getAllHotels = async () => {
    const hotels = await hotelRepository.getAllHotels();

    const hotelIds = hotels.map(hotel => hotel.hotelId)

    const rating = await getRatingByHotelId(hotelIds)

    const preferredGalleryEntries = hotels.map(hotel => hotel.preferredGalleryEntryId)

    const preferredImageUrls = new Map<number, string>()

    const galleryEntries = await getAllGalleryImagesByGalleryEntries(preferredGalleryEntries)

    galleryEntries.forEach((gallery: Gallery) => {
        preferredImageUrls.set(gallery.galleryEntry, gallery.imageUrl)
    })

    return hotels.map(hotel => {
        return {
            ...hotel,
            rating: rating.get(hotel.hotelId) || [],
            image: preferredImageUrls.get(hotel.preferredGalleryEntryId)
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

