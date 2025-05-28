import nearbyAttractionRepository from './repository.ts';
import {getAttractionsByIds} from "../attractions/service.ts";

export const getAllNearbyAttractionsByHotelId = async (hotelId: number) => {
    const nearbyAttractions = await nearbyAttractionRepository.getAllAttractionsByHotelId(hotelId)

    const attractionIds: number[] = nearbyAttractions.map(attraction => attraction.attractionId);

    return getAttractionsByIds(attractionIds)
};
