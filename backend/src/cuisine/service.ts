import cuisineRepository from '../cuisine/repository.ts';

export const getAllCuisinesByCountryId = async (countryId: number) => {
    return cuisineRepository.getAllCuisinesByCountryId(countryId)
}
