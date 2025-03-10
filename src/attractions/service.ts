import attractionRepository from '../attractions/repository';

export const getAllAttractions = async () => {
    return await attractionRepository.getAllAttractions()
}

export const getAttractionById = async (attractionId: number) => {
    return await attractionRepository.getAttractionById(attractionId)
}

export const getAttractionsByIds = async (ids: number[]) => {
    return await attractionRepository.getAttractionsByIds(ids)
}
