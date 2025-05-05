import tourRepository from ".//repository";
import {getAllTourProgramsByTourId} from "../tourPrograms/service";
import {getHotelsByCityId} from "../hotels/service";
import {getRestaurantsByCityId} from "../restaurants/service";
import {getAttractionsByCityId} from "../attractions/service";
import {getAllRatingsByTourIdsMap} from "../toursRating/service";

export const getAllTours = async () => {
    const tours = await tourRepository.getAllTours()

    const toursIds = tours.map(tourId => tourId.tourId)

    const ratings = await getAllRatingsByTourIdsMap(toursIds)

    return tours.map(tour => {
        return {
            ...tour,
            rating: ratings.get(tour.tourId)
        }
    })
}

export const getTourById = async (tourId: number) => {
    const [tour, tourProgram] = await Promise.all([
        tourRepository.getTourById(tourId),
        getAllTourProgramsByTourId(tourId)
    ])

    const [hotels, restaurants, attractions] = await Promise.all([
        getHotelsByCityId(tour.cityId),
        getRestaurantsByCityId(tour.cityId),
        getAttractionsByCityId(tour.cityId)
    ])

    return {
        ...tour,
        tourProgram: tourProgram,
        hotels: hotels,
        restaurants: restaurants,
        attractions: attractions
    }
}
