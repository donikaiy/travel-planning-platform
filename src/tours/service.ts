import tourRepository from ".//repository";
import {getAllTourProgramsByReadyTourId} from "../tourPrograms/service";
import {getHotelsByCityId} from "../hotels/service";
import {getRestaurantsByCityId} from "../restaurants/service";
import {getAttractionsByCityId} from "../attractions/service";
import {getAllRatingsByTourIdsMap} from "../famousToursRating/service";

export const getAllTours = async () => {
    const tours = await tourRepository.getAllTours()

    const toursIds = tours.map(tourId => tourId.readyTourId)

    const ratings = await getAllRatingsByTourIdsMap(toursIds)

    return tours.map(tour => {
        return {
            ...tour,
            rating: ratings.get(tour.readyTourId)
        }
    })
}

export const getTourById = async (tourId: number) => {
    const [tour, tourProgram] = await Promise.all([
        tourRepository.getTourById(tourId),
        getAllTourProgramsByReadyTourId(tourId)
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
