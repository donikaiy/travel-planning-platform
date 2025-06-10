import {Gallery} from "@/types/gallery";
import {HotelService} from "./hotelService";
import {Room} from "./room";
import {Attraction} from "../attractions/attraction";

export type Hotel = {
    hotelId: number,
    galleryId: number,
    cityId: number,
    name: string,
    location: string,
    about: string,
    price: number,
    preferredGalleryEntryId: number,
    rating?: number,
    imageUrl: string,
}

export type HotelInfo = Hotel & {
    gallery: Gallery[],
    services: HotelService[],
    rooms: Room[],
    nearbyAttractions: Attraction[]
}
