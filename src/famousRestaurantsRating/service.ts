import famousRestaurantRatingRepository from '../famousRestaurantsRating/repository';

export const getRatingsByRestaurantIdsMap = async (ids: number[]) => {
    const ratings = await famousRestaurantRatingRepository.getAllRestaurantRatingsByRestaurantIdsMap(ids)

    const ratingsMap = new Map<number, number>();

    ids.forEach(id => {
        const totalRating = ratings.get(id)?.reduce((sum, rating) => sum + rating.rating, 0) || 0
        const length = ratings.get(id)?.length || 1
        const average = totalRating / length

        ratingsMap.set(id, average)
    })

    return ratingsMap
}
