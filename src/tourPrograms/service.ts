import tourProgramRepository from '../tourPrograms/repository';

export const getAllTourProgramsByTourId = async (tourId: number) => {
    return tourProgramRepository.getAllTourProgramsByTourId(tourId)
}
