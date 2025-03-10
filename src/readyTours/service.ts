import readyTourRepository from "../readyTours/repository";
import {getAllTourProgramsByReadyTourId} from "../tourPrograms/service";
import {getAllReadyToursRatingByReadyTourId} from "../famousReadyToursRating/service";

export const getAllReadyTours = async () => {
    return await readyTourRepository.getAllReadyTours()
}

export const getReadyTourById = async (readyTourId: number) => {
    const readyTour = await readyTourRepository.getReadyTourById(readyTourId)
    const tourProgram = await getAllTourProgramsByReadyTourId(readyTourId)
    const rating = await getAllReadyToursRatingByReadyTourId(readyTourId);

    return {readyTour: readyTour, rating: rating, tourProgram: tourProgram}
}
