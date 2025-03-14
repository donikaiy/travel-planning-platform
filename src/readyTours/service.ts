import readyTourRepository from "../readyTours/repository";
import {getAllTourProgramsByReadyTourId} from "../tourPrograms/service";
import {getReadyToursRatingByReadyTourId} from "../famousReadyToursRating/service";

export const getAllReadyTours = async () => {
    return readyTourRepository.getAllReadyTours()
}

export const getReadyTourById = async (readyTourId: number) => {
    const [readyTour, tourProgram, rating] = await Promise.all([
        readyTourRepository.getReadyTourById(readyTourId),
        getAllTourProgramsByReadyTourId(readyTourId),
        getReadyToursRatingByReadyTourId(readyTourId)
    ])

    return {readyTour: readyTour, rating: rating, tourProgram: tourProgram}
}
