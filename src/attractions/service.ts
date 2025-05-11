import attractionRepository, {Filters} from '../attractions/repository';

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
