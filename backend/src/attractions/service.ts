import attractionRepository from './repository.ts';
import type {Filters} from './repository.ts';

export const getAllAttractions = async (filters: Filters = {}) => {
    return attractionRepository.getAllAttractions(filters)
}

export const getAttractionById = async (attractionId: number) => {
    return attractionRepository.getAttractionById(attractionId)
}

export const getAttractionsByIds = async (ids: number[]) => {
    return attractionRepository.getAttractionsByIds(ids)
}

export const getAttractionsByCityIdsMap = async (ids: number[]) => {
    return attractionRepository.getAttractionsByCityIdsMap(ids)
}

export const checkAttractionExists = async (name: string) => {
    return attractionRepository.checkAttractionExists(name)
}

export const createAttraction = async (cityId: number, name: string, location: string, imageUrl: string, description: string, openingHours: string,
                                       bestTimeToVisit: string, ticketsWebsite: string, additionalInformation: string) => {
    return attractionRepository.createAttraction(cityId, name, location, imageUrl, description, openingHours, bestTimeToVisit, ticketsWebsite, additionalInformation)
}

export const deleteAttractionById = async (attractionId: number) => {
    await attractionRepository.deleteAttractionById(attractionId);
}

export const updateAttractionById = async (attractionId: number, cityId: number, name: string, location: string, imageUrl: string, description: string, openingHours: string,
                                           bestTimeToVisit: string, ticketsWebsite: string, additionalInformation: string) => {
    return attractionRepository.updateAttractionById(attractionId, cityId, name, location, imageUrl, description, openingHours, bestTimeToVisit, ticketsWebsite, additionalInformation)
}
