import tourRepository from "./repository.ts";
import {getAllTourProgramsByTourId} from "../tourPrograms/service.ts";
import {getHotelsByCityId} from "../hotels/service.ts";
import {getRestaurantsByCityId} from "../restaurants/service.ts";
import {getAllRatingsByTourIdsMap} from "../toursRating/service.ts";
import {getAllAttractions} from "../attractions/service.ts";

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
        getAllAttractions({cityId: tour.cityId})
    ])

    return {
        ...tour,
        tourProgram: tourProgram,
        hotels: hotels,
        restaurants: restaurants,
        attractions: attractions
    }
}
