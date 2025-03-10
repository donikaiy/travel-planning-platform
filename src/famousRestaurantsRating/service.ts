import famousRestaurantRatingRepository from '../famousRestaurantsRating/repository';

export const getRatingByRestaurantId = async (restaurantId: number) => {
    const ratings = await famousRestaurantRatingRepository.getAllRestaurantRatingsByRestaurantId(restaurantId)

    if (ratings.length === 0) {
        return 0;
    }

    const totalRating = ratings.map(rating => rating.rating).reduce(
        (sum, rating) => sum + rating,
        0
    )

    return totalRating / ratings.length;
}
