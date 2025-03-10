import restaurantRepository from '../restaurants/repository';

export const getAllRestaurants = async () => {
    return await restaurantRepository.getAllRestaurants()
}
