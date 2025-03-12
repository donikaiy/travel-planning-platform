import famousHotelRatingRepository from '../famousHotelsRating/repository';

export const getRatingByHotelId = async (ids: number[]) => {
    const ratings = await famousHotelRatingRepository.getAllHotelRatingsByHotelIdMap(ids)

    const ratingsMap = new Map<number, number>()

    ids.forEach(id => {
        const ratingsList = ratings.get(id) ?? []; // Default to an empty array if undefined
        const totalRating = ratingsList.reduce((sum, rating) => sum + rating.rating, 0);
        const average = ratingsList.length ? totalRating / ratingsList.length : 0;

        ratingsMap.set(id, average)
    })

    return ratingsMap
}
