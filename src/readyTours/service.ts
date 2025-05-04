import readyTourRepository from "../readyTours/repository";
import {getAllTourProgramsByReadyTourId} from "../tourPrograms/service";
import {getRatingsByReadyToursIdsMap} from "../famousReadyToursRating/service";

export const getAllReadyTours = async () => {
    const readyTours = await readyTourRepository.getAllReadyTours()

    const readyToursIds = readyTours.map(readyTourId => readyTourId.readyTourId)

    const ratings = await getRatingsByReadyToursIdsMap(readyToursIds)

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
        getAllTourProgramsByReadyTourId(readyTourId),
    ])

    return {readyTour: readyTour, tourProgram: tourProgram}
}
