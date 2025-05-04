import {getAllServicesByHotelId} from "../hotel_services/service";
import hotelRepository from "../hotels/repository";
import {getAllRoomsByHotelId} from "../rooms/service";
import {getAllNearbyAttractionsByHotelId} from "../nearby_attractions/service";
import {getRatingByHotelId} from "../famousHotelsRating/service";
import {Gallery} from "../gallery/gallery";
import {getAllGalleryImagesByGalleryEntries, getGalleryImagesByGalleryId} from "../gallery/service";

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

export const getHotelById = async (hotelId: number) => {
    const [hotel, services, rooms, nearbyAttractions] = await Promise.all([
        hotelRepository.getHotelById(hotelId),
        getAllServicesByHotelId(hotelId),
        getAllRoomsByHotelId(hotelId),
        getAllNearbyAttractionsByHotelId(hotelId)
    ])

    const galleryImages = await getGalleryImagesByGalleryId(hotel.galleryId)

    return {
        ...hotel,
        gallery: galleryImages,
        services: services,
        rooms: rooms,
        nearbyAttractions: nearbyAttractions,
    }
}

export const getHotelsByCityId = async (cityId: number) => {
    const hotels = await hotelRepository.getHotelsByCityId(cityId)

    const preferredGalleryEntries = hotels.map(hotel => hotel.preferredGalleryEntryId)

    const preferredImageUrls = new Map<number, string>()

    const galleryEntries = await getAllGalleryImagesByGalleryEntries(preferredGalleryEntries)

    galleryEntries.forEach((gallery: Gallery) => {
        preferredImageUrls.set(gallery.galleryEntry, gallery.imageUrl)
    })

    return hotels.map(hotel => {
        return {
            ...hotel,
            image: preferredImageUrls.get(hotel.preferredGalleryEntryId)
        }
    })
}

