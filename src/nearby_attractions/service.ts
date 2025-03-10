import nearbyAttractionRepository from '../nearby_attractions/repository';
import {getAttractionsByIds} from "../attractions/service";

export const getAllNearbyAttractionsByHotelId = async (hotelId: number) => {
    const nearbyAttractions = await nearbyAttractionRepository.getAllAttractionsByHotelId(hotelId)

    const attractionIds: number[] = nearbyAttractions.map(attraction => attraction.attractionId);

    return getAttractionsByIds(attractionIds)
};
