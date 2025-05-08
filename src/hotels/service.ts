import {getAllServicesByHotelId} from "../hotelServices/service";
import hotelRepository from "../hotels/repository";
import {getAllRoomsByHotelId} from "../rooms/service";
import {getAllNearbyAttractionsByHotelId} from "../nearbyAttractions/service";
import {Gallery} from "../gallery/gallery";
import {getAllGalleryImagesByGalleryEntries, getGalleryImagesByGalleryId} from "../gallery/service";
import {getAllHotelRatingsByHotelIdMap} from "../hotelsRating/service";

export const getAllHotels = async () => {
    const hotels = await hotelRepository.getAllHotels();

    const hotelIds = hotels.map(hotel => hotel.hotelId)

    const rating = await getAllHotelRatingsByHotelIdMap(hotelIds)

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
            imageUrl: preferredImageUrls.get(hotel.preferredGalleryEntryId)
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
            imageUrl: preferredImageUrls.get(hotel.preferredGalleryEntryId)
        }
    })
}

