import famousReadyTourRatingRepository from '../famousReadyToursRating/repository';

export const getAllReadyToursRatingByReadyTourId = async (readyTourId: number) => {
    const rating = await famousReadyTourRatingRepository.getAllReadyToursRatingByReadyTourId(readyTourId)

    const ratingReadyTour = rating.map(famousReadyTourRating => famousReadyTourRating.rating).reduce((sum, rating) => sum + rating, 0)

    return ratingReadyTour / rating.length
}
