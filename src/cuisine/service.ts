import cuisineRepository from '../cuisine/repository';

export const getAllCuisinesByCountryId = async (countryId: number) => {
    return await cuisineRepository.getAllCuisinesByCountryId(countryId)
}
