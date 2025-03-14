import tourProgramRepository from '../tourPrograms/repository';

export const getAllTourProgramsByReadyTourId = async (readyTourId: number) => {
    return tourProgramRepository.getAllTourProgramsByReadyTourId(readyTourId)
}
