import attractionRepository from '../attractions/repository';

export const getAllAttractions = async () => {
    return attractionRepository.getAllAttractions()
}

export const getAttractionById = async (attractionId: number) => {
    return attractionRepository.getAttractionById(attractionId)
}

export const getAttractionsByIds = async (ids: number[]) => {
    return attractionRepository.getAttractionsByIds(ids)
}

export const getAttractionsByCityId = async (cityId: number) => {
    return attractionRepository.getAttractionsBiCityId(cityId)
}
