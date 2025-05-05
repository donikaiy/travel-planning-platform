import readyTourRepository from "../readyTours/repository";
import {getAllTourProgramsByReadyTourId} from "../tourPrograms/service";
import {getHotelsByCityId} from "../hotels/service";
import {getRestaurantsByCityId} from "../restaurants/service";
import {getAttractionsByCityId} from "../attractions/service";
import {getAllRatingsByReadyTourIdsMap} from "../famousReadyToursRating/service";

export const getAllReadyTours = async () => {
    const readyTours = await readyTourRepository.getAllReadyTours()

    const readyToursIds = readyTours.map(readyTourId => readyTourId.readyTourId)

    const ratings = await getAllRatingsByReadyTourIdsMap(readyToursIds)

    return readyTours.map(readyTour => {
        return {
            ...readyTour,
            rating: ratings.get(readyTour.readyTourId)
        }
    })
}

export const getReadyTourById = async (readyTourId: number) => {
    const [readyTour, tourProgram] = await Promise.all([
        readyTourRepository.getReadyTourById(readyTourId),
        getAllTourProgramsByReadyTourId(readyTourId)
    ])

    const [hotels, restaurants, attractions] = await Promise.all([
        getHotelsByCityId(readyTour.cityId),
        getRestaurantsByCityId(readyTour.cityId),
        getAttractionsByCityId(readyTour.cityId)
    ])

    return {
        ...readyTour,
        tourProgram: tourProgram,
        hotels: hotels,
        restaurants: restaurants,
        attractions: attractions
    }
}
