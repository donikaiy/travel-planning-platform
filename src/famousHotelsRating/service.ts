import famousHotelRatingRepository from '../famousHotelsRating/repository';

export const getRatingByHotelId = async (hotelId: number) => {
    const ratings = await famousHotelRatingRepository.getAllHotelRatingsByHotelId(hotelId)

    if (ratings.length === 0) {
        return 0;
    }

    const totalRating = ratings.map(rating => rating.rating).reduce(
        (sum, rating) => sum + rating,
        0
    )

    return totalRating / ratings.length;
}
