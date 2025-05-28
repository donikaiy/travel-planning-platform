import tourProgramRepository from '../tourPrograms/repository.ts';

export const getAllTourProgramsByTourId = async (tourId: number) => {
    return tourProgramRepository.getAllTourProgramsByTourId(tourId)
}
